'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from '@/components/dashboard/order-status';
import { formatPrice } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import type { OrderStatus } from '@/types';

interface OrderRow {
  id: string;
  package_id: string;
  category_id?: string;
  status: OrderStatus;
  amount: number;
  currency: string;
  created_at: string;
  headshot_count?: number;
}

export default function BillingClient() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchOrders() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('orders')
        .select('id, package_id, category_id, status, amount, currency, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setOrders((data || []) as OrderRow[]);
      setLoading(false);
    }

    fetchOrders();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-tp-black border-t-transparent" />
      </div>
    );
  }

  // Compute totals
  const totalSpent = orders
    .filter((o) => o.status !== 'pending' && o.status !== 'failed')
    .reduce((sum, o) => sum + o.amount, 0);
  const completedCount = orders.filter((o) => o.status === 'completed').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-normal text-tp-ink">Billing &amp; Invoices</h1>
        <p className="mt-1 text-sm text-tp-muted">
          View your payment history and order details.
        </p>
      </div>

      {/* Current plan */}
      <div className="rounded-tp-dialog border border-tp-line bg-white p-6">
        <h2 className="font-display text-xl font-normal text-tp-ink">Your Plan</h2>
        <p className="mt-2 text-sm text-tp-ink">
          One-time payment — no subscription and no recurring charges.
        </p>
        <p className="mt-1 text-sm text-tp-muted">
          Invoices for each order are available below. For billing questions, contact{' '}
          <a href={`mailto:${siteConfig.supportEmail}`} className="text-tp-bronze-ink underline">
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-tp-dialog border border-tp-line bg-white p-6">
          <p className="text-sm font-medium text-tp-muted">Total Spent</p>
          <p className="mt-2 font-display text-3xl font-normal text-tp-ink">
            {formatPrice(totalSpent)}
          </p>
        </div>
        <div className="rounded-tp-dialog border border-tp-line bg-white p-6">
          <p className="text-sm font-medium text-tp-muted">Total Orders</p>
          <p className="mt-2 font-display text-3xl font-normal text-tp-ink">{orders.length}</p>
        </div>
        <div className="rounded-tp-dialog border border-tp-line bg-white p-6">
          <p className="text-sm font-medium text-tp-muted">Completed</p>
          <p className="mt-2 font-display text-3xl font-normal text-tp-ink">{completedCount}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-tp-dialog border border-tp-line bg-white shadow-sm">
        <div className="border-b border-tp-line px-6 py-4">
          <h2 className="font-display text-xl font-normal text-tp-ink">Order History</h2>
        </div>

        {orders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <svg
              className="mx-auto h-12 w-12 text-tp-line"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <p className="mt-4 text-sm font-medium text-tp-ink">No orders yet</p>
            <p className="mt-1 text-sm text-tp-muted">
              Browse our categories and create your first AI photos.
            </p>
            <Link href="/#pricing" className="mt-6 inline-block">
              <Button variant="primary" size="md">
                Browse Categories
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Table header - hidden on mobile */}
            <div className="hidden border-b border-tp-line/50 px-6 py-3 sm:grid sm:grid-cols-12 sm:gap-4">
              <span className="col-span-3 text-xs font-medium uppercase tracking-wider text-tp-muted">
                Date
              </span>
              <span className="col-span-3 text-xs font-medium uppercase tracking-wider text-tp-muted">
                Package
              </span>
              <span className="col-span-2 text-xs font-medium uppercase tracking-wider text-tp-muted">
                Category
              </span>
              <span className="col-span-2 text-xs font-medium uppercase tracking-wider text-tp-muted text-right">
                Amount
              </span>
              <span className="col-span-2 text-xs font-medium uppercase tracking-wider text-tp-muted text-right">
                Status
              </span>
            </div>

            <div className="divide-y divide-tp-line/50">
              {orders.map((order) => {
                const category = getCategoryById(
                  (order.category_id || 'headshots') as CategoryId
                );
                const pkg = category
                  ? getPackageById(category.id, order.package_id)
                  : null;
                const isExpanded = expandedId === order.id;

                return (
                  <div key={order.id}>
                    {/* Row */}
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : order.id)
                      }
                      className="w-full px-6 py-4 text-left hover:bg-tp-paper/50 transition-colors"
                    >
                      {/* Desktop layout */}
                      <div className="hidden sm:grid sm:grid-cols-12 sm:items-center sm:gap-4">
                        <span className="col-span-3 text-sm text-tp-ink">
                          {new Date(order.created_at).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </span>
                        <span className="col-span-3 text-sm font-medium text-tp-ink capitalize">
                          {pkg ? pkg.name : order.package_id}
                        </span>
                        <span className="col-span-2 text-sm text-tp-muted">
                          {category
                            ? `${category.icon} ${category.shortName}`
                            : '-'}
                        </span>
                        <span className="col-span-2 text-sm font-medium text-tp-ink text-right">
                          {formatPrice(order.amount, order.currency)}
                        </span>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                          <OrderStatusBadge status={order.status} />
                          <svg
                            className={`h-4 w-4 text-tp-muted transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Mobile layout */}
                      <div className="flex items-center justify-between sm:hidden">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-tp-ink capitalize">
                            {category
                              ? `${category.icon} ${category.shortName}`
                              : order.package_id}
                          </p>
                          <p className="mt-0.5 text-xs text-tp-muted">
                            {new Date(order.created_at).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-tp-ink">
                            {formatPrice(order.amount, order.currency)}
                          </span>
                          <OrderStatusBadge status={order.status} />
                          <svg
                            className={`h-4 w-4 text-tp-muted transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="border-t border-tp-line/30 bg-tp-paper/30 px-6 py-4">
                        <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <p className="text-xs font-medium text-tp-muted">
                              Order ID
                            </p>
                            <p className="mt-0.5 font-mono text-xs text-tp-ink">
                              {order.id}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-tp-muted">
                              Package
                            </p>
                            <p className="mt-0.5 text-tp-ink capitalize">
                              {pkg ? pkg.name : order.package_id}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-tp-muted">
                              Category
                            </p>
                            <p className="mt-0.5 text-tp-ink">
                              {category ? category.name : '-'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-tp-muted">
                              Date &amp; Time
                            </p>
                            <p className="mt-0.5 text-tp-ink">
                              {new Date(order.created_at).toLocaleString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-3">
                          <Link href={`/dashboard/gallery/${order.id}`}>
                            <Button variant="outline" size="sm">
                              View Photos
                            </Button>
                          </Link>
                          <a
                            href={`/api/invoices/${order.id}`}
                            download={`invoice-${order.id}.html`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="outline" size="sm">
                              Download Invoice
                            </Button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
