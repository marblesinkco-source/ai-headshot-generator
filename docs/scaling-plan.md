# TailorPic — Kademeli Ölçeklendirme Planı

> Son Güncelleme: Ekim 2026
> Mevcut Kapasite: ~100 müşteri/gün (rahat), ~500 müşteri/gün (limit)

---

## Mevcut Mimari Özeti

| Katman | Teknoloji | Durum |
|--------|-----------|-------|
| Hosting | Vercel Serverless (fra1) | Tek bölge, default timeout |
| Veritabanı | Supabase (PostgREST HTTP API) | 8 tablo, RLS aktif |
| Depolama | Supabase Storage (2 bucket) | uploads (private), headshots (public) |
| AI | Replicate FLUX LoRA | Training + prediction, webhook async |
| Ödeme | Stripe | 4 webhook event, status-based idempotency |
| Rate Limit | In-memory Map | Deploy'da sıfırlanır, instance paylaşımsız |
| Email | Resend | Transactional email |
| Auth | Supabase Auth + Google OAuth | SSR cookie-based |
| Queue | YOK | Replicate'in kendi kuyruğuna bağımlı |
| Monitoring | YOK | Error tracking yok |
| CDN | Vercel Edge Network | Statik asset'ler için |

---

## FAZ 1: 10.000 Müşteri/Ay (~333/gün)

### Gerekli Değişiklikler

#### 1. Redis Rate Limiting (KRİTİK)
- **Sorun:** In-memory Map serverless'ta çalışmıyor
- **Çözüm:** Upstash Redis
- **Uygulama:**
  - `@upstash/ratelimit` paketi
  - Sliding window algoritması
  - Tüm mevcut rate limit'ler korunur
- **Maliyet:** $0-10/ay (Free tier: 10K request/gün)

#### 2. maxDuration + Memory Config (KRİTİK)
- **Sorun:** AI generate 100MB bellek + default timeout
- **Çözüm:**
  - `ai/generate`: `maxDuration = 300` (5 dakika)
  - `ai/webhook`: `maxDuration = 300`
  - vercel.json'da function memory: 1024MB
- **Maliyet:** $0 (Vercel Pro dahilinde)

#### 3. Basit Retry Mekanizması (KRİTİK)
- **Sorun:** Başarısız prediction = sonsuza kadar "processing"
- **Çözüm:**
  - Vercel Cron ile her 15dk stuck order taraması
  - 3x retry, exponential backoff (5dk, 15dk, 45dk)
  - 3 başarısız denemede admin'e email alert
  - Order'a `retry_count` ve `last_retry_at` alanları
- **Maliyet:** $0

#### 4. Stripe Event Dedupe (ORTA)
- **Sorun:** Race condition riski
- **Çözüm:** `processed_events` tablosu (event_id UNIQUE)
- **Maliyet:** $0

#### 5. Supabase Pro Plan (ORTA)
- **Neden:** Free tier limitleri (500MB DB, 1GB storage, 50K MAU)
- **Pro verir:** 8GB DB, 100GB storage, sınırsız MAU, günlük backup
- **Maliyet:** $25/ay

### Faz 1 Toplam Maliyet

| Servis | Aylık |
|--------|-------|
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Upstash Redis | $0-10 |
| Replicate AI | $1,000-3,300 |
| Resend Email | $0-20 |
| **Toplam** | **$1,045-3,375/ay** |

### Faz 1 Gelir Projeksiyonu

| Metrik | Değer |
|--------|-------|
| Müşteri/ay | 10,000 |
| Fiyat | $9.90 |
| Aylık gelir | $99,000 |
| Altyapı maliyeti | ~$3,375 (üst sınır) |
| **Gross margin** | **~96.6%** |

---

## FAZ 2: 100.000 Müşteri/Ay (~3,333/gün)

### Gerekli Değişiklikler (Faz 1'e ek)

#### 1. Job Queue Sistemi (KRİTİK)
- **Sorun:** Senkron AI generate + webhook fan-out ölçeklenmiyor
- **Çözüm:** Inngest veya QStash
- **Mimari:**
  ```
  Kullanıcı upload → API route → Inngest event tetikle
    → Step 1: Fotoları zip'le
    → Step 2: Replicate training başlat
    → Step 3: Prediction'ları başlat (paralel)
    → Step 4: Sonuçları indir + storage'a yükle
    → Step 5: Kullanıcıya email gönder
  ```
- **Avantajlar:**
  - Otomatik retry (configurable)
  - Dead-letter queue
  - Step-based execution (her adım bağımsız timeout)
  - Dashboard ile iş takibi
  - Concurrency control
- **Maliyet:** $50-150/ay (Inngest Pro)

#### 2. Direct-to-Storage Upload (KRİTİK)
- **Sorun:** 10 foto × 10MB = 100MB serverless function'dan geçiyor
- **Çözüm:**
  - Client'tan Supabase presigned URL ile doğrudan upload
  - Serverless function sadece URL oluşturur (~1KB response)
  - Upload sonrası client API'ye bildirim gönderir
- **Kazanç:** Function memory %90 azalır, timeout riski biter
- **Maliyet:** $0

#### 3. Multi-Region Deployment (YÜKSEK)
- **Sorun:** Tek bölge (fra1) — ABD/Asya müşterileri için +200-400ms
- **Çözüm:**
  - Vercel multi-region: `regions: ["fra1", "iad1", "hnd1"]`
  - Edge middleware ile geo-routing
  - Supabase Read Replicas (ABD + Asya)
- **Maliyet:** Vercel Pro dahilinde, Supabase +$75/ay per replica

#### 4. CDN + Image Optimization (YÜKSEK)
- **Sorun:** Headshot download'ları doğrudan Supabase storage'dan
- **Çözüm:**
  - Cloudflare R2 veya AWS CloudFront
  - Generated headshot'lar CDN'e cache
  - Supabase bandwidth maliyeti düşer
- **Maliyet:** $20-50/ay

#### 5. Admin Dashboard (ORTA)
- **İçerik:**
  - Aktif/stuck/failed order listesi
  - Müşteri istatistikleri
  - Revenue tracking
  - AI generation success rate
  - Manuel retry butonu
- **Maliyet:** $0 (kod maliyeti)

#### 6. Error Monitoring — Sentry (ORTA)
- **İçerik:**
  - Runtime hata takibi
  - Performance monitoring
  - Webhook failure alerting
  - Source maps entegrasyonu
- **Maliyet:** $26/ay (Team plan)

#### 7. Database Optimization (ORTA)
- **Değişiklikler:**
  - orders tablosuna composite index (user_id + status + created_at)
  - generated_headshots tablosuna index (order_id + status)
  - Supabase connection pooling (PgBouncer) aktifleştir
  - Slow query alerting
- **Maliyet:** $0

### Faz 2 Toplam Maliyet

| Servis | Aylık |
|--------|-------|
| Vercel Pro | $20-150 |
| Supabase Pro + Replicas | $100-175 |
| Upstash Redis | $30-50 |
| Inngest Pro | $50-150 |
| Replicate AI | $10,000-33,000 |
| CDN (R2/CloudFront) | $20-50 |
| Sentry | $26 |
| Resend Email | $80-200 |
| **Toplam** | **$10,326-33,801/ay** |

### Faz 2 Gelir Projeksiyonu

| Metrik | Değer |
|--------|-------|
| Müşteri/ay | 100,000 |
| Fiyat | $9.90 |
| Aylık gelir | $990,000 |
| Altyapı maliyeti | ~$33,800 (üst sınır) |
| **Gross margin** | **~96.6%** |

---

## FAZ 3: 1.000.000 Müşteri/Ay (~33,333/gün)

### Mimari Dönüşüm Gerekli

Bu ölçekte Vercel serverless + Supabase tek başına YETERSİZ olabilir.
Hibrit mimari gerekir.

#### 1. Kubernetes / Dedicated AI Workers (KRİTİK)
- **Sorun:** 33K/gün × ~20 prediction = 666K prediction/gün
- **Çözüm:**
  - GPU worker'lar (AWS/GCP) veya Replicate Enterprise
  - Self-hosted FLUX model (RunPod/Modal/Banana)
  - Batch processing: gece saatlerinde ucuz GPU kullan
- **Neden:** Replicate prediction başına $0.01-0.05 → self-hosted'da $0.002-0.01
- **Maliyet:** $15,000-50,000/ay (self-hosted GPU cluster)

#### 2. Dedicated Database (KRİTİK)
- **Sorun:** Supabase Pro, 1M kullanıcı + milyonlarca headshot satırı
- **Çözüm:**
  - Supabase Enterprise VEYA
  - AWS RDS / PlanetScale + kendi API katmanı
  - Read replicas (3+ bölge)
  - Connection pooling (PgBouncer dedicated)
  - Partitioning: orders ve headshots tabloları tarih bazlı partition
- **Maliyet:** $500-2,000/ay

#### 3. Object Storage Tier (KRİTİK)
- **Sorun:** 1M müşteri × ~30 headshot × ~2MB = ~60TB/ay yeni veri
- **Çözüm:**
  - AWS S3 / Cloudflare R2 (egress-free)
  - Lifecycle policy: 90 gün sonra Glacier/IA
  - CloudFront CDN ile global dağıtım
  - Supabase storage'dan migrasyon
- **Maliyet:** $200-1,000/ay (R2 egress-free ile düşük)

#### 4. Message Queue + Event Bus (KRİTİK)
- **Sorun:** Inngest Pro, 33K/gün iş hacmini kaldıramayabilir
- **Çözüm:**
  - AWS SQS + EventBridge VEYA
  - Self-hosted Redis Queue (BullMQ)
  - Dead-letter queue + retry policy
  - FIFO queue (priority generation)
  - Event-driven architecture: order.created → training.started → prediction.completed → delivery.ready
- **Maliyet:** $50-200/ay

#### 5. Microservice Ayrışması (YÜKSEK)
- **Mevcut:** Monolith Next.js
- **Hedef:**
  ```
  ┌─────────────────────────────────────────────┐
  │                API Gateway                   │
  │            (Vercel / CloudFlare)             │
  └──────┬──────┬──────┬──────┬──────┬──────────┘
         │      │      │      │      │
    ┌────┴──┐ ┌─┴───┐ ┌┴────┐ ┌┴───┐ ┌┴─────┐
    │ Auth  │ │Order│ │ AI  │ │Pay │ │Email │
    │Service│ │ Svc │ │Pipe │ │ Svc│ │ Svc  │
    └───────┘ └─────┘ └─────┘ └────┘ └──────┘
  ```
  - Auth: Supabase (olduğu gibi)
  - Order Service: CRUD + status management
  - AI Pipeline: Training queue + prediction workers + delivery
  - Payment Service: Stripe checkout + webhook + refund
  - Email Service: Template rendering + sending
- **Maliyet:** $0 (mimari değişiklik)

#### 6. Global Edge Network (YÜKSEK)
- **Çözüm:**
  - CloudFlare Workers (edge compute)
  - Statik asset'ler: CloudFlare CDN
  - API: Regional routing ile en yakın data center'a
  - 5+ bölge: EU-West, US-East, US-West, Asia-Pacific, MENA
- **Maliyet:** $200-500/ay

#### 7. Observability Stack (YÜKSEK)
- **Çözüm:**
  - Datadog veya Grafana Cloud
  - APM (Application Performance Monitoring)
  - Custom metrics: generation time, success rate, queue depth
  - Alerting: PagerDuty/OpsGenie
  - Log aggregation: structured JSON → central store
- **Maliyet:** $200-500/ay

#### 8. Security & Compliance (ORTA)
- **Gereksinimler:**
  - SOC 2 Type II sertifikası
  - GDPR DPA (Data Processing Agreement)
  - Penetration testing (yıllık)
  - WAF (Web Application Firewall)
  - DDoS protection (CloudFlare dahil)
  - API key management (Vault)
- **Maliyet:** $500-2,000/ay + ilk sertifikasyon $20K-50K

#### 9. Team & DevOps (KRİTİK)
- **Gerekli ekip:**
  - 1-2 Backend engineer
  - 1 DevOps/SRE engineer
  - 1 Frontend engineer
  - 1 Customer support
- **CI/CD:**
  - Staging environment
  - Automated testing pipeline
  - Blue-green deployment
  - Database migration automation
- **Maliyet:** $25,000-50,000/ay (ekip)

### Faz 3 Toplam Maliyet

| Servis | Aylık |
|--------|-------|
| Vercel Pro / CloudFlare | $200-500 |
| Database (RDS/Supabase Enterprise) | $500-2,000 |
| AI Compute (GPU cluster/Replicate Enterprise) | $15,000-50,000 |
| Object Storage + CDN | $200-1,000 |
| Message Queue | $50-200 |
| Monitoring (Datadog) | $200-500 |
| Security & Compliance | $500-2,000 |
| Redis (Upstash/ElastiCache) | $100-300 |
| Email (Resend/SES) | $200-500 |
| Ekip (4-5 kişi) | $25,000-50,000 |
| **Toplam (ekip dahil)** | **$41,950-107,000/ay** |
| **Toplam (ekip hariç, altyapı)** | **$16,950-57,000/ay** |

### Faz 3 Gelir Projeksiyonu

| Metrik | Değer |
|--------|-------|
| Müşteri/ay | 1,000,000 |
| Fiyat | $9.90 (ortalama, team pricing ile düşebilir) |
| Aylık gelir | $7,000,000-9,900,000 |
| Altyapı maliyeti (ekip hariç) | ~$57,000 (üst sınır) |
| Altyapı maliyeti (ekip dahil) | ~$107,000 (üst sınır) |
| **Gross margin (altyapı)** | **~99.2%** |
| **Gross margin (ekip dahil)** | **~98.5%** |

---

## Özet Karşılaştırma Tablosu

| Metrik | Şimdi | Faz 1 (10K) | Faz 2 (100K) | Faz 3 (1M) |
|--------|-------|-------------|--------------|------------|
| Müşteri/ay | ~1,500-3,000 | 10,000 | 100,000 | 1,000,000 |
| Müşteri/gün | ~50-100 | ~333 | ~3,333 | ~33,333 |
| Aylık gelir | $15K-30K | $99K | $990K | $7M-9.9M |
| Altyapı maliyeti | ~$170 | ~$3,375 | ~$33,800 | ~$57,000 |
| Ekip maliyeti | $0 | $0 | $0 | $25K-50K |
| Gross margin | ~99% | ~96.6% | ~96.6% | ~98.5% |
| Rate limiter | In-memory ❌ | Redis ✅ | Redis ✅ | Redis ✅ |
| Queue | Yok ❌ | Cron retry | Inngest ✅ | SQS/BullMQ ✅ |
| Bölge | 1 (fra1) | 1 (fra1) | 3 bölge | 5+ bölge |
| AI compute | Replicate API | Replicate API | Replicate API | Self-hosted GPU |
| Monitoring | Yok ❌ | Basic logs | Sentry ✅ | Datadog ✅ |
| Database | Supabase Free | Supabase Pro | Pro + Replica | Enterprise/RDS |
| Storage | Supabase | Supabase | + CDN | S3/R2 + CDN |

---

## Kritik Karar Noktaları

### Ne zaman Faz 1'e geçmeli?
- Günlük 50+ ödeme yapan müşteri
- İlk "stuck order" şikayeti geldiğinde
- **Tahmini süre:** Hemen (şu an yapılmalı)

### Ne zaman Faz 2'ye geçmeli?
- Günlük 300+ müşteri
- Replicate faturası $5K+/ay geçtiğinde
- ABD/Asya'dan gelen trafiğin %30+ olması
- **Tahmini süre:** Aylık gelir $50K+ geçtiğinde

### Ne zaman Faz 3'e geçmeli?
- Günlük 3,000+ müşteri
- Replicate faturası $20K+/ay geçtiğinde (self-host kırılma noktası)
- B2B enterprise müşteriler SLA istediğinde
- SOC 2 sertifikası gerektiğinde
- **Tahmini süre:** Aylık gelir $500K+ geçtiğinde

---

## Maliyet Optimizasyonu İpuçları

1. **Replicate → Self-hosted GPU kırılma noktası:**
   - Replicate: ~$3-5/training
   - Self-hosted (RunPod A100): ~$1-2/training
   - Kırılma noktası: ~5,000 training/ay → self-hosted daha ucuz

2. **Supabase Storage → R2 kırılma noktası:**
   - Supabase: $0.021/GB bandwidth
   - R2: $0 egress (sadece $0.015/GB storage)
   - Kırılma noktası: ~500GB bandwidth/ay

3. **Vercel → Self-hosted kırılma noktası:**
   - Vercel Pro: $20/ay + kullanım bazlı
   - Self-hosted (Coolify/Dokku on Hetzner): $50-100/ay sabit
   - Kırılma noktası: Vercel faturası $200+/ay

4. **Batch processing:**
   - Gece saatlerinde (02:00-06:00 UTC) spot GPU instance
   - %60-70 maliyet tasarrufu
   - Non-priority siparişler batch'e alınır

5. **Team pricing volume discount:**
   - 100K+ müşteride ortalama fiyat $7-8'e düşebilir
   - B2B kontratları ile tahmin edilebilir gelir

---

## Acil Eylem Planı (Bu Hafta)

1. ☐ Upstash Redis hesabı oluştur
2. ☐ rate-limit.ts → Upstash adapter'e geçir
3. ☐ ai/generate ve ai/webhook'a maxDuration: 300 ekle
4. ☐ vercel.json'a function memory config ekle
5. ☐ Stuck order cron job'ı oluştur (15dk interval)
6. ☐ processed_events tablosu + Stripe dedupe
7. ☐ Supabase Pro plan'a geç
