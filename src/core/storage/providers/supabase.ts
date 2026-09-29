/**
 * Supabase Storage provider.
 *
 * Implements the StorageProvider interface using Supabase Storage,
 * which wraps S3-compatible object storage with Supabase auth integration.
 */

import { createClient } from "@supabase/supabase-js";
import type { StorageProvider, UploadOptions, StorageFile } from "../types";

export class SupabaseStorageProvider implements StorageProvider {
  public readonly name = "Supabase Storage";
  private client: ReturnType<typeof createClient>;

  constructor(supabaseUrl?: string, serviceRoleKey?: string) {
    // Use service role key for server-side storage operations (bypasses RLS)
    this.client = createClient(
      supabaseUrl ?? process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey ?? process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }

  async upload(
    bucket: string,
    path: string,
    data: Buffer | Blob | ArrayBuffer,
    options?: UploadOptions,
  ): Promise<void> {
    const { error } = await this.client.storage.from(bucket).upload(path, data, {
      contentType: options?.contentType,
      upsert: options?.upsert ?? false,
      cacheControl: options?.cacheControl ?? "3600",
    });

    if (error) {
      throw new Error(
        `Failed to upload to ${bucket}/${path}: ${error.message}`,
      );
    }
  }

  async download(bucket: string, path: string): Promise<Buffer> {
    const { data, error } = await this.client.storage
      .from(bucket)
      .download(path);

    if (error || !data) {
      throw new Error(
        `Failed to download ${bucket}/${path}: ${error?.message}`,
      );
    }

    return Buffer.from(await data.arrayBuffer());
  }

  async getSignedUrl(
    bucket: string,
    path: string,
    expiresIn: number,
  ): Promise<string> {
    const { data, error } = await this.client.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error || !data?.signedUrl) {
      throw new Error(
        `Failed to create signed URL for ${bucket}/${path}: ${error?.message}`,
      );
    }

    return data.signedUrl;
  }

  async delete(bucket: string, path: string): Promise<void> {
    const { error } = await this.client.storage.from(bucket).remove([path]);

    if (error) {
      throw new Error(
        `Failed to delete ${bucket}/${path}: ${error.message}`,
      );
    }
  }

  async list(
    bucket: string,
    prefix?: string,
    limit?: number,
    offset?: number,
  ): Promise<StorageFile[]> {
    const { data, error } = await this.client.storage.from(bucket).list(prefix, {
      limit: limit ?? 100,
      offset: offset ?? 0,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      throw new Error(
        `Failed to list ${bucket}/${prefix ?? ""}: ${error.message}`,
      );
    }

    return (data ?? []).map((file) => ({
      name: file.name,
      path: prefix ? `${prefix}/${file.name}` : file.name,
      size: file.metadata?.size ?? 0,
      contentType: file.metadata?.mimetype ?? "application/octet-stream",
      updatedAt: file.updated_at ?? file.created_at ?? "",
    }));
  }
}
