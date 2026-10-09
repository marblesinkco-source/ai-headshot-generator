/**
 * TailorPic - Supabase Database type definitions.
 *
 * These types mirror the schema defined in migrations 001–008.
 *
 * To regenerate from a live database, run:
 *   npx supabase gen types typescript --project-id <ref> > src/types/database.ts
 */

import type { CategoryId } from '@/config/categories';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrderStatus =
  | "pending"
  | "paid"
  | "uploading"
  | "processing"
  | "completed"
  | "failed"
  | "refunded"
  | "partial_refund";

// ── Migration 007 enum types ────────────────────────────────────────────────

export type FinancialTransactionTypeDb =
  | 'sale' | 'one_time_payment' | 'subscription_charge' | 'credit_purchase'
  | 'credit_usage' | 'api_usage_charge' | 'refund' | 'partial_refund'
  | 'chargeback' | 'dispute' | 'chargeback_reversal' | 'discount' | 'tax'
  | 'payment_fee' | 'marketplace_fee' | 'affiliate_commission' | 'fx_fee'
  | 'adjustment' | 'payout' | 'bank_settlement';

export type FinancialTransactionStatusDb =
  | 'pending' | 'authorized' | 'processing' | 'completed' | 'failed'
  | 'cancelled' | 'refunded' | 'partially_refunded' | 'disputed'
  | 'chargeback' | 'reversed' | 'payout_pending' | 'paid_out';

export type FinancialPaymentStatusDb =
  | 'unpaid' | 'pending' | 'authorized' | 'paid' | 'failed'
  | 'refunded' | 'partially_refunded' | 'disputed';

export type FinancialRefundStatusDb =
  | 'requested' | 'under_review' | 'approved' | 'rejected'
  | 'processing' | 'completed' | 'failed';

export type ReconciliationStatusDb =
  | 'matched' | 'partially_matched' | 'unmatched' | 'investigation_required';

export type ProviderConnectionStatusDb =
  | 'active' | 'inactive' | 'error' | 'disconnected';

export type WebhookEventStatusDb =
  | 'received' | 'processing' | 'processed' | 'failed' | 'duplicate';

export type BillingProfileTypeDb =
  | 'individual' | 'business';

export type PayoutStatusDb =
  | 'pending' | 'in_transit' | 'paid' | 'failed' | 'cancelled';

export type CreditEventTypeDb =
  | 'purchase' | 'usage' | 'refund' | 'expiry' | 'adjustment' | 'transfer';

export interface Database {
  public: {
    Tables: {
      // ── Migration 001: Core tables ──────────────────────────────────────
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          package_id: string;
          category_id: CategoryId;
          status: OrderStatus;
          stripe_session_id: string | null;
          stripe_payment_intent: string | null;
          // Migration: Paddle
          paddle_transaction_id: string | null;
          paddle_subscription_id: string | null;
          amount: number;
          currency: string;
          headshot_count: number;
          output_count: number;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
          // Migration 003 — AI training pipeline
          training_id: string | null;
          trigger_word: string | null;
          lora_url: string | null;
          started_at: string | null;
          // Migration 004 — Credits system
          upgrade_email_sent: string | null;
          order_type: 'category' | 'credits';
          // Migration 006 — Retry tracking
          retry_count: number;
          last_retry_at: string | null;
        };
        Insert: {
          id: string;
          user_id: string;
          package_id: string;
          category_id: CategoryId | 'credits';
          status?: OrderStatus;
          stripe_session_id?: string | null;
          stripe_payment_intent?: string | null;
          paddle_transaction_id?: string | null;
          paddle_subscription_id?: string | null;
          amount: number;
          currency?: string;
          headshot_count?: number;
          output_count?: number;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
          training_id?: string | null;
          trigger_word?: string | null;
          lora_url?: string | null;
          started_at?: string | null;
          upgrade_email_sent?: string | null;
          order_type?: 'category' | 'credits';
          retry_count?: number;
          last_retry_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          package_id?: string;
          category_id?: CategoryId | 'credits';
          status?: OrderStatus;
          stripe_session_id?: string | null;
          stripe_payment_intent?: string | null;
          paddle_transaction_id?: string | null;
          paddle_subscription_id?: string | null;
          amount?: number;
          currency?: string;
          headshot_count?: number;
          output_count?: number;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
          training_id?: string | null;
          trigger_word?: string | null;
          lora_url?: string | null;
          started_at?: string | null;
          upgrade_email_sent?: string | null;
          order_type?: 'category' | 'credits';
          retry_count?: number;
          last_retry_at?: string | null;
        };
      };
      uploaded_photos: {
        Row: {
          id: string;
          order_id: string;
          storage_path: string;
          original_filename: string;
          file_size: number;
          mime_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          storage_path: string;
          original_filename: string;
          file_size: number;
          mime_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          storage_path?: string;
          original_filename?: string;
          file_size?: number;
          mime_type?: string;
          created_at?: string;
        };
      };
      user_credits: {
        Row: {
          id: string;
          user_id: string;
          order_id: string;
          package_id: string;
          total_credits: number;
          used_credits: number;
          remaining_credits: number;
          purchased_at: string;
          expires_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          order_id: string;
          package_id: string;
          total_credits: number;
          used_credits?: number;
          purchased_at?: string;
          expires_at: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_id?: string;
          package_id?: string;
          total_credits?: number;
          used_credits?: number;
          purchased_at?: string;
          expires_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      credit_transactions: {
        Row: {
          id: string;
          user_id: string;
          credit_id: string;
          order_id: string | null;
          type: 'purchase' | 'use' | 'refund' | 'expire';
          amount: number;
          balance_after: number;
          category_id: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          credit_id: string;
          order_id?: string | null;
          type: 'purchase' | 'use' | 'refund' | 'expire';
          amount: number;
          balance_after: number;
          category_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          credit_id?: string;
          order_id?: string | null;
          type?: 'purchase' | 'use' | 'refund' | 'expire';
          amount?: number;
          balance_after?: number;
          category_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
      generated_headshots: {
        Row: {
          id: string;
          order_id: string;
          storage_path: string | null;
          thumbnail_path: string | null;
          category_id: CategoryId | null;
          style: string | null;
          background: string | null;
          resolution: string;
          is_favorite: boolean;
          created_at: string;
          prediction_id: string | null;
          user_id: string | null;
          style_id: string | null;
          background_id: string | null;
          status: string;
          error: string | null;
          prompt: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          storage_path?: string | null;
          thumbnail_path?: string | null;
          category_id?: CategoryId | null;
          style?: string | null;
          background?: string | null;
          resolution?: string;
          is_favorite?: boolean;
          created_at?: string;
          prediction_id?: string | null;
          user_id?: string | null;
          style_id?: string | null;
          background_id?: string | null;
          status?: string;
          error?: string | null;
          prompt?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          storage_path?: string | null;
          thumbnail_path?: string | null;
          category_id?: CategoryId | null;
          style?: string | null;
          background?: string | null;
          resolution?: string;
          is_favorite?: boolean;
          created_at?: string;
          prediction_id?: string | null;
          user_id?: string | null;
          style_id?: string | null;
          background_id?: string | null;
          status?: string;
          error?: string | null;
          prompt?: string | null;
          completed_at?: string | null;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string | null;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string | null;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string | null;
          unsubscribed_at?: string | null;
        };
      };

      // ── Migration 006: Stripe event deduplication ─────────────────────────
      processed_stripe_events: {
        Row: {
          event_id: string;
          event_type: string;
          processed_at: string;
        };
        Insert: {
          event_id: string;
          event_type: string;
          processed_at?: string;
        };
        Update: {
          event_id?: string;
          event_type?: string;
          processed_at?: string;
        };
      };

      // ── Migration: Paddle event deduplication ────────────────────────────
      processed_paddle_events: {
        Row: {
          event_id: string;
          event_type: string;
          created_at: string;
        };
        Insert: {
          event_id: string;
          event_type: string;
          created_at?: string;
        };
        Update: {
          event_id?: string;
          event_type?: string;
          created_at?: string;
        };
      };

      // ── Migration 007: Accounting Center (17 tables) ──────────────────────

      financial_transactions: {
        Row: {
          id: string;
          human_id: string;
          user_id: string;
          order_id: string | null;
          source_type: string;
          source_provider: string;
          source_account_id: string | null;
          external_transaction_id: string | null;
          transaction_type: FinancialTransactionTypeDb;
          service_type: string | null;
          category_slug: string | null;
          package_code: string | null;
          quantity: number;
          unit_amount: number;
          gross_amount: number;
          discount_amount: number;
          subtotal_amount: number;
          tax_amount: number;
          withholding_amount: number;
          payment_processor_fee: number;
          marketplace_fee: number;
          platform_fee: number;
          affiliate_commission: number;
          partner_commission: number;
          fx_fee: number;
          dispute_fee: number;
          refund_fee: number;
          payout_fee: number;
          other_adjustment: number;
          net_amount: number;
          original_amount: number;
          original_currency: string;
          settlement_amount: number | null;
          settlement_currency: string | null;
          base_reporting_amount: number | null;
          base_reporting_currency: string;
          fx_rate: number | null;
          fx_rate_timestamp: string | null;
          fx_provider: string | null;
          payment_method_type: string | null;
          card_brand: string | null;
          card_last4: string | null;
          processor_payment_id: string | null;
          processor_charge_id: string | null;
          payment_status: FinancialPaymentStatusDb;
          transaction_status: FinancialTransactionStatusDb;
          settlement_status: string | null;
          description: string | null;
          occurred_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          human_id?: string;
          user_id: string;
          order_id?: string | null;
          source_type?: string;
          source_provider?: string;
          source_account_id?: string | null;
          external_transaction_id?: string | null;
          transaction_type?: FinancialTransactionTypeDb;
          service_type?: string | null;
          category_slug?: string | null;
          package_code?: string | null;
          quantity?: number;
          unit_amount?: number;
          gross_amount?: number;
          discount_amount?: number;
          subtotal_amount?: number;
          tax_amount?: number;
          withholding_amount?: number;
          payment_processor_fee?: number;
          marketplace_fee?: number;
          platform_fee?: number;
          affiliate_commission?: number;
          partner_commission?: number;
          fx_fee?: number;
          dispute_fee?: number;
          refund_fee?: number;
          payout_fee?: number;
          other_adjustment?: number;
          net_amount?: number;
          original_amount?: number;
          original_currency?: string;
          settlement_amount?: number | null;
          settlement_currency?: string | null;
          base_reporting_amount?: number | null;
          base_reporting_currency?: string;
          fx_rate?: number | null;
          fx_rate_timestamp?: string | null;
          fx_provider?: string | null;
          payment_method_type?: string | null;
          card_brand?: string | null;
          card_last4?: string | null;
          processor_payment_id?: string | null;
          processor_charge_id?: string | null;
          payment_status?: FinancialPaymentStatusDb;
          transaction_status?: FinancialTransactionStatusDb;
          settlement_status?: string | null;
          description?: string | null;
          occurred_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          human_id?: string;
          user_id?: string;
          order_id?: string | null;
          source_type?: string;
          source_provider?: string;
          source_account_id?: string | null;
          external_transaction_id?: string | null;
          transaction_type?: FinancialTransactionTypeDb;
          service_type?: string | null;
          category_slug?: string | null;
          package_code?: string | null;
          quantity?: number;
          unit_amount?: number;
          gross_amount?: number;
          discount_amount?: number;
          subtotal_amount?: number;
          tax_amount?: number;
          withholding_amount?: number;
          payment_processor_fee?: number;
          marketplace_fee?: number;
          platform_fee?: number;
          affiliate_commission?: number;
          partner_commission?: number;
          fx_fee?: number;
          dispute_fee?: number;
          refund_fee?: number;
          payout_fee?: number;
          other_adjustment?: number;
          net_amount?: number;
          original_amount?: number;
          original_currency?: string;
          settlement_amount?: number | null;
          settlement_currency?: string | null;
          base_reporting_amount?: number | null;
          base_reporting_currency?: string;
          fx_rate?: number | null;
          fx_rate_timestamp?: string | null;
          fx_provider?: string | null;
          payment_method_type?: string | null;
          card_brand?: string | null;
          card_last4?: string | null;
          processor_payment_id?: string | null;
          processor_charge_id?: string | null;
          payment_status?: FinancialPaymentStatusDb;
          transaction_status?: FinancialTransactionStatusDb;
          settlement_status?: string | null;
          description?: string | null;
          occurred_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      financial_events: {
        Row: {
          id: string;
          transaction_id: string | null;
          provider: string;
          provider_event_id: string | null;
          event_type: string;
          amount: number | null;
          currency: string | null;
          status: string | null;
          occurred_at: string;
          payload_hash: string | null;
          raw_reference: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          transaction_id?: string | null;
          provider: string;
          provider_event_id?: string | null;
          event_type: string;
          amount?: number | null;
          currency?: string | null;
          status?: string | null;
          occurred_at?: string;
          payload_hash?: string | null;
          raw_reference?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          transaction_id?: string | null;
          provider?: string;
          provider_event_id?: string | null;
          event_type?: string;
          amount?: number | null;
          currency?: string | null;
          status?: string | null;
          occurred_at?: string;
          payload_hash?: string | null;
          raw_reference?: string | null;
          created_at?: string;
        };
      };

      payment_fees: {
        Row: {
          id: string;
          transaction_id: string;
          fee_type: string;
          amount: number;
          currency: string;
          provider_reference: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          transaction_id: string;
          fee_type: string;
          amount?: number;
          currency?: string;
          provider_reference?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          fee_type?: string;
          amount?: number;
          currency?: string;
          provider_reference?: string | null;
          created_at?: string;
        };
      };

      refunds: {
        Row: {
          id: string;
          human_id: string;
          user_id: string;
          transaction_id: string | null;
          order_id: string | null;
          external_refund_id: string | null;
          requested_amount: number;
          approved_amount: number;
          refunded_amount: number;
          currency: string;
          reason: string | null;
          status: FinancialRefundStatusDb;
          requested_at: string;
          approved_at: string | null;
          processed_at: string | null;
          failure_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          human_id?: string;
          user_id: string;
          transaction_id?: string | null;
          order_id?: string | null;
          external_refund_id?: string | null;
          requested_amount?: number;
          approved_amount?: number;
          refunded_amount?: number;
          currency?: string;
          reason?: string | null;
          status?: FinancialRefundStatusDb;
          requested_at?: string;
          approved_at?: string | null;
          processed_at?: string | null;
          failure_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          human_id?: string;
          user_id?: string;
          transaction_id?: string | null;
          order_id?: string | null;
          external_refund_id?: string | null;
          requested_amount?: number;
          approved_amount?: number;
          refunded_amount?: number;
          currency?: string;
          reason?: string | null;
          status?: FinancialRefundStatusDb;
          requested_at?: string;
          approved_at?: string | null;
          processed_at?: string | null;
          failure_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      disputes: {
        Row: {
          id: string;
          human_id: string;
          user_id: string;
          transaction_id: string | null;
          external_dispute_id: string | null;
          amount: number;
          currency: string;
          reason: string | null;
          status: string;
          opened_at: string;
          due_at: string | null;
          resolved_at: string | null;
          provider: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          human_id?: string;
          user_id: string;
          transaction_id?: string | null;
          external_dispute_id?: string | null;
          amount?: number;
          currency?: string;
          reason?: string | null;
          status?: string;
          opened_at?: string;
          due_at?: string | null;
          resolved_at?: string | null;
          provider?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          human_id?: string;
          user_id?: string;
          transaction_id?: string | null;
          external_dispute_id?: string | null;
          amount?: number;
          currency?: string;
          reason?: string | null;
          status?: string;
          opened_at?: string;
          due_at?: string | null;
          resolved_at?: string | null;
          provider?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      credit_ledger: {
        Row: {
          id: string;
          user_id: string;
          transaction_id: string | null;
          event_type: CreditEventTypeDb;
          credits_delta: number;
          balance_after: number;
          reason: string | null;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          transaction_id?: string | null;
          event_type: CreditEventTypeDb;
          credits_delta: number;
          balance_after: number;
          reason?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          transaction_id?: string | null;
          event_type?: CreditEventTypeDb;
          credits_delta?: number;
          balance_after?: number;
          reason?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
      };

      invoices: {
        Row: {
          id: string;
          human_id: string;
          user_id: string;
          transaction_id: string | null;
          order_id: string | null;
          billing_profile_snapshot: Json | null;
          subtotal: number;
          discount: number;
          tax: number;
          total: number;
          currency: string;
          issued_at: string;
          pdf_url: string | null;
          external_invoice_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          human_id?: string;
          user_id: string;
          transaction_id?: string | null;
          order_id?: string | null;
          billing_profile_snapshot?: Json | null;
          subtotal?: number;
          discount?: number;
          tax?: number;
          total?: number;
          currency?: string;
          issued_at?: string;
          pdf_url?: string | null;
          external_invoice_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          human_id?: string;
          user_id?: string;
          transaction_id?: string | null;
          order_id?: string | null;
          billing_profile_snapshot?: Json | null;
          subtotal?: number;
          discount?: number;
          tax?: number;
          total?: number;
          currency?: string;
          issued_at?: string;
          pdf_url?: string | null;
          external_invoice_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      receipts: {
        Row: {
          id: string;
          human_id: string;
          user_id: string;
          transaction_id: string | null;
          total: number;
          currency: string;
          issued_at: string;
          pdf_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          human_id?: string;
          user_id: string;
          transaction_id?: string | null;
          total?: number;
          currency?: string;
          issued_at?: string;
          pdf_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          human_id?: string;
          user_id?: string;
          transaction_id?: string | null;
          total?: number;
          currency?: string;
          issued_at?: string;
          pdf_url?: string | null;
          created_at?: string;
        };
      };

      payouts: {
        Row: {
          id: string;
          human_id: string;
          user_id: string;
          provider: string;
          external_payout_id: string | null;
          payout_date: string | null;
          gross_amount: number;
          fees_amount: number;
          adjustments_amount: number;
          net_amount: number;
          currency: string;
          destination_masked: string | null;
          bank_reference: string | null;
          status: PayoutStatusDb;
          arrival_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          human_id?: string;
          user_id: string;
          provider: string;
          external_payout_id?: string | null;
          payout_date?: string | null;
          gross_amount?: number;
          fees_amount?: number;
          adjustments_amount?: number;
          net_amount?: number;
          currency?: string;
          destination_masked?: string | null;
          bank_reference?: string | null;
          status?: PayoutStatusDb;
          arrival_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          human_id?: string;
          user_id?: string;
          provider?: string;
          external_payout_id?: string | null;
          payout_date?: string | null;
          gross_amount?: number;
          fees_amount?: number;
          adjustments_amount?: number;
          net_amount?: number;
          currency?: string;
          destination_masked?: string | null;
          bank_reference?: string | null;
          status?: PayoutStatusDb;
          arrival_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      payout_transactions: {
        Row: {
          payout_id: string;
          transaction_id: string;
          allocated_amount: number;
        };
        Insert: {
          payout_id: string;
          transaction_id: string;
          allocated_amount?: number;
        };
        Update: {
          payout_id?: string;
          transaction_id?: string;
          allocated_amount?: number;
        };
      };

      billing_profiles: {
        Row: {
          id: string;
          user_id: string;
          profile_type: BillingProfileTypeDb;
          full_name: string | null;
          legal_name: string | null;
          billing_email: string | null;
          billing_address: Json | null;
          country: string | null;
          postal_code: string | null;
          tax_id: string | null;
          vat_id: string | null;
          company_registration_number: string | null;
          is_default: boolean;
          valid_from: string;
          valid_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          profile_type?: BillingProfileTypeDb;
          full_name?: string | null;
          legal_name?: string | null;
          billing_email?: string | null;
          billing_address?: Json | null;
          country?: string | null;
          postal_code?: string | null;
          tax_id?: string | null;
          vat_id?: string | null;
          company_registration_number?: string | null;
          is_default?: boolean;
          valid_from?: string;
          valid_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          profile_type?: BillingProfileTypeDb;
          full_name?: string | null;
          legal_name?: string | null;
          billing_email?: string | null;
          billing_address?: Json | null;
          country?: string | null;
          postal_code?: string | null;
          tax_id?: string | null;
          vat_id?: string | null;
          company_registration_number?: string | null;
          is_default?: boolean;
          valid_from?: string;
          valid_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      tax_records: {
        Row: {
          id: string;
          transaction_id: string;
          tax_jurisdiction: string | null;
          buyer_country: string | null;
          seller_country: string | null;
          tax_type: string | null;
          rate: number | null;
          taxable_base: number;
          tax_amount: number;
          reverse_charge: boolean;
          tax_id_used: string | null;
          tax_provider: string | null;
          tax_reference: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          transaction_id: string;
          tax_jurisdiction?: string | null;
          buyer_country?: string | null;
          seller_country?: string | null;
          tax_type?: string | null;
          rate?: number | null;
          taxable_base?: number;
          tax_amount?: number;
          reverse_charge?: boolean;
          tax_id_used?: string | null;
          tax_provider?: string | null;
          tax_reference?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          tax_jurisdiction?: string | null;
          buyer_country?: string | null;
          seller_country?: string | null;
          tax_type?: string | null;
          rate?: number | null;
          taxable_base?: number;
          tax_amount?: number;
          reverse_charge?: boolean;
          tax_id_used?: string | null;
          tax_provider?: string | null;
          tax_reference?: string | null;
          created_at?: string;
        };
      };

      fx_records: {
        Row: {
          id: string;
          transaction_id: string;
          original_currency: string;
          settlement_currency: string;
          base_reporting_currency: string;
          fx_rate: number;
          fx_provider: string | null;
          fx_rate_timestamp: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          transaction_id: string;
          original_currency: string;
          settlement_currency: string;
          base_reporting_currency?: string;
          fx_rate: number;
          fx_provider?: string | null;
          fx_rate_timestamp?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          original_currency?: string;
          settlement_currency?: string;
          base_reporting_currency?: string;
          fx_rate?: number;
          fx_provider?: string | null;
          fx_rate_timestamp?: string | null;
          created_at?: string;
        };
      };

      reconciliation_records: {
        Row: {
          id: string;
          transaction_id: string;
          expected_net: number;
          provider_settlement_amount: number;
          difference_amount: number;
          status: ReconciliationStatusDb;
          reconciled_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          transaction_id: string;
          expected_net?: number;
          provider_settlement_amount?: number;
          difference_amount?: number;
          status?: ReconciliationStatusDb;
          reconciled_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          expected_net?: number;
          provider_settlement_amount?: number;
          difference_amount?: number;
          status?: ReconciliationStatusDb;
          reconciled_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      provider_connections: {
        Row: {
          id: string;
          user_id: string;
          provider: string;
          account_label: string | null;
          status: ProviderConnectionStatusDb;
          connected_at: string | null;
          last_sync_at: string | null;
          sync_cursor: string | null;
          sync_error: string | null;
          retry_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: string;
          account_label?: string | null;
          status?: ProviderConnectionStatusDb;
          connected_at?: string | null;
          last_sync_at?: string | null;
          sync_cursor?: string | null;
          sync_error?: string | null;
          retry_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider?: string;
          account_label?: string | null;
          status?: ProviderConnectionStatusDb;
          connected_at?: string | null;
          last_sync_at?: string | null;
          sync_cursor?: string | null;
          sync_error?: string | null;
          retry_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      webhook_events: {
        Row: {
          id: string;
          provider: string;
          external_event_id: string;
          event_type: string;
          received_at: string;
          processed_at: string | null;
          status: WebhookEventStatusDb;
          payload_hash: string | null;
          error: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider: string;
          external_event_id: string;
          event_type: string;
          received_at?: string;
          processed_at?: string | null;
          status?: WebhookEventStatusDb;
          payload_hash?: string | null;
          error?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider?: string;
          external_event_id?: string;
          event_type?: string;
          received_at?: string;
          processed_at?: string | null;
          status?: WebhookEventStatusDb;
          payload_hash?: string | null;
          error?: string | null;
          created_at?: string;
        };
      };

      financial_audit_log: {
        Row: {
          id: string;
          actor_id: string | null;
          actor_type: string;
          action: string;
          entity_type: string;
          entity_id: string;
          source: string | null;
          request_id: string | null;
          before_hash: string | null;
          after_hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          actor_type?: string;
          action: string;
          entity_type: string;
          entity_id: string;
          source?: string | null;
          request_id?: string | null;
          before_hash?: string | null;
          after_hash?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_id?: string | null;
          actor_type?: string;
          action?: string;
          entity_type?: string;
          entity_id?: string;
          source?: string | null;
          request_id?: string | null;
          before_hash?: string | null;
          after_hash?: string | null;
          created_at?: string;
        };
      };

      // ── Migration 008: Self-optimization / Analytics ──────────────────────

      page_views: {
        Row: {
          id: string;
          session_id: string;
          user_id: string | null;
          page_path: string;
          referrer: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          device_type: string;
          country: string | null;
          duration_ms: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id?: string | null;
          page_path: string;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          device_type?: string;
          country?: string | null;
          duration_ms?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          user_id?: string | null;
          page_path?: string;
          referrer?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          device_type?: string;
          country?: string | null;
          duration_ms?: number | null;
          created_at?: string;
        };
      };

      click_events: {
        Row: {
          id: string;
          session_id: string;
          user_id: string | null;
          page_path: string;
          element_id: string;
          element_type: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id?: string | null;
          page_path: string;
          element_id: string;
          element_type: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          user_id?: string | null;
          page_path?: string;
          element_id?: string;
          element_type?: string;
          metadata?: Json;
          created_at?: string;
        };
      };

      conversions: {
        Row: {
          id: string;
          session_id: string;
          user_id: string | null;
          event_type: string;
          category_id: string | null;
          package_id: string | null;
          revenue_cents: number | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id?: string | null;
          event_type: string;
          category_id?: string | null;
          package_id?: string | null;
          revenue_cents?: number | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          user_id?: string | null;
          event_type?: string;
          category_id?: string | null;
          package_id?: string | null;
          revenue_cents?: number | null;
          metadata?: Json;
          created_at?: string;
        };
      };

      ab_tests: {
        Row: {
          id: string;
          test_name: string;
          description: string | null;
          variants: Json;
          target_page: string | null;
          status: string;
          winner_variant: string | null;
          start_date: string;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          test_name: string;
          description?: string | null;
          variants: Json;
          target_page?: string | null;
          status?: string;
          winner_variant?: string | null;
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          test_name?: string;
          description?: string | null;
          variants?: Json;
          target_page?: string | null;
          status?: string;
          winner_variant?: string | null;
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      ab_test_assignments: {
        Row: {
          id: string;
          test_id: string;
          session_id: string;
          variant_id: string;
          converted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          test_id: string;
          session_id: string;
          variant_id: string;
          converted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          test_id?: string;
          session_id?: string;
          variant_id?: string;
          converted?: boolean;
          created_at?: string;
        };
      };

      optimization_log: {
        Row: {
          id: string;
          optimization_type: string;
          decision: Json;
          reasoning: string | null;
          metrics_snapshot: Json | null;
          applied: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          optimization_type: string;
          decision: Json;
          reasoning?: string | null;
          metrics_snapshot?: Json | null;
          applied?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          optimization_type?: string;
          decision?: Json;
          reasoning?: string | null;
          metrics_snapshot?: Json | null;
          applied?: boolean;
          created_at?: string;
        };
      };

      dynamic_rankings: {
        Row: {
          id: string;
          ranking_type: string;
          ranking_data: Json;
          valid_from: string;
          valid_until: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ranking_type: string;
          ranking_data: Json;
          valid_from?: string;
          valid_until?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          ranking_type?: string;
          ranking_data?: Json;
          valid_from?: string;
          valid_until?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_human_id: {
        Args: { prefix: string };
        Returns: string;
      };
    };
    Enums: {
      order_status: OrderStatus;
      financial_transaction_type: FinancialTransactionTypeDb;
      financial_transaction_status: FinancialTransactionStatusDb;
      financial_payment_status: FinancialPaymentStatusDb;
      financial_refund_status: FinancialRefundStatusDb;
      reconciliation_status: ReconciliationStatusDb;
      provider_connection_status: ProviderConnectionStatusDb;
      webhook_event_status: WebhookEventStatusDb;
      billing_profile_type: BillingProfileTypeDb;
      payout_status: PayoutStatusDb;
      credit_event_type: CreditEventTypeDb;
    };
  };
}
