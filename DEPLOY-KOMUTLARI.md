# 🚀 AI Headshot Generator — Hızlı Deploy Komutları

## 1. Projeyi aç ve GitHub'a push et

Windows PowerShell'de (veya Terminal'de):

```powershell
# Daha önce indirdiğin tar.gz dosyasını çıkart (zaten çıkarttıysan atla)
cd Desktop
tar xzf ai-headshot-generator.tar.gz
cd ai-headshot

# Git başlat ve GitHub'a push et
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/marblesinkco-source/ai-headshot-generator.git
git push -u origin main
```

## 2. Vercel'e deploy et

1. **https://vercel.com/login** adresine git
2. Email ile giriş yap (GitHub ile değil — hesabın zaten email ile kayıtlı)
3. **"Add New Project"** tıkla
4. **"Import Git Repository"** → GitHub repoyu seç: `ai-headshot-generator`
5. Framework: **Next.js** (otomatik algılanır)
6. **"Environment Variables"** bölümüne aşağıdaki değişkenleri ekle (aşağıda listeledim)
7. **"Deploy"** tıkla

## 3. Environment Variables (Vercel'e eklenecek)

Vercel deploy sırasında veya Settings → Environment Variables'dan ekle:

```
NEXT_PUBLIC_SUPABASE_URL = (Supabase Dashboard'dan al)
NEXT_PUBLIC_SUPABASE_ANON_KEY = (Supabase Dashboard → Settings → API → anon key)
SUPABASE_SERVICE_ROLE_KEY = (Supabase Dashboard → Settings → API → service_role key)
STRIPE_SECRET_KEY = (Stripe Dashboard → API keys → Secret key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = (Stripe Dashboard → API keys → Publishable key)
STRIPE_WEBHOOK_SECRET = (Stripe webhook kurduktan sonra eklenecek)
REPLICATE_API_TOKEN = (Replicate Dashboard → API tokens)
RESEND_API_KEY = (Resend Dashboard → API Keys)
EMAIL_FROM = noreply@aiheadshotpro.com
NEXT_PUBLIC_APP_URL = https://SITEN.vercel.app
```

⚠️ `NEXT_PUBLIC_APP_URL` değerini deploy sonrası Vercel'in verdiği URL ile değiştir!
⚠️ `STRIPE_WEBHOOK_SECRET` değerini aşağıdaki adımda alacaksın.

## 4. Deploy sonrası yapılacaklar

### A) Storage bucket'larını oluştur
Tarayıcıda şu URL'ye bir kez git:
```
https://SITEN.vercel.app/api/setup/storage
```

### B) Stripe Webhook kur
1. https://dashboard.stripe.com/webhooks adresine git
2. "Add endpoint" tıkla
3. URL: `https://SITEN.vercel.app/api/webhooks/stripe`
4. Events: `checkout.session.completed`, `payment_intent.payment_failed`
5. Signing secret'ı kopyala → Vercel'de `STRIPE_WEBHOOK_SECRET` olarak ekle

### C) Supabase Auth URL'lerini güncelle
1. Supabase Dashboard → Authentication → URL Configuration
2. Site URL: `https://SITEN.vercel.app`
3. Redirect URLs: `https://SITEN.vercel.app/auth/callback`

---

✅ Bu adımları tamamladıktan sonra siteniz hazır!
