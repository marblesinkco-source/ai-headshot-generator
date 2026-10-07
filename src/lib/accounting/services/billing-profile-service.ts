/**
 * BillingProfileService — manage billing profiles (individual / business)
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { BillingProfile, BillingProfileType, BillingAddress } from '@/types/accounting';

export interface CreateBillingProfileParams {
  userId: string;
  profileType: BillingProfileType;
  fullName?: string;
  legalName?: string;
  billingEmail?: string;
  billingAddress?: BillingAddress;
  country?: string;
  postalCode?: string;
  taxId?: string;
  vatId?: string;
  companyRegistrationNumber?: string;
}

export type UpdateBillingProfileParams = Partial<Omit<CreateBillingProfileParams, 'userId'>>;

export class BillingProfileService {
  /** All profiles for a user, default first, then newest */
  static async list(userId: string): Promise<BillingProfile[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('billing_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as unknown as BillingProfile[];
  }

  static async getDefault(userId: string): Promise<BillingProfile | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('billing_profiles')
      .select('*')
      .eq('user_id', userId)
      .eq('is_default', true)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as BillingProfile | null;
  }

  static async getById(userId: string, id: string): Promise<BillingProfile | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('billing_profiles')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as unknown as BillingProfile | null;
  }

  static async create(params: CreateBillingProfileParams): Promise<BillingProfile> {
    const supabase = createAdminClient();

    // The first profile a user creates becomes their default.
    const { count, error: countError } = await supabase
      .from('billing_profiles')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', params.userId);
    if (countError) throw countError;

    const { data, error } = await supabase
      .from('billing_profiles')
      .insert({
        user_id: params.userId,
        profile_type: params.profileType,
        full_name: params.fullName ?? null,
        legal_name: params.legalName ?? null,
        billing_email: params.billingEmail ?? null,
        billing_address: params.billingAddress ?? null,
        country: params.country ?? null,
        postal_code: params.postalCode ?? null,
        tax_id: params.taxId ?? null,
        vat_id: params.vatId ?? null,
        company_registration_number: params.companyRegistrationNumber ?? null,
        is_default: (count || 0) === 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as BillingProfile;
  }

  static async update(
    userId: string,
    id: string,
    updates: UpdateBillingProfileParams
  ): Promise<BillingProfile> {
    const supabase = createAdminClient();

    const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (updates.profileType !== undefined) row.profile_type = updates.profileType;
    if (updates.fullName !== undefined) row.full_name = updates.fullName;
    if (updates.legalName !== undefined) row.legal_name = updates.legalName;
    if (updates.billingEmail !== undefined) row.billing_email = updates.billingEmail;
    if (updates.billingAddress !== undefined) row.billing_address = updates.billingAddress;
    if (updates.country !== undefined) row.country = updates.country;
    if (updates.postalCode !== undefined) row.postal_code = updates.postalCode;
    if (updates.taxId !== undefined) row.tax_id = updates.taxId;
    if (updates.vatId !== undefined) row.vat_id = updates.vatId;
    if (updates.companyRegistrationNumber !== undefined) {
      row.company_registration_number = updates.companyRegistrationNumber;
    }

    const { data, error } = await supabase
      .from('billing_profiles')
      .update(row)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as unknown as BillingProfile;
  }

  /**
   * Make one profile the default and unset all others for the user.
   *
   * Order matters: we SET the new default first so there is always at least
   * one default profile.  Only then do we UNSET the previous ones.  If the
   * unset step fails, the worst outcome is two profiles marked as default
   * (harmless — queries ORDER BY is_default DESC LIMIT 1), whereas the
   * reverse order could leave the user with zero defaults.
   */
  static async setDefault(userId: string, id: string): Promise<void> {
    const supabase = createAdminClient();

    const existing = await BillingProfileService.getById(userId, id);
    if (!existing) throw new Error('Billing profile not found');

    const now = new Date().toISOString();

    // Step 1: SET the target as default (guarantees at least one default)
    const { error: setError } = await supabase
      .from('billing_profiles')
      .update({ is_default: true, updated_at: now })
      .eq('id', id)
      .eq('user_id', userId);
    if (setError) throw setError;

    // Step 2: UNSET all others — safe even if it fails (two defaults > zero)
    const { error: unsetError } = await supabase
      .from('billing_profiles')
      .update({ is_default: false, updated_at: now })
      .eq('user_id', userId)
      .neq('id', id)
      .eq('is_default', true);
    if (unsetError) {
      console.error('[BillingProfileService.setDefault] Failed to unset previous defaults:', unsetError);
      // Do not throw — the new default is already set, which is the critical path.
      // Two profiles being marked default is a benign state that self-heals on the next setDefault call.
    }
  }
}
