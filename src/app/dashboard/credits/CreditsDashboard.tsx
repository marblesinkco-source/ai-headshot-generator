'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CreditPackage {
  id: string;
  package_id: string;
  total_credits: number;
  used_credits: number;
  remaining_credits: number;
  purchased_at: string;
  expires_at: string;
}

interface Transaction {
  id: string;
  type: 'purchase' | 'use' | 'refund' | 'expire';
  amount: number;
  balance_after: number;
  category_id: string | null;
  description: string | null;
  created_at: string;
}

interface CreditsData {
  balance: number;
  totalUsed: number;
  packages: CreditPackage[];
  transactions: Transaction[];
}

export default function CreditsDashboard() {
  const [data, setData] = useState<CreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const res = await fetch('/api/credits');
        if (!res.ok) throw new Error('Failed to fetch credits');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError('Kredi bilgileri yüklenemedi.');
      } finally {
        setLoading(false);
      }
    }
    fetchCredits();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-tp-bronze border-t-transparent" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-tp-card border border-red-200 bg-red-50 p-6 text-center text-red-700">
        {error || 'An error occurred.'}
      </div>
    );
  }

  const totalCredits = data.packages.reduce((s: number, p: CreditPackage) => s + p.total_credits, 0);
  const usagePercent = totalCredits > 0 ? Math.round((data.totalUsed / totalCredits) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-tp-black">Credits</h1>
          <p className="mt-1 text-sm text-tp-muted">
            Manage your credit balance and view transaction history.
          </p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-tp-button bg-tp-black px-4 py-2.5 text-sm font-medium text-tp-bronze transition-colors hover:bg-tp-ink"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Buy Credits
        </Link>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Available Balance */}
        <div className="rounded-tp-card border border-tp-line/50 bg-white p-6">
          <p className="text-sm font-medium text-tp-muted">Available Balance</p>
          <p className="mt-2 text-3xl font-bold text-tp-black">{data.balance}</p>
          <p className="mt-1 text-xs text-tp-muted">credits remaining</p>
        </div>

        {/* Total Used */}
        <div className="rounded-tp-card border border-tp-line/50 bg-white p-6">
          <p className="text-sm font-medium text-tp-muted">Total Used</p>
          <p className="mt-2 text-3xl font-bold text-tp-bronze-ink">{data.totalUsed}</p>
          <p className="mt-1 text-xs text-tp-muted">credits consumed</p>
        </div>

        {/* Usage */}
        <div className="rounded-tp-card border border-tp-line/50 bg-white p-6">
          <p className="text-sm font-medium text-tp-muted">Usage</p>
          <p className="mt-2 text-3xl font-bold text-tp-black">{usagePercent}%</p>
          <div className="mt-3 h-2 rounded-full bg-tp-paper">
            <div
              className="h-2 rounded-full bg-tp-bronze transition-all"
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Active Packages */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-tp-black">Active Packages</h2>
        {data.packages.length === 0 ? (
          <div className="rounded-tp-card border border-dashed border-tp-line bg-white p-8 text-center">
            <p className="text-tp-muted">No active credit packages.</p>
            <Link
              href="/pricing"
              className="mt-3 inline-block text-sm font-medium text-tp-bronze-ink underline hover:text-tp-black"
            >
              Purchase credits
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.packages.map((pkg) => {
              const daysLeft = Math.max(
                0,
                Math.ceil(
                  (new Date(pkg.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                )
              );
              const pkgPercent =
                pkg.total_credits > 0
                  ? Math.round((pkg.used_credits / pkg.total_credits) * 100)
                  : 0;
              const isExpiringSoon = daysLeft <= 30;

              return (
                <div
                  key={pkg.id}
                  className="rounded-tp-card border border-tp-line/50 bg-white p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-tp-black">{pkg.package_id}</p>
                      <p className="mt-0.5 text-xs text-tp-muted">
                        Purchased {new Date(pkg.purchased_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        isExpiringSoon
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {daysLeft}d left
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-semibold text-tp-black">
                        {pkg.remaining_credits} / {pkg.total_credits}
                      </span>
                      <span className="text-tp-muted">{pkgPercent}% used</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-tp-paper">
                      <div
                        className="h-1.5 rounded-full bg-tp-bronze transition-all"
                        style={{ width: `${pkgPercent}%` }}
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-tp-muted">
                    Expires {new Date(pkg.expires_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Transaction History */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-tp-black">Recent Transactions</h2>
        {data.transactions.length === 0 ? (
          <div className="rounded-tp-card border border-dashed border-tp-line bg-white p-8 text-center">
            <p className="text-tp-muted">No transactions yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-tp-card border border-tp-line/50 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-tp-line/50 bg-tp-paper/50">
                    <th className="px-4 py-3 text-left font-medium text-tp-muted">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-tp-muted">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-tp-muted">Description</th>
                    <th className="px-4 py-3 text-right font-medium text-tp-muted">Amount</th>
                    <th className="px-4 py-3 text-right font-medium text-tp-muted">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tp-line/30">
                  {data.transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-tp-paper/30 transition-colors">
                      <td className="whitespace-nowrap px-4 py-3 text-tp-muted">
                        {new Date(tx.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <TypeBadge type={tx.type} />
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3 text-tp-black">
                        {tx.description || tx.type}
                      </td>
                      <td
                        className={`whitespace-nowrap px-4 py-3 text-right font-medium ${
                          tx.amount > 0 ? 'text-emerald-600' : 'text-tp-muted'
                        }`}
                      >
                        {tx.amount > 0 ? '+' : ''}
                        {tx.amount}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-tp-black">
                        {tx.balance_after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    purchase: 'bg-emerald-50 text-emerald-700',
    use: 'bg-blue-50 text-blue-700',
    refund: 'bg-amber-50 text-amber-700',
    expire: 'bg-red-50 text-red-700',
  };

  const labels: Record<string, string> = {
    purchase: 'Purchase',
    use: 'Used',
    refund: 'Refund',
    expire: 'Expired',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        styles[type] || 'bg-tp-paper text-tp-muted'
      }`}
    >
      {labels[type] || type}
    </span>
  );
}
