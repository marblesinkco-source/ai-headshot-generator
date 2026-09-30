/**
 * TailorPic - Supabase Database type definitions.
 *
 * These types mirror the schema defined in migrations 001–003.
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
          // Migration 003 — AI training pipeline
          training_id: string | null;
          trigger_word: string | null;
          lora_url: string | null;
          started_at: string | null;
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
          training_id?: string | null;
          trigger_word?: string | null;
          lora_url?: string | null;
          started_at?: string | null;
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
          training_id?: string | null;
          trigger_word?: string | null;
          lora_url?: string | null;
          started_at?: string | null;
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
          storage_path: string | null;
          thumbnail_path: string | null;
          category_id: CategoryId | null;
          style: string | null;
          background: string | null;
          resolution: string;
          is_favorite: boolean;
          created_at: string;
          // Migration 003 — generation pipeline
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
