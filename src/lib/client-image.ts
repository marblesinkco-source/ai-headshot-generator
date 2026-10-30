/**
 * Browser-only: shrink a photo before upload. Vercel functions reject request
 * bodies over 4.5 MB, and phone photos are often 3–10 MB each. A 2048 px JPEG
 * keeps plenty of detail for face training and illustration.
 */
const MAX_EDGE = 2048;
const TARGET_BYTES = 3.5 * 1024 * 1024;

export async function downscaleForUpload(file: File): Promise<File> {
  if (typeof window === 'undefined' || !file.type.startsWith('image/')) return file;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    return file; // unsupported format: let the server validate it
  }
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size <= TARGET_BYTES) {
    bitmap.close();
    return file;
  }
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  for (const quality of [0.9, 0.8, 0.7]) {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
    if (blob && (blob.size <= TARGET_BYTES || quality === 0.7)) {
      return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
    }
  }
  return file;
}
