'use client';

import { useEffect, useState, useCallback } from 'react';
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

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

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

  useEffect(() => {
    fetchOrder();

    // Poll for status updates if order is processing
    const interval = setInterval(() => {
      fetchOrder();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchOrder]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-900">Order not found</h2>
        <p className="mt-2 text-sm text-gray-500">This order doesn&apos;t exist or you don&apos;t have access.</p>
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
      title: 'Generating Your Photos',
      description: 'Our AI is working on your photos. This typically takes 1-2 hours. We\'ll email you when they\'re ready.',
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
  };

  const statusInfo = statusMessages[order.status];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/gallery"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
          <p className="text-sm text-gray-500">Order #{orderId.slice(0, 8)}</p>
        </div>
      </div>

      {/* Status Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <div className="text-4xl">{statusInfo.icon}</div>
        <h2 className="mt-4 text-xl font-bold text-gray-900">{statusInfo.title}</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">{statusInfo.description}</p>
        <div className="mt-4">
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Order Summary */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Order Summary</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-gray-500">Category</span>
            <span className="text-sm font-medium text-gray-900">
              {category?.icon} {categoryName}
            </span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-gray-500">Package</span>
            <span className="text-sm font-medium text-gray-900 capitalize">{order.package_id}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-gray-500">Photos Included</span>
            <span className="text-sm font-medium text-gray-900">{totalOutputs}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-gray-500">Amount Paid</span>
            <span className="text-sm font-medium text-gray-900">${amount} {order.currency.toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm text-gray-500">Order Date</span>
            <span className="text-sm font-medium text-gray-900">
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
