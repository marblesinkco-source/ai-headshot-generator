'use client';

import { useState, useEffect, useCallback } from 'react';
import { BarChart3, TrendingUp, MousePointerClick, Zap, RefreshCw, Calendar } from 'lucide-react';

interface AnalyticsData {
  period: { days: number; since: string };
  summary: {
    totalPageViews: number;
    totalClicks: number;
    totalConversions: number;
    totalRevenue: number;
  };
  pageViews: {
    byPage: Record<string, number>;
    byDevice: Record<string, number>;
    byDay: Record<string, number>;
  };
  topClicks: Array<{ element: string; count: number }>;
  conversions: Record<string, number>;
  optimizations: Array<{
    type: string;
    decision: Record<string, unknown>;
    reasoning: string;
    date: string;
  }>;
  abTests: Array<{
    name: string;
    description: string;
    variants: unknown[];
    status: string;
    winner: string | null;
  }>;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function InsightsClient() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/metrics?days=${days}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch {
      setError('Veriler yüklenemedi. Tablolar henüz oluşturulmamış olabilir.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display font-normal text-2xl text-tp-ink">AI Insights</h1>
          <p className="text-tp-muted mt-1">Veriler yükleniyor...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-tp-card border border-tp-line p-6 animate-pulse">
              <div className="h-4 bg-tp-beige rounded w-24 mb-3" />
              <div className="h-8 bg-tp-beige rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const summary = data?.summary || { totalPageViews: 0, totalClicks: 0, totalConversions: 0, totalRevenue: 0 };
  const hasData = summary.totalPageViews > 0 || summary.totalClicks > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-normal text-2xl text-tp-ink">AI Insights</h1>
          <p className="text-tp-muted mt-1">Self-optimization engine — otomatik analiz ve optimizasyon</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            aria-label="Select time range"
            className="text-sm border border-tp-line rounded-tp-button px-3 py-2 bg-white text-tp-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/20"
          >
            <option value={7}>Son 7 gün</option>
            <option value={14}>Son 14 gün</option>
            <option value={30}>Son 30 gün</option>
          </select>
          <button
            onClick={fetchData}
            className="p-2 text-tp-muted hover:text-tp-ink transition-colors rounded-tp-button hover:bg-tp-beige"
            title="Yenile"
            aria-label="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-tp-warning/15 border border-tp-warning/30 rounded-tp-card p-4 text-tp-bronze-ink text-sm">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<BarChart3 className="w-5 h-5" />}
          label="Sayfa Görüntüleme"
          value={formatNumber(summary.totalPageViews)}
          color="text-tp-ink bg-tp-beige"
        />
        <SummaryCard
          icon={<MousePointerClick className="w-5 h-5" />}
          label="Tıklama"
          value={formatNumber(summary.totalClicks)}
          color="text-tp-success bg-tp-success/10"
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Dönüşüm"
          value={formatNumber(summary.totalConversions)}
          color="text-tp-bronze-ink bg-tp-warning/15"
        />
        <SummaryCard
          icon={<Zap className="w-5 h-5" />}
          label="Toplam Gelir"
          value={formatPrice(summary.totalRevenue)}
          color="text-tp-bronze bg-tp-beige"
        />
      </div>

      {!hasData && !error && (
        <div className="bg-white rounded-tp-card border border-tp-line p-8 text-center">
          <Zap className="w-10 h-10 text-tp-bronze mx-auto mb-3" />
          <h3 className="font-display font-normal text-lg text-tp-ink mb-2">Henüz veri yok</h3>
          <p className="text-tp-muted text-sm max-w-md mx-auto">
            Self-optimization engine aktif. Ziyaretçi verileri toplandıkça burada analiz ve optimizasyon önerileri göreceksiniz.
          </p>
        </div>
      )}

      {hasData && (
        <>
          {/* Top Pages */}
          <div className="bg-white rounded-tp-card border border-tp-line p-6">
            <h2 className="font-display font-normal text-lg text-tp-ink mb-4">En Çok Ziyaret Edilen Sayfalar</h2>
            <div className="space-y-3">
              {Object.entries(data?.pageViews.byPage || {})
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([page, count]) => (
                  <div key={page} className="flex items-center justify-between">
                    <span className="text-sm text-tp-ink truncate max-w-[60%]">{page}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-tp-beige rounded-full h-2">
                        <div
                          className="bg-tp-bronze rounded-full h-2 transition-all"
                          style={{
                            width: `${Math.min(100, (count / (Object.values(data?.pageViews.byPage || {})[0] || 1)) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-tp-muted w-12 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Device Breakdown + Top Clicks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-tp-card border border-tp-line p-6">
              <h2 className="font-display font-normal text-lg text-tp-ink mb-4">Cihaz Dağılımı</h2>
              <div className="space-y-3">
                {Object.entries(data?.pageViews.byDevice || {})
                  .filter(([, count]) => count > 0)
                  .sort((a, b) => b[1] - a[1])
                  .map(([device, count]) => (
                    <div key={device} className="flex items-center justify-between">
                      <span className="text-sm text-tp-ink capitalize">{device === 'desktop' ? 'Masaüstü' : device === 'mobile' ? 'Mobil' : 'Tablet'}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-tp-beige rounded-full h-2">
                          <div
                            className="bg-tp-bronze rounded-full h-2"
                            style={{ width: `${(count / summary.totalPageViews) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-tp-muted">{((count / summary.totalPageViews) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-tp-card border border-tp-line p-6">
              <h2 className="font-display font-normal text-lg text-tp-ink mb-4">En Çok Tıklanan Elementler</h2>
              <div className="space-y-3">
                {(data?.topClicks || []).slice(0, 8).map((click) => (
                  <div key={click.element} className="flex items-center justify-between">
                    <span className="text-sm text-tp-ink truncate max-w-[60%]">{click.element}</span>
                    <span className="text-sm text-tp-muted">{click.count} tıklama</span>
                  </div>
                ))}
                {(data?.topClicks || []).length === 0 && (
                  <p className="text-sm text-tp-muted">Henüz tıklama verisi yok</p>
                )}
              </div>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-tp-card border border-tp-line p-6">
            <h2 className="font-display font-normal text-lg text-tp-ink mb-4">Dönüşüm Hunisi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {['signup', 'package_select', 'checkout_start', 'payment_complete', 'upload_start', 'generation_start', 'generation_complete'].map((step) => {
                const count = data?.conversions[step] || 0;
                const labels: Record<string, string> = {
                  signup: 'Kayıt',
                  package_select: 'Paket Seçimi',
                  checkout_start: 'Ödeme Başlatma',
                  payment_complete: 'Ödeme Tamamlama',
                  upload_start: 'Yükleme',
                  generation_start: 'Üretim Başlatma',
                  generation_complete: 'Üretim Tamamlama',
                };
                return (
                  <div key={step} className="text-center p-3 bg-tp-paper rounded-tp-button">
                    <div className="text-2xl font-semibold text-tp-ink">{count}</div>
                    <div className="text-xs text-tp-muted mt-1">{labels[step] || step}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Optimization Log */}
      <div className="bg-white rounded-tp-card border border-tp-line p-6">
        <h2 className="font-display font-normal text-lg text-tp-ink mb-4">Optimizasyon Geçmişi</h2>
        {(data?.optimizations || []).length === 0 ? (
          <div className="text-center py-6">
            <Calendar className="w-8 h-8 text-tp-muted mx-auto mb-2" />
            <p className="text-sm text-tp-muted">Henüz optimizasyon kararı alınmadı. Günlük cron job veri toplandıkça çalışacak.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(data?.optimizations || []).map((opt, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-tp-button bg-tp-paper">
                <div className="shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-tp-bronze" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium bg-tp-bronze/10 text-tp-bronze px-2 py-0.5 rounded-full capitalize">
                      {opt.type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs text-tp-muted">
                      {new Date(opt.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-tp-ink">{opt.reasoning}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* A/B Tests */}
      {(data?.abTests || []).length > 0 && (
        <div className="bg-white rounded-tp-card border border-tp-line p-6">
          <h2 className="font-display font-normal text-lg text-tp-ink mb-4">A/B Testleri</h2>
          <div className="space-y-3">
            {(data?.abTests || []).map((test, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-tp-button bg-tp-paper">
                <div>
                  <span className="text-sm font-medium text-tp-ink">{test.name}</span>
                  {test.description && <p className="text-xs text-tp-muted mt-0.5">{test.description}</p>}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  test.status === 'active' ? 'bg-tp-success/10 text-tp-success' :
                  test.status === 'completed' ? 'bg-tp-beige text-tp-ink' :
                  'bg-tp-paper text-tp-muted'
                }`}>
                  {test.status === 'active' ? 'Aktif' : test.status === 'completed' ? 'Tamamlandı' : 'Duraklatıldı'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-tp-card border border-tp-line p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-tp-button ${color}`}>
          {icon}
        </div>
        <span className="text-sm text-tp-muted">{label}</span>
      </div>
      <div className="text-2xl font-semibold text-tp-ink">{value}</div>
    </div>
  );
}
