'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { OrderStatusBadge } from '@/components/dashboard/order-status';
import { Button } from '@/components/ui/button';
import type { OrderStatus } from '@/types';

const HeadshotModal = dynamic(
  () => import('@/components/dashboard/headshot-modal').then((m) => m.HeadshotModal),
  { ssr: false },
);

interface Headshot {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  isFavorite: boolean;
}

interface OrderInfo {
  id: string;
  packageId: string;
  status: OrderStatus;
  createdAt: string;
}

export default function OrderGalleryPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [headshots, setHeadshots] = useState<Headshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchGallery = useCallback(async () => {
    try {
      const response = await fetch(`/api/gallery/${orderId}`);
      const data = await response.json();

      if (response.ok) {
        setOrder({
          id: data.order.id,
          packageId: data.order.packageId,
          status: data.order.status,
          createdAt: data.order.createdAt,
        });
        setHeadshots(
          data.headshots.map((h: Record<string, unknown>) => ({
            id: h.id as string,
            imageUrl: h.imageUrl as string || h.resultImageUrl as string,
            thumbnailUrl: h.thumbnailUrl as string || h.imageUrl as string || h.resultImageUrl as string,
            isFavorite: h.isFavorite as boolean || false,
          }))
        );
      }
    } catch {
      setError('Failed to load gallery. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  async function toggleFavorite(headshotId: string) {
    const headshot = headshots.find((h) => h.id === headshotId);
    if (!headshot) return;

    const newState = !headshot.isFavorite;

    // Optimistic update
    setHeadshots((prev) =>
      prev.map((h) => (h.id === headshotId ? { ...h, isFavorite: newState } : h))
    );

    try {
      await fetch(`/api/gallery/${orderId}/favorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headshotId, isFavorite: newState }),
      });
    } catch {
      // Revert on failure
      setHeadshots((prev) =>
        prev.map((h) => (h.id === headshotId ? { ...h, isFavorite: !newState } : h))
      );
    }
  }

  async function handleDownloadAll() {
    setDownloading(true);
    try {
      const response = await fetch(`/api/gallery/${orderId}/download`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `headshots-${orderId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

  async function handleDownloadSingle(imageUrl: string, index: number) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `headshot-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Download failed. Please try again.');
    }
  }

  const filteredHeadshots =
    filter === 'favorites' ? headshots.filter((h) => h.isFavorite) : headshots;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-tp-black border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-lg font-semibold text-tp-ink">Order not found</h2>
        <p className="mt-2 text-sm text-tp-muted">This order may not exist or you don&apos;t have access.</p>
        <Link href="/dashboard/gallery" className="mt-4 inline-block">
          <Button variant="outline" size="sm">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center justify-between rounded-tp-button border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-3 text-red-500 hover:text-red-700">&times;</button>
        </div>
      )}
      {/* Order Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/gallery"
            className="flex h-9 w-9 items-center justify-center rounded-tp-button border border-tp-line text-tp-muted hover:bg-tp-paper transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-display font-normal text-tp-ink capitalize">{order.packageId} Package</h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-tp-muted">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              {' '}
              &middot; {headshots.length} headshot{headshots.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadAll}
            loading={downloading}
            disabled={headshots.length === 0}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download All
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      {headshots.length > 0 && (
        <div className="flex gap-1 rounded-tp-button bg-tp-paper p-1 w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-white text-tp-ink shadow-sm' : 'text-tp-muted hover:text-tp-bronze-ink'
            }`}
          >
            All ({headshots.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === 'favorites' ? 'bg-white text-tp-ink shadow-sm' : 'text-tp-muted hover:text-tp-bronze-ink'
            }`}
          >
            Favorites ({headshots.filter((h) => h.isFavorite).length})
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      {filteredHeadshots.length === 0 ? (
        <div className="rounded-tp-card border border-tp-line bg-white px-6 py-16 text-center shadow-sm">
          {filter === 'favorites' ? (
            <>
              <p className="text-sm text-tp-muted">No favorites yet. Click the heart icon on any headshot to save it.</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-3 text-sm font-medium text-tp-bronze-ink hover:text-tp-bronze"
              >
                Show all headshots
              </button>
            </>
          ) : order.status === 'processing' ? (
            <div className="space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
                <svg className="h-6 w-6 animate-spin text-yellow-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <p className="text-sm text-tp-muted">Your headshots are being generated. Check back soon!</p>
            </div>
          ) : (
            <p className="text-sm text-tp-muted">No headshots generated yet.</p>
          )}
        </div>
      ) : (
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {filteredHeadshots.map((headshot, idx) => (
            <div
              key={headshot.id}
              className="mb-4 break-inside-avoid group relative cursor-pointer overflow-hidden rounded-tp-card border border-tp-line bg-white shadow-sm transition-all hover:shadow-md"
            >
              <img
                src={headshot.thumbnailUrl}
                alt={`Headshot ${idx + 1}`}
                className="w-full object-cover"
                onClick={() => setModalIndex(idx)}
                loading="lazy"
                decoding="async"
              />

              {/* Overlay actions */}
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/50 via-transparent to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadSingle(headshot.imageUrl, idx);
                  }}
                  className="rounded-tp-button bg-white/90 p-2 text-tp-ink hover:bg-white transition-colors"
                  title="Download"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(headshot.id);
                  }}
                  className="rounded-tp-button bg-white/90 p-2 transition-colors hover:bg-white"
                  title={headshot.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg
                    className={`h-4 w-4 ${headshot.isFavorite ? 'fill-red-500 text-red-500' : 'text-tp-ink'}`}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    fill={headshot.isFavorite ? 'currentColor' : 'none'}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalIndex !== null && (
        <HeadshotModal
          headshots={filteredHeadshots}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNavigate={setModalIndex}
          onToggleFavorite={toggleFavorite}
          onDownload={(url, idx) => handleDownloadSingle(url, idx)}
        />
      )}
    </div>
  );
}
