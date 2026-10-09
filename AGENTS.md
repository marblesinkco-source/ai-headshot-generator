# AGENTS.md — TailorPic Storefront V3

TailorPic® canlı mağazasını V3 Master dokümanına göre görsel olarak olağanüstü, mimari olarak hızlı, mobil ve masaüstünde tutarlı, üretime hazır bir storefront haline getirmek.

## Başlatma İş Akışı

Kod yazmadan önce:

1. `pwd` ile çalışma dizinini doğrula
2. `claude-progress.md` oku
3. `feature_list.json` oku, en yüksek öncelikli bitmemiş özelliği seç
4. `git log --oneline -5` son commit'leri incele
5. `./init.sh` çalıştır
6. Temel doğrulama bozuksa ÖNCE ONU DÜZELT

## Çalışma Kuralları

- Aynı anda yalnızca bir özellik
- Kanıtsız tamamlama yok — deploy gate (CLAUDE.md §2) zorunlu
- Depo dosyaları = kayıt sistemi (claude-progress.md, feature_list.json)
- Kapsam dışına taşma
- Doğrulama kurallarını değiştirme
- Çalışan backend yeniden yazılmayacak
- Auth, Paddle, Supabase, middleware silinmeyecek
- Legacy Stripe dosyaları (tarihsel veri için) korunacak

## Bitti Tanımı

- [ ] Hedef davranış uygulandı
- [ ] `git push` + `scripts/deploy-status.sh --wait` → PASS
- [ ] Canlı sitede browser ile doğrulandı
- [ ] Kanıt feature_list.json ve claude-progress.md'ye kaydedildi

## Oturum Sonu

1. claude-progress.md güncelle
2. feature_list.json güncelle
3. Riskleri/engelleri kaydet
4. Açıklayıcı mesajla commit et
5. Temiz durum bırak

## Doğrulama Komutları

- `./init.sh` — ortam kontrolü
- `scripts/deploy-status.sh --wait` — CI + Vercel deploy
- Browser tool ile canlı site kontrolü

## Referans Dokümanlar

- `CLAUDE.md` — proje kuralları, deploy gate, brand conventions
- `TAILORPIC_CLAUDE_IMPLEMENTATION_MASTER_V3.md` — V3 uygulama talimatı
- 7 referans görseli (01–07)
