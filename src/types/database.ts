/**
 * TailorPic - Supabase Database type definitions.
 *
 * These types mirror the schema defined in migrations/001_initial.sql
 * and migrations/002_add_categories.sql.
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
  | "failed";

export interface Database {
  public: {
    Tables: {
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
          amount: number;
          currency: string;
          headshot_count: number;
          output_count: number;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id: string;
          user_id: string;
          package_id: string;
          category_id: CategoryId;
          status?: OrderStatus;
          stripe_session_id?: string | null;
          stripe_payment_intent?: string | null;
          amount: number;
          currency?: string;
          headshot_count?: number;
          output_count?: number;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          package_id?: string;
          category_id?: CategoryId;
          status?: OrderStatus;
          stripe_session_id?: string | null;
          stripe_payment_intent?: string | null;
          amount?: number;
          currency?: string;
          headshot_count?: number;
          output_count?: number;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
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
      generated_headshots: {
        Row: {
          id: string;
          order_id: string;
          storage_path: string;
          thumbnail_path: string | null;
          category_id: CategoryId | null;
          style: string;
          background: string;
          resolution: string;
          is_favorite: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          storage_path: string;
          thumbnail_path?: string | null;
          category_id?: CategoryId | null;
          style: string;
          background: string;
          resolution?: string;
          is_favorite?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          storage_path?: string;
          thumbnail_path?: string | null;
          category_id?: CategoryId | null;
          style?: string;
          background?: string;
          resolution?: string;
          is_favorite?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      order_status: OrderStatus;
    };
  };
}
