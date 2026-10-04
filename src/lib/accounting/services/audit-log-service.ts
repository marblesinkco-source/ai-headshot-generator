/**
 * AuditLogService — append-only financial audit log (no update / delete)
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { AuditActorType, FinancialAuditLogEntry } from '@/types/accounting';
import type { PaginatedResult } from './transaction-service';

export class AuditLogService {
  static async list(filters: {
    userId?: string;
    entityType?: string;
    entityId?: string;
    action?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResult<FinancialAuditLogEntry>> {
    const supabase = createAdminClient();
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 20;
    const offset = (page - 1) * pageSize;

    let query = supabase
      .from('financial_audit_log')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (filters.userId) query = query.eq('actor_id', filters.userId);
    if (filters.entityType) query = query.eq('entity_type', filters.entityType);
    if (filters.entityId) query = query.eq('entity_id', filters.entityId);
    if (filters.action) query = query.eq('action', filters.action);

    const { data, count, error } = await query;
    if (error) throw error;

    const total = count || 0;
    return {
      data: (data || []) as unknown as FinancialAuditLogEntry[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /** Immutable insert. There is intentionally no update or delete method. */
  static async log(params: {
    actorId?: string;
    actorType: AuditActorType;
    action: string;
    entityType: string;
    entityId: string;
    source?: string;
    requestId?: string;
    beforeHash?: string;
    afterHash?: string;
  }): Promise<FinancialAuditLogEntry> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('financial_audit_log')
      .insert({
        actor_id: params.actorId ?? null,
        actor_type: params.actorType,
        action: params.action,
        entity_type: params.entityType,
        entity_id: params.entityId,
        source: params.source ?? null,
        request_id: params.requestId ?? null,
        before_hash: params.beforeHash ?? null,
        after_hash: params.afterHash ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as FinancialAuditLogEntry;
  }
}
