import { Check, X, Clock, DollarSign, Camera, Sparkles, RefreshCw, Shield } from 'lucide-react';

const rows = [
  {
    feature: 'Maliyet',
    icon: DollarSign,
    traditional: '$200 – $500+',
    tailorpic: '$9.90\'dan başlayan',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Teslimat Süresi',
    icon: Clock,
    traditional: '1 – 2 hafta',
    tailorpic: '2 saat içinde',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Fotoğraf Sayısı',
    icon: Camera,
    traditional: '5 – 15 fotoğraf',
    tailorpic: '40+ fotoğraf',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Stil Çeşitliliği',
    icon: Sparkles,
    traditional: '1 – 2 arka plan',
    tailorpic: '11 farklı kategori',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Yeniden Çekim',
    icon: RefreshCw,
    traditional: 'Ek ücret gerekir',
    tailorpic: 'Sınırsız yenileme',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Gizlilik',
    icon: Shield,
    traditional: 'Fotoğrafçıya bağlı',
    tailorpic: 'Şifreli, 30 gün silme',
    winner: 'tailorpic' as const,
  },
];

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Karşılaştırma
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-tp-black sm:text-3xl">
            AI Fotoğraf vs Geleneksel Stüdyo
          </h2>
          <p className="mt-3 text-base text-tp-muted max-w-xl mx-auto">
            Profesyonel fotoğraf çekimi artık saatler ve yüzlerce dolar gerektirmiyor.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-tp-line overflow-hidden bg-white">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] bg-tp-paper border-b border-tp-line">
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-muted">
              Özellik
            </div>
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-muted text-center">
              Geleneksel Stüdyo
            </div>
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink text-center">
              TailorPic AI
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] items-center ${
                i < rows.length - 1 ? 'border-b border-tp-line/60' : ''
              }`}
            >
              {/* Feature name */}
              <div className="p-4 sm:p-5 flex items-center gap-2.5">
                <row.icon className="h-4 w-4 text-tp-muted/60 flex-shrink-0 hidden sm:block" />
                <span className="text-sm font-medium text-tp-ink">{row.feature}</span>
              </div>

              {/* Traditional */}
              <div className="p-4 sm:p-5 text-center">
                <span className="text-sm text-tp-muted">{row.traditional}</span>
              </div>

              {/* TailorPic */}
              <div className="p-4 sm:p-5 text-center bg-tp-bronze/[0.04]">
                <span className="text-sm font-semibold text-tp-bronze-ink">
                  {row.tailorpic}
                </span>
              </div>
            </div>
          ))}

          {/* Bottom CTA row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] bg-tp-paper border-t border-tp-line">
            <div className="p-4 sm:p-5">
              <span className="text-xs text-tp-muted">Sonuç</span>
            </div>
            <div className="p-4 sm:p-5 flex justify-center">
              <X className="h-5 w-5 text-red-400/70" />
            </div>
            <div className="p-4 sm:p-5 flex justify-center bg-tp-bronze/[0.04]">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-5 text-center text-xs text-tp-muted">
          * Geleneksel stüdyo fiyatları ortalama piyasa değerlerini yansıtmaktadır.
        </p>
      </div>
    </section>
  );
}
