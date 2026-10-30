# Create a Hero — Audit ve kurulum raporu (2026-10-30)

## 1. Funnel gerçek durumu (production, salt-okunur ölçüm)

Kaynak: `.github/workflows/funnel-audit.yml` çalıştırması, commit 94c0d33 yorumundaki rapor.

| Kontrol | Sonuç | Anlamı |
|---|---|---|
| Ana sayfa, /pricing, /auth/login, /auth/register | 200 | Vitrin ayakta |
| Supabase (SUPABASE_DB_URL ile psql) | **HATA: `tenant/user postgres.kshvtwqwofigkwuzfxcz not found`** | Veritabanı projesi duraklatılmış ya da silinmiş. Kayıt, giriş, sipariş: hiçbiri çalışmaz. **En büyük engel.** |
| POST /api/ai/webhook (Replicate) | 500 "Webhook secret not configured" | `REPLICATE_WEBHOOK_SECRET` production'da yok: eğitim bitse bile sonuç işlenmez |
| POST /api/webhooks/paddle | 400 "Invalid signature" | Paddle webhook rotası canlı; secret'ın doğru olup olmadığı imzalı bir test olayı olmadan ölçülemez |
| Paddle client token (genel sayfaların JS'i) | bulunamadı | Paddle.js yalnızca giriş yapılmış panelde yükleniyor; kesin sonuç için `/api/health/readiness` gerekli |

`/api/health/readiness` (bu PR) hangi anahtarların tanımlı olduğunu yalnızca evet/hayır olarak gösterir; merge sonrası funnel-audit tekrar çalıştırılınca tablo kesinleşir.

## 2. Kod denetimi: anahtarlar eklense bile kırık olanlar

Bu PR'da düzeltilenler:
1. Replicate eğitimi `destination` olmadan çağrılıyordu: her eğitim reddedilirdi. Artık `REPLICATE_TRAINING_DESTINATION` kullanılıyor.
2. Eğitim ZIP'i görsel-only bucket'a yüklenemiyordu: bucket'a zip izni eklendi.
3. Yüklenen fotoğrafların imzalı URL'leri kullanıcı oturumuyla alınıyordu (storage RLS yok): servis rolüne alındı.
4. Üretim başlarken hata olursa sipariş `processing`'te takılıyordu: her hata yolu siparişi geri bırakıyor.
5. Toplu fotoğraf yükleme Vercel'in 4.5 MB gövde sınırına takılıyordu: tarayıcıda küçültülüp tek tek gönderiliyor.
6. **Güvenlik:** Paddle webhook'u ödenen fiyatı siparişin kendi paketiyle karşılaştırmıyordu ($6.99 ödeyip 160 fotoğraflık siparişi açmak mümkündü). Düzeltildi.
7. **Güvenlik:** `generated_headshots` UPDATE policy'si herkese açıktı: migration 010 ile service_role'e kısıtlandı.
8. Enum'da olmayan `partial_refund` / `expired` durumları: migration 010.
9. Galeri yalnızca 20 fotoğraf gösteriyordu: 200'e çıkarıldı.
10. Çapraz satış butonu yanlış kategoriyle checkout açıyordu: düzeltildi.
11. Fiyat ID'si eksikse yetim "pending" sipariş oluşuyordu: fiyat artık sipariş öncesi kontrol ediliyor.

Hâlâ açık (sonraki iş):
- "Download all" ZIP'i Vercel 4.5 MB yanıt sınırını aşar (40-160 PNG).
- Ödeme sonrası sipariş sayfası webhook'u beklemiyor (manuel yenileme gerekiyor).
- retry-stuck cron'u imzasız webhook çağırıyor, her zaman 401 alır.
- `headshots` bucket'ı public; üretilen portreler URL ile erişilebilir.

## 3. Murat'ın açması / yapması gerekenler (sırayla)

1. **Supabase projesini geri yükle** (Dashboard → proje → Restore). Silinmişse yeni proje + `SUPABASE_DB_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` güncellenmeli. Ücretsiz plan yine duraklayabilir; kalıcı çözüm Pro ($25/ay, maliyet kararı Murat'ın).
2. **Migration'ları çalıştır:** `db-migrate.yml` → `mode=list`, sonra `mode=apply` (009 hero tabloları + 010 düzeltmeler).
3. **Replicate:** hesap + faturalandırma, `REPLICATE_API_TOKEN`, Webhooks ayarlarından `REPLICATE_WEBHOOK_SECRET`, ve eğitim hedefi için özel bir model oluştur (ör. `kullanici/tailorpic-loras`) → `REPLICATE_TRAINING_DESTINATION`.
4. **Paddle:** satıcı hesabı onayı, `PADDLE_API_KEY`, `PADDLE_WEBHOOK_SECRET` (webhook URL: `https://www.tailorpic.com/api/webhooks/paddle`), `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, `NEXT_PUBLIC_PADDLE_ENV=production`, her paket için `PADDLE_PRICE_*` ve hero için `PADDLE_PRICE_HERO_DIGITAL` (**$19, Murat onayı sonrası**).
5. **Anthropic API (hikâye yazımı):** console.anthropic.com hesabı + `ANTHROPIC_API_KEY`. İsteğe bağlı `HERO_STORY_MODEL` (varsayılan `claude-opus-5-5`).
6. **Resend:** `RESEND_API_KEY`, `EMAIL_FROM` (alan adı doğrulaması).
7. **Upstash Redis:** `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (hız sınırları; yoksa sunucu başına bellek içi yedek çalışır).
8. **CRON_SECRET:** Vercel cron'ları (fotoğraf silme dahil) bunsuz 401 alır.
9. **Lulu (basılı kitap, Hafta 2):** developers.lulu.com + sandbox hesabı, API anahtarları, lulu.com/pricing'de 8.5x8.5 Casewrap 24 sayfa fiyatı (ABD + Almanya gönderim).

Tüm anahtarlar Vercel → Project → Settings → Environment Variables'a girilir; koda veya sohbete yazılmaz.

## 4. Murat onayı gereken kararlar (yayın öncesi)

- Dijital kitap fiyatı **$19** (kodda `HERO_DIGITAL_PRICE_CENTS`, Paddle fiyatı aynı olmalı).
- Hero kitapları için iade politikası: kişiye özel dijital ürün; mevcut iade metni bu ürünü kapsamıyor.
- Toplu hediyede para katkısı (chip-in): bilerek yapılmadı. Katkıların ne zaman kitabı açacağı ve fazla tutarın iadesi bir ödeme politikası kararı.
- Basılı kitap fiyatı ($49-59 hedefi): Lulu maliyeti öğrenilmeden belirlenemez.

## 5. Baskı ortağı araştırması (resmi kaynaklar)

| | Lulu | Gelato | Prodigi |
|---|---|---|---|
| Sert kapak min. sayfa | 24 | 30 | 24 |
| Kare boy | 8.5x8.5 in | 8x8 (sert kapak belirsiz) | 21x21 cm |
| Sandbox | Var, ücretsiz | Ayrı sandbox yok | Var |
| AB baskı | Fransa | Almanya + 16 AB ülkesi (fotokitap için belirsiz) | AB (ülke belirtilmemiş) |
| Birim fiyat | Yayınlanmamış (hesap/hesaplayıcı) | Yayınlanmamış | Yayınlanmamış |

Öneri: **önce Lulu**, ikinci seçenek Prodigi. Gelato 30 sayfa minimumu nedeniyle sonra.
Kaynaklar: api.lulu.com/docs, help.api.lulu.com (64000254625, 64000254640), support.gelato.com/en/articles/8996282, prodigi.com/products/books-and-magazines/hardcover-photo-book.
