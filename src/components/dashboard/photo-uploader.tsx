'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
  error?: string;
}

interface PhotoUploaderProps {
  orderId: string;
  onUploadComplete?: (totalCount: number) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;

export function PhotoUploader({ orderId, onUploadComplete }: PhotoUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [totalUploaded, setTotalUploaded] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remaining = MAX_FILES - files.length;
      const newFiles = acceptedFiles.slice(0, remaining).map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: 'pending' as const,
      }));

      if (newFiles.length === 0) return;

      setFiles((prev) => [...prev, ...newFiles]);
      uploadFiles(newFiles);
    },
    [files.length] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function uploadFiles(newFiles: UploadedFile[]) {
    setUploading(true);

    const formData = new FormData();
    formData.append('orderId', orderId);
    newFiles.forEach((f) => formData.append('files', f.file));

    // Update all to uploading
    setFiles((prev) =>
      prev.map((f) =>
        newFiles.find((nf) => nf.id === f.id) ? { ...f, status: 'uploading' as const, progress: 50 } : f
      )
    );

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setFiles((prev) =>
          prev.map((f) =>
            newFiles.find((nf) => nf.id === f.id)
              ? { ...f, status: 'error' as const, progress: 0, error: data.error }
              : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            newFiles.find((nf) => nf.id === f.id)
              ? { ...f, status: 'done' as const, progress: 100 }
              : f
          )
        );
        setTotalUploaded(data.totalPhotos);
        onUploadComplete?.(data.totalPhotos);
      }
    } catch {
      setFiles((prev) =>
        prev.map((f) =>
          newFiles.find((nf) => nf.id === f.id)
            ? { ...f, status: 'error' as const, progress: 0, error: 'Upload failed' }
            : f
        )
      );
    } finally {
      setUploading(false);
    }
  }

  function removeFile(fileId: string) {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== fileId);
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES - files.length,
    disabled: files.length >= MAX_FILES || uploading,
  });

  const doneCount = files.filter((f) => f.status === 'done').length + (totalUploaded - files.filter((f) => f.status === 'done').length > 0 ? 0 : 0);

  return (
    <div className="space-y-4">
      {/* Counter */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-tp-muted">
          <span className="font-medium text-tp-ink">{totalUploaded || files.filter((f) => f.status === 'done').length}</span> of {MAX_FILES} photos
          {totalUploaded < 4 && (
            <span className="ml-2 text-amber-600">(minimum 4 required)</span>
          )}
        </p>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors',
          isDragActive
            ? 'border-tp-bronze bg-tp-paper'
            : files.length >= MAX_FILES
            ? 'border-tp-line bg-tp-paper cursor-not-allowed'
            : 'border-tp-line hover:border-tp-bronze hover:bg-tp-paper'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tp-paper">
            <svg className="h-6 w-6 text-tp-bronze" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          {files.length >= MAX_FILES ? (
            <p className="text-sm text-tp-muted">Maximum photos reached</p>
          ) : isDragActive ? (
            <p className="text-sm font-medium text-tp-bronze">Drop your photos here</p>
          ) : (
            <>
              <p className="text-sm text-tp-muted">
                <span className="font-medium text-tp-bronze">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-tp-muted">JPG, PNG, or WebP. Max 10MB each.</p>
            </>
          )}
        </div>
      </div>

      {/* Preview Thumbnails */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {files.map((file) => (
            <div key={file.id} className="group relative aspect-square overflow-hidden rounded-lg border border-tp-line bg-tp-paper">
              <img
                src={file.preview}
                alt="Upload preview"
                className="h-full w-full object-cover"
                decoding="async"
              />

              {/* Progress overlay */}
              {file.status === 'uploading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="h-1.5 w-3/4 overflow-hidden rounded-full bg-white/30">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error overlay */}
              {file.status === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/40">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
              )}

              {/* Done checkmark */}
              {file.status === 'done' && (
                <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}

              {/* Remove button */}
              {file.status !== 'uploading' && (
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
