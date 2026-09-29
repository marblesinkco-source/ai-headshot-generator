/**
 * Storage provider abstraction.
 *
 * Every object storage service (Supabase Storage, S3, Cloudflare R2, etc.)
 * implements this interface so file operations are provider-agnostic.
 */

// ---------------------------------------------------------------------------
// Upload options
// ---------------------------------------------------------------------------

export interface UploadOptions {
  /** MIME type of the file */
  contentType?: string;
  /** Overwrite if a file already exists at this path */
  upsert?: boolean;
  /** Cache-Control header for the stored object */
  cacheControl?: string;
}

// ---------------------------------------------------------------------------
// File metadata
// ---------------------------------------------------------------------------

export interface StorageFile {
  /** File name (last path segment) */
  name: string;
  /** Full path within the bucket */
  path: string;
  /** File size in bytes */
  size: number;
  /** MIME type */
  contentType: string;
  /** Last modification timestamp */
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Provider interface
// ---------------------------------------------------------------------------

export interface StorageProvider {
  /** Human-readable provider name */
  name: string;

  /**
   * Upload a file to a bucket.
   *
   * @param bucket - Bucket name (e.g. "uploads", "headshots")
   * @param path   - Destination path within the bucket
   * @param data   - File contents
   * @param options - Upload options
   */
  upload(
    bucket: string,
    path: string,
    data: Buffer | Blob | ArrayBuffer,
    options?: UploadOptions,
  ): Promise<void>;

  /**
   * Download a file's contents.
   */
  download(bucket: string, path: string): Promise<Buffer>;

  /**
   * Generate a time-limited signed URL for private file access.
   *
   * @param expiresIn - Seconds until the URL expires
   */
  getSignedUrl(
    bucket: string,
    path: string,
    expiresIn: number,
  ): Promise<string>;

  /**
   * Delete a file from storage.
   */
  delete(bucket: string, path: string): Promise<void>;

  /**
   * List files in a bucket path.
   *
   * @param prefix - Path prefix to filter by
   * @param limit  - Maximum number of results
   * @param offset - Pagination offset
   */
  list(
    bucket: string,
    prefix?: string,
    limit?: number,
    offset?: number,
  ): Promise<StorageFile[]>;
}
