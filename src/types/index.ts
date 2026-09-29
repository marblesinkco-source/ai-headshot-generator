import type { PackageId } from '@/config/packages';

// ---------------------------------------------------------------------------
// Enums / Status types
// ---------------------------------------------------------------------------

export type OrderStatus = 'pending' | 'paid' | 'uploading' | 'processing' | 'completed' | 'failed';

export type GenerationStatus = 'queued' | 'processing' | 'upscaling' | 'completed' | 'failed';

// ---------------------------------------------------------------------------
// Domain models
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  packageId: PackageId;
  status: OrderStatus;
  paymentIntentId: string | null;
  amount: number;
  currency: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Generation {
  id: string;
  orderId: string;
  userId: string;
  status: GenerationStatus;
  styleId: string;
  backgroundId: string;
  prompt: string;
  sourceImageUrl: string;
  resultImageUrl: string | null;
  thumbnailUrl: string | null;
  resolution: string;
  error: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
}

export interface HeadshotResult {
  id: string;
  generationId: string;
  imageUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  format: 'png' | 'jpeg' | 'webp';
  sizeBytes: number;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

// ---------------------------------------------------------------------------
// Provider interfaces are defined in their respective core modules:
//   - AI:       @/core/ai/types
//   - Storage:  @/core/storage/types
//   - Payments: @/core/payments/types
//   - Email:    @/core/email/types
// ---------------------------------------------------------------------------

// Re-export for convenience
export type { AIProvider } from '@/core/ai/types';
export type { StorageProvider } from '@/core/storage/types';
export type { PaymentProvider } from '@/core/payments/types';
export type { EmailProvider } from '@/core/email/types';
