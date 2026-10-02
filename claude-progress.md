# TailorPic — Progress Tracker

## Current Session: 2026-10-03 (V3 Master Uygulaması)

### Baseline
- HEAD: `54dce7c` (14 revert commit ile VISUAL MATCH MASTER iptal edildi)
- CI: PASS, Vercel: PASS

### Phase A — Audit Sonuçları

#### KRİTİK HATALAR (hemen düzeltilecek)
1. `/api/upload` orderId'yi UUID olarak validate ediyor ama order ID'ler nanoid → upload her zaman 400 döner
2. Stripe webhook event'i işlemeden önce "processed" olarak kaydediyor → başarısız işlem + retry = ödeme alınıp sipariş pending kalır
3. Replicate webhook REPLICATE_WEBHOOK_SECRET yoksa signature doğrulama atlanıyor

#### YÜKSEK ÖNCELİK
4. Homepage 36 bölüm içeriyor — V3'e göre yeniden yapılandırılacak
5. Trust/social proof 6 yerde tekrar ediyor
6. 4 adet "biz vs alternatifler" karşılaştırma bölümü çakışıyor
7. 3 fiyatlandırma bloğu arka arkaya

#### ORTA ÖNCELİK
8. /auth/reset-password middleware redirect listesinde → şifre sıfırlama bozulabilir
9. Credit insert başarısız olursa webhook hata vermiyor → ödeme alınır, kredi verilmez
10. Standalone refund policy yok (guarantee'ye redirect)
11. TEAM_PRICES ile linkedin-team paket fiyatları uyumsuz
12. "2 hours" teslimat süresi doğrulanmamış iddia

#### DÜŞÜK ÖNCELİK
13. Kullanılmayan bileşenler: guarantee-badge, social-proof-toast, social-proof-toast-lazy
14. package-lock.json yok
15. Çoğaltılmış icon/OG kaynakları

### Mevcut Durum
- 306 sayfa (page.tsx)
- 51 marketing bileşeni
- 12 kategori (4 Professional + 4 Personal + 4 Creative) ✓
- 6 headshot paketi ($1.99 → $89.90) ✓
- Kırık import/link: YOK ✓
- Dead route: YOK ✓

### Sonraki Adım
feat-A tamamlandı → Kritik bug fix'ler → Phase B/C/D başlayacak
