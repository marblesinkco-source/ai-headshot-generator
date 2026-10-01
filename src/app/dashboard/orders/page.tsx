'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from '@/components/dashboard/order-status';
import { formatPrice } from '@/lib/utils';
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
}

type StatusFilter = 'all' | 'pending' | 'processing' | 'completed';

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
];

// Group intermediate statuses under the filter tabs
function matchesFilter(status: OrderStatus, filter: StatusFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'pending':
      return status === 'pending' || status === 'paid' || status === 'uploading';
    case 'processing':
      return status === 'processing';
    case 'completed':
      return status === 'completed';
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>('all');

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function fetchOrders() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

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

  const filtered = orders.filter((o) => matchesFilter(o.status, filter));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-tp-ink">My Orders</h1>
        <p className="mt-1 text-sm text-tp-muted">
          Track the status of every order and jump to your photos.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-tp-black border-t-transparent" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-tp-line bg-white px-6 py-16 text-center">
          <p className="text-sm font-medium text-tp-ink">No orders yet</p>
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
          {/* Status filter */}
          <div
            role="tablist"
            aria-label="Filter orders by status"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
          >
            {FILTERS.map((f) => {
              const count = orders.filter((o) => matchesFilter(o.status, f.value)).length;
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.value)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'border-tp-black bg-tp-black text-white'
                      : 'border-tp-line bg-white text-tp-muted hover:bg-tp-paper'
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 text-xs ${active ? 'text-white/70' : 'text-tp-muted'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-tp-line bg-white px-6 py-12 text-center">
              <p className="text-sm text-tp-muted">No orders match this filter.</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-3 text-sm font-medium text-tp-bronze-ink underline"
              >
                Show all orders
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {filtered.map((order) => {
                const category = getCategoryById((order.category_id || 'headshots') as CategoryId);
                const pkg = category ? getPackageById(category.id, order.package_id) : undefined;
                const needsUpload =
                  order.status === 'paid' || order.status === 'uploading';

                return (
                  <li
                    key={order.id}
                    className="rounded-2xl border border-tp-line bg-white p-5 shadow-sm sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-semibold capitalize text-tp-ink">
                            {pkg ? pkg.name : order.package_id}
                          </h2>
                          <OrderStatusBadge status={order.status} />
                        </div>
                        <p className="text-sm text-tp-muted">
                          {category ? `${category.icon} ${category.name}` : '-'}
                        </p>
                        <p className="text-xs text-tp-muted">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}{' '}
                          · <span className="font-mono">#{order.id.slice(0, 8)}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                        <span className="text-lg font-bold text-tp-ink">
                          {formatPrice(order.amount, order.currency)}
                        </span>
                        <div className="flex gap-2">
                          {needsUpload && (
                            <Link href={`/dashboard/upload?orderId=${order.id}`}>
                              <Button variant="primary" size="sm">
                                Upload Photos
                              </Button>
                            </Link>
                          )}
                          {order.status === 'completed' && (
                            <Link href={`/dashboard/gallery/${order.id}`}>
                              <Button variant="primary" size="sm">
                                View Gallery
                              </Button>
                            </Link>
                          )}
                          <Link href={`/dashboard/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
