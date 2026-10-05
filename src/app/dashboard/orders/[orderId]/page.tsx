'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { OrderStatusBadge } from '@/components/dashboard/order-status';
import { Button } from '@/components/ui/button';
import { getCategoryById, type CategoryId } from '@/config/categories';
import type { OrderStatus } from '@/types';

interface OrderDetail {
  id: string;
  status: OrderStatus;
  category_id: string;
  package_id: string;
  amount: number;
  currency: string;
  output_count: number;
  headshot_count: number;
  created_at: string;
  updated_at: string;
}

interface PipelineStatus {
  phase: 'pending' | 'training' | 'generating' | 'completed' | 'failed';
  progress: number;
  estimatedMinutesRemaining?: number;
  training: { id: string | null; hasStarted: boolean };
  generation: { total: number; completed: number; failed: number };
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pipeline, setPipeline] = useState<PipelineStatus | null>(null);

  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;

  const fetchOrder = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

      if (fetchError) {
        setError('Order not found');
        return;
      }

      setOrder(data as OrderDetail);
    } catch {
      setError('Failed to load order');
    } finally {
      setLoading(false);
    }
  }, [orderId, supabase]);

  // Fetch pipeline status for processing orders
  const fetchPipelineStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/ai/status?orderId=${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setPipeline(data);
        // Also refresh order when pipeline completes or fails
        if (data.phase === 'completed' || data.phase === 'failed') {
          fetchOrder();
        }
      }
    } catch {
      // Silently fail — will retry on next poll
    }
  }, [orderId, fetchOrder]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Poll pipeline status when order is processing
  useEffect(() => {
    if (!order || order.status !== 'processing') return;

    fetchPipelineStatus();
    const interval = setInterval(fetchPipelineStatus, 10000);
    return () => clearInterval(interval);
  }, [order?.status, fetchPipelineStatus]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-tp-black border-t-transparent" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-paper">
          <svg className="h-7 w-7 text-tp-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="font-display mt-4 text-lg font-normal text-tp-ink">Order not found</h2>
        <p className="mt-2 text-sm text-tp-muted">This order doesn&apos;t exist or you don&apos;t have access.</p>
        <Link href="/dashboard/gallery" className="mt-6 inline-block">
          <Button variant="outline" size="sm">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const category = getCategoryById(order.category_id as CategoryId);
  const categoryName = category?.name || 'AI Photos';
  const totalOutputs = order.output_count || order.headshot_count || 0;
  const amount = (order.amount / 100).toFixed(2);

  const statusMessages: Record<OrderStatus, { title: string; description: string; icon: string }> = {
    pending: {
      title: 'Payment Pending',
      description: 'Your payment is being processed. This usually takes a few seconds.',
      icon: '⏳',
    },
    paid: {
      title: 'Payment Confirmed!',
      description: 'Your payment has been received. You can now upload your photos to start generating.',
      icon: '✅',
    },
    uploading: {
      title: 'Upload Your Photos',
      description: 'Upload your photos so we can start generating your AI images.',
      icon: '📤',
    },
    processing: {
      title: pipeline?.phase === 'generating' ? 'Generating Your Photos' : 'Training AI Model',
      description: pipeline?.phase === 'generating'
        ? `Creating your personalized AI photos (${pipeline.generation.completed}/${pipeline.generation.total} done).`
        : 'Our AI is learning from your uploaded photos to create a personalized model. This takes about 15 minutes.',
      icon: '🤖',
    },
    completed: {
      title: 'Photos Ready!',
      description: 'Your AI-generated photos are ready to view and download.',
      icon: '🎉',
    },
    failed: {
      title: 'Something Went Wrong',
      description: 'There was an issue with your order. Please contact support for assistance.',
      icon: '❌',
    },
    refunded: {
      title: 'Order Refunded',
      description: 'This order has been refunded. Please allow a few business days for the funds to appear on your statement.',
      icon: '↩️',
    },
  };

  const statusInfo = statusMessages[order.status];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
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
          <h1 className="text-xl font-display font-normal text-tp-ink">Order Details</h1>
          <p className="text-sm text-tp-muted">Order #{orderId.slice(0, 8)}</p>
        </div>
      </div>

      {/* Status Card */}
      <div className="rounded-tp-dialog border border-tp-line bg-white p-8 shadow-sm text-center">
        <div className="text-4xl">{statusInfo.icon}</div>
        <h2 className="mt-4 text-xl font-display font-normal text-tp-ink">{statusInfo.title}</h2>
        <p className="mt-2 text-sm text-tp-muted max-w-md mx-auto">{statusInfo.description}</p>
        <div className="mt-4">
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Pipeline Progress */}
        {order.status === 'processing' && pipeline && (
          <div className="mt-6 mx-auto max-w-md space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-tp-muted mb-1.5">
                <span>{pipeline.progress}% complete</span>
                {pipeline.estimatedMinutesRemaining && (
                  <span>~{pipeline.estimatedMinutesRemaining} min remaining</span>
                )}
              </div>
              <div className="h-2.5 rounded-full bg-tp-paper overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-tp-bronze to-tp-bronze-ink transition-all duration-1000 ease-out"
                  style={{ width: `${pipeline.progress}%` }}
                />
              </div>
            </div>

            {/* Phase Steps */}
            <div className="flex items-center justify-center gap-3 text-xs">
              <div className={`flex items-center gap-1.5 ${
                pipeline.phase === 'training' ? 'text-tp-bronze font-medium' :
                pipeline.progress > 50 ? 'text-green-600' : 'text-tp-muted'
              }`}>
                {pipeline.progress > 50 ? (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : pipeline.phase === 'training' ? (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-tp-bronze border-t-transparent animate-spin" />
                ) : (
                  <div className="h-3 w-3 rounded-full border-2 border-tp-line" />
                )}
                AI Training
              </div>
              <svg className="h-3 w-3 text-tp-line" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <div className={`flex items-center gap-1.5 ${
                pipeline.phase === 'generating' ? 'text-tp-bronze font-medium' :
                pipeline.phase === 'completed' ? 'text-green-600' : 'text-tp-muted'
              }`}>
                {pipeline.phase === 'completed' ? (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : pipeline.phase === 'generating' ? (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-tp-bronze border-t-transparent animate-spin" />
                ) : (
                  <div className="h-3 w-3 rounded-full border-2 border-tp-line" />
                )}
                Photo Generation
              </div>
            </div>

            {/* Generation Stats */}
            {pipeline.phase === 'generating' && pipeline.generation.total > 0 && (
              <p className="text-xs text-tp-muted">
                {pipeline.generation.completed} of {pipeline.generation.total} photos generated
                {pipeline.generation.failed > 0 && ` (${pipeline.generation.failed} failed)`}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="rounded-tp-dialog border border-tp-line bg-white shadow-sm">
        <div className="border-b border-tp-line/50 px-6 py-4">
          <h3 className="font-semibold text-tp-ink">Order Summary</h3>
        </div>
        <div className="divide-y divide-tp-line/50">
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-tp-muted">Category</span>
            <span className="text-sm font-medium text-tp-ink">
              {category?.icon} {categoryName}
            </span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-tp-muted">Package</span>
            <span className="text-sm font-medium text-tp-ink capitalize">{order.package_id}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-tp-muted">Photos Included</span>
            <span className="text-sm font-medium text-tp-ink">{totalOutputs}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-tp-muted">Amount Paid</span>
            <span className="text-sm font-medium text-tp-ink">${amount} {order.currency.toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-tp-muted">Order Date</span>
            <span className="text-sm font-medium text-tp-ink">
              {new Date(order.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {(order.status === 'paid' || order.status === 'uploading') && (
          <Link href={`/dashboard/upload?orderId=${orderId}`} className="flex-1">
            <Button size="lg" className="w-full">
              Upload Photos
            </Button>
          </Link>
        )}
        {order.status === 'completed' && (
          <Link href={`/dashboard/gallery/${orderId}`} className="flex-1">
            <Button size="lg" className="w-full">
              View Gallery
            </Button>
          </Link>
        )}
        {order.status === 'failed' && (
          <a href="mailto:support@tailorpic.com" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              Contact Support
            </Button>
          </a>
        )}
        <Link href="/dashboard/gallery" className="flex-1">
          <Button variant="outline" size="lg" className="w-full">
            All Orders
          </Button>
        </Link>
      </div>
    </div>
  );
}
