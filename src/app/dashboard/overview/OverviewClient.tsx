'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from '@/components/dashboard/order-status';
import { formatPrice } from '@/lib/utils';
import { getCategoryById, type CategoryId } from '@/config/categories';
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

interface Stats {
  totalOrders: number;
  headshotsGenerated: number;
  favorites: number;
}

export default function OverviewClient() {
  const [userName, setUserName] = useState('');
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, headshotsGenerated: 0, favorites: 0 });
  const [recentOrders, setRecentOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'there');

      // Fetch orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id, package_id, category_id, status, amount, currency, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        setLoadError('We could not load your orders. Please refresh the page.');
        setLoading(false);
        return;
      }

      const orderList = (orders || []) as OrderRow[];
      setRecentOrders(orderList.slice(0, 5));

      // Fetch headshot count (via orders belonging to this user)
      const orderIds = orderList.map((o) => o.id);
      let headshotCount = 0;
      let favCount = 0;

      if (orderIds.length > 0) {
        const { count: hCount } = await supabase
          .from('generated_headshots')
          .select('id', { count: 'exact', head: true })
          .in('order_id', orderIds);
        headshotCount = hCount || 0;

        // Fetch favorites count
        const { count: fCount } = await supabase
          .from('generated_headshots')
          .select('id', { count: 'exact', head: true })
          .in('order_id', orderIds)
          .eq('is_favorite', true);
        favCount = fCount || 0;
      }

      setStats({
        totalOrders: orderList.length,
        headshotsGenerated: headshotCount || 0,
        favorites: favCount || 0,
      });

      setLoading(false);
    }

    fetchData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20" role="status" aria-live="polite">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-tp-black border-t-transparent" />
        <span className="sr-only">Loading your dashboard</span>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: (
        <svg className="h-6 w-6 text-tp-bronze" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      label: 'Photos Generated',
      value: stats.headshotsGenerated,
      icon: (
        <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      ),
    },
    {
      label: 'Favorites',
      value: stats.favorites,
      icon: (
        <svg className="h-6 w-6 text-tp-bronze-ink" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-display font-normal text-tp-ink">Welcome back, {userName}</h1>
          <p className="mt-1 text-sm text-tp-muted">Here&apos;s what&apos;s happening with your photos.</p>
        </div>
        <Link href="/dashboard/upload">
          <Button variant="primary" size="md">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create New
          </Button>
        </Link>
      </div>

      {loadError && (
        <div role="alert" className="rounded-tp-button border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {loadError}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-tp-card border border-tp-line bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-tp-muted">{card.label}</p>
              {card.icon}
            </div>
            <p className="mt-3 font-display text-3xl font-normal text-tp-ink">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-tp-card border border-tp-line bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-tp-line px-6 py-4">
          <h2 className="font-display text-2xl font-normal text-tp-ink">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-sm font-medium text-tp-bronze-ink hover:underline">
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-tp-line" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="mt-4 text-sm font-medium text-tp-ink">No orders yet</p>
            <p className="mt-1 text-sm text-tp-muted">Upload a few photos to create your first AI portraits.</p>
            <Link href="/dashboard/upload" className="mt-4 inline-block">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-tp-line/50">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/gallery/${order.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-tp-paper transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
                    <svg className="h-5 w-5 text-tp-bronze" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-tp-ink capitalize">
                      {(() => {
                        const cat = getCategoryById((order.category_id || 'headshots') as CategoryId);
                        return cat ? `${cat.icon} ${cat.shortName}` : order.package_id;
                      })()}{' '}
                      — {order.package_id}
                    </p>
                    <p className="text-xs text-tp-muted">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-tp-ink">
                    {formatPrice(order.amount, order.currency)}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
