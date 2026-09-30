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
  packageId: string;
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

