'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { OrderStatusBadge } from '@/components/dashboard/order-status';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { OrderStatus } from '@/types';

interface OrderRow {
  id: string;
  package_id: string;
  status: OrderStatus;
  amount: number;
  currency: string;
  created_at: string;
  headshot_count: number;
}

export default function GalleryListPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchOrders() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: rawOrders } = await supabase
        .from('orders')
        .select('id, package_id, status, amount, currency, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!rawOrders) {
        setLoading(false);
        return;
      }

      // Get headshot counts per order
      const ordersWithCounts: OrderRow[] = await Promise.all(
        rawOrders.map(async (order) => {
          const { count } = await supabase
            .from('generated_headshots')
            .select('id', { count: 'exact', head: true })
            .eq('order_id', order.id);

          return {
            ...order,
            status: order.status as OrderStatus,
            headshot_count: count || 0,
          };
        })
      );

      setOrders(ordersWithCounts);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-normal text-tp-ink">My Gallery</h1>
          <p className="mt-1 text-sm text-tp-muted">Browse the headshots generated for each of your orders.</p>
        </div>
        <Link href="/dashboard/upload">
          <Button variant="primary" size="md">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Order
          </Button>
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-tp-line bg-white px-6 py-16 text-center shadow-sm">
          <svg className="mx-auto h-16 w-16 text-tp-line" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-tp-ink">No orders yet</h3>
          <p className="mt-2 text-sm text-tp-muted">Create your first order to get AI-powered professional headshots.</p>
          <Link href="/dashboard/upload" className="mt-6 inline-block">
            <Button variant="primary" size="md">Get Started</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/dashboard/gallery/${order.id}`}
              className="group rounded-xl border border-tp-line bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-tp-bronze/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tp-paper group-hover:bg-tp-beige/30 transition-colors">
                  <svg className="h-5 w-5 text-tp-bronze" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-tp-ink capitalize">{order.package_id} Package</h3>
                <p className="mt-1 text-sm text-tp-muted">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-tp-line/50 pt-4">
                <span className="text-sm text-tp-muted">
                  {order.headshot_count} headshot{order.headshot_count !== 1 ? 's' : ''}
                </span>
                <span className="text-sm font-medium text-tp-ink">
                  {formatPrice(order.amount, order.currency)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
