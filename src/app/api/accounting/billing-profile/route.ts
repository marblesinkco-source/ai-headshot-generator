import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { BillingProfileService } from '@/lib/accounting/services';
import type { BillingProfileType } from '@/types/accounting';
import type { UpdateBillingProfileParams } from '@/lib/accounting/services/billing-profile-service';

export const dynamic = 'force-dynamic';

const PROFILE_TYPES: BillingProfileType[] = ['individual', 'business'];

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profiles = await BillingProfileService.list(user.id);
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('[accounting/billing-profile] GET failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PUT body: profile fields (profileType, fullName, legalName, billingEmail,
 * billingAddress, country, postalCode, taxId, vatId, companyRegistrationNumber)
 * and an optional `id`. With `id`, that profile is updated; without it, the
 * user's default profile is updated, or a new one is created if none exists.
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (body.profileType !== undefined && !PROFILE_TYPES.includes(body.profileType as BillingProfileType)) {
      return NextResponse.json(
        { error: `Invalid profileType. Use one of: ${PROFILE_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Whitelist fields so callers cannot inject userId or is_default.
    const fields: UpdateBillingProfileParams = {};
    if (body.profileType !== undefined) fields.profileType = body.profileType as BillingProfileType;
    for (const key of [
      'fullName',
      'legalName',
      'billingEmail',
      'country',
      'postalCode',
      'taxId',
      'vatId',
      'companyRegistrationNumber',
    ] as const) {
      if (body[key] !== undefined) {
        if (body[key] !== null && typeof body[key] !== 'string') {
          return NextResponse.json({ error: `${key} must be a string` }, { status: 400 });
        }
        (fields as Record<string, unknown>)[key] = body[key];
      }
    }
    if (body.billingAddress !== undefined) {
      if (body.billingAddress !== null && typeof body.billingAddress !== 'object') {
        return NextResponse.json({ error: 'billingAddress must be an object' }, { status: 400 });
      }
      fields.billingAddress = body.billingAddress as UpdateBillingProfileParams['billingAddress'];
    }

    const requestedId = typeof body.id === 'string' && body.id ? body.id : undefined;

    let existing = null;
    if (requestedId) {
      existing = await BillingProfileService.getById(user.id, requestedId);
      if (!existing) {
        return NextResponse.json({ error: 'Billing profile not found' }, { status: 404 });
      }
    } else {
      const profiles = await BillingProfileService.list(user.id);
      existing = profiles[0] ?? null; // list() orders the default profile first
    }

    const profile = existing
      ? await BillingProfileService.update(user.id, existing.id, fields)
      : await BillingProfileService.create({
          userId: user.id,
          ...fields,
          profileType: fields.profileType ?? 'individual',
        });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('[accounting/billing-profile] PUT failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
