import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | TailorPic',
  description:
    'TailorPic KVKK Aydınlatma Metni: 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında işlenen kişisel veriler, işleme amaçları, yurt dışına aktarım, saklama süreleri ve ilgili kişi hakları.',
  alternates: { canonical: '/kvkk' },
  openGraph: {
    title: 'KVKK Aydınlatma Metni | TailorPic',
    description:
      '6698 sayılı KVKK kapsamında TailorPic tarafından işlenen kişisel veriler, amaçlar, aktarımlar, saklama süreleri ve haklarınız.',
    url: `${siteConfig.url}/kvkk`,
    type: 'website',
    siteName: 'TailorPic',
    locale: 'tr_TR',
  },
};

const CONTACT = 'support@tailorpic.com';

const dataCategories = [
  { title: 'Kimlik ve iletişim verileri', text: 'Ad-soyad, e-posta adresi.' },
  { title: 'Müşteri işlem ve ödeme verileri', text: 'Sipariş, kredi paketi ve ödeme bilgileri. Ödeme bilgileri Stripe aracılığıyla işlenir; kart bilgileriniz TailorPic tarafından saklanmaz.' },
  { title: 'Görsel veriler (özel nitelikli kişisel veri)', text: 'Hizmetten yararlanmak amacıyla yüklediğiniz yüz fotoğrafları ve bu fotoğraflardan oluşturulan yapay zekâ görselleri. Yüz fotoğraflarınız, biyometrik veri üretmeye elverişli olması nedeniyle KVKK m. 6 kapsamında özel nitelikli kişisel veri olarak değerlendirilmektedir.' },
  { title: 'İşlem güvenliği verileri', text: 'IP adresi, cihaz ve tarayıcı bilgileri, işletim sistemi, log kayıtları.' },
  { title: 'Çerez verileri', text: 'Çerezler ve benzeri teknolojiler aracılığıyla toplanan kullanım ve tercih verileri. Ayrıntılar için Çerez Politikası’na bakınız.' },
];

const purposes = [
  'Hizmetin sunulması: hesap oluşturulması, fotoğrafların yüklenmesi ve talep ettiğiniz görsellerin üretilmesi',
  'Ödeme işlemlerinin gerçekleştirilmesi, faturalandırma ve iade süreçlerinin yürütülmesi',
  'Yapay zekâ ile fotoğraf oluşturma süreçlerinin (geçici model eğitimi ve görsel üretimi) yürütülmesi',
  'Bilgi güvenliği süreçlerinin yönetimi, dolandırıcılık ve kötüye kullanımın önlenmesi',
  'Hukuki ve vergisel yükümlülüklerin yerine getirilmesi, yetkili kurum taleplerine yanıt verilmesi',
  'Destek taleplerinin yanıtlanması ve işlemsel e-posta bildirimlerinin gönderilmesi',
];

const legalBases = [
  'Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (KVKK m. 5/2-c)',
  'Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması (KVKK m. 5/2-ç)',
  'İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaatleri için zorunlu olması (KVKK m. 5/2-f)',
  'Yüz fotoğrafları bakımından ilgili kişinin açık rızası (KVKK m. 6/2 ve m. 5/1)',
];

const transfers = [
  { name: 'Vercel Inc.', country: 'ABD', role: 'Barındırma ve içerik dağıtımı' },
  { name: 'Supabase Inc.', country: 'ABD', role: 'Kimlik doğrulama, veritabanı ve dosya depolama' },
  { name: 'Stripe, Inc.', country: 'ABD', role: 'Ödeme işleme' },
  { name: 'Replicate, Inc.', country: 'ABD', role: 'Yapay zekâ model eğitimi ve görsel üretimi' },
];

const retention = [
  { item: 'Hesap verileri', period: 'Hesabınız silininceye kadar saklanır; silme talebinin ardından makul süre içinde silinir, yok edilir veya anonim hâle getirilir.' },
  { item: 'Yüklenen fotoğraflar ve geçici modeller', period: 'Sipariş tamamlandıktan sonra 30 gün içinde otomatik olarak silinir.' },
  { item: 'Ödeme ve fatura kayıtları', period: 'İlgili mevzuatta öngörülen yasal saklama süreleri boyunca saklanır.' },
  { item: 'Log ve güvenlik kayıtları', period: 'Güvenlik amacıyla ve ilgili mevzuatın gerektirdiği süre kadar saklanır.' },
];

const rights = [
  'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
  'Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme',
  'Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
  'Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme',
  'Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme',
  'KVKK m. 7 kapsamında kişisel verilerin silinmesini veya yok edilmesini isteme',
  'Düzeltme, silme ve yok edilme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme',
  'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
  'Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
];

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-tp-line pt-8">
      <h2 className="text-xl font-bold text-tp-ink sm:text-2xl">
        <span className="mr-2 text-tp-bronze-ink">{n}.</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-tp-muted">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tp-bronze" aria-hidden="true" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function KvkkPage() {
  return (
    <>
      <Header />
      <main className="bg-tp-paper">
        <section className="bg-tp-black">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">Hukuki Bilgilendirme</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              KVKK Aydınlatma Metni
            </h1>
            <p className="mt-4 text-base text-tp-beige">
              6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi kapsamında hazırlanmıştır.
            </p>
            <p className="mt-2 text-sm text-tp-beige/70">Son güncelleme: 1 Ekim 2026</p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:py-16">
          <p className="text-base leading-relaxed text-tp-muted">
            İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) m. 10 ve Aydınlatma
            Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, yapay zekâ
            destekli fotoğraf oluşturma hizmeti sunan TailorPic tarafından, kişisel verilerinizin hangi amaçlarla
            işlendiği, kimlere ve hangi amaçla aktarıldığı, toplanma yöntemi, hukuki sebebi ve haklarınız
            konusunda sizi bilgilendirmek amacıyla hazırlanmıştır.
          </p>

          <Section n={1} title="Veri Sorumlusu">
            <p>
              KVKK uyarınca veri sorumlusu TailorPic’tir. Veri sorumlusuna aşağıdaki iletişim bilgileri
              aracılığıyla ulaşabilirsiniz:
            </p>
            <div className="rounded-tp-card border border-tp-line bg-white p-5">
              <p className="font-semibold text-tp-ink">TailorPic</p>
              <p className="mt-1">
                E-posta:{' '}
                <a href={`mailto:${CONTACT}`} className="font-medium text-tp-bronze-ink underline underline-offset-2">
                  {CONTACT}
                </a>
              </p>
            </div>
          </Section>

          <Section n={2} title="İşlenen Kişisel Veriler">
            <p>Hizmetin sunulması kapsamında aşağıdaki kategorilerde kişisel verileriniz işlenmektedir:</p>
            <dl className="space-y-3">
              {dataCategories.map((c) => (
                <div key={c.title} className="rounded-tp-card border border-tp-line bg-white p-5">
                  <dt className="font-semibold text-tp-ink">{c.title}</dt>
                  <dd className="mt-1">{c.text}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section n={3} title="Kişisel Verilerin İşlenme Amaçları">
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <Bullets items={purposes} />
          </Section>

          <Section n={4} title="Kişisel Veri Toplama Yöntemi ve Hukuki Sebepler">
            <p>
              Kişisel verileriniz; web sitemiz, hesap oluşturma ve fotoğraf yükleme formları, ödeme altyapısı,
              çerezler ve benzeri teknolojiler aracılığıyla otomatik veya kısmen otomatik yollarla elektronik
              ortamda toplanmaktadır. Verileriniz aşağıdaki hukuki sebeplere dayanılarak işlenir:
            </p>
            <Bullets items={legalBases} />
            <p>
              Özel nitelikli kişisel veri niteliğindeki yüz fotoğraflarınız yalnızca açık rızanıza dayanılarak
              ve talep ettiğiniz görsellerin üretilmesi amacıyla sınırlı olarak işlenir. Açık rızanızı dilediğiniz
              zaman geri alabilirsiniz; ancak bu durumda hizmet sunulamayabilir.
            </p>
          </Section>

          <Section n={5} title="Kişisel Verilerin Aktarılması ve Yurt Dışına Aktarım">
            <p>
              Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi için hizmet sağlayıcılarımıza
              ve yasal olarak yetkili kamu kurum ve kuruluşlarına aktarılabilir. Hizmet altyapımızın bir
              parçası olarak kişisel verileriniz, aşağıdaki hizmet sağlayıcılara Amerika Birleşik Devletleri’ne
              aktarılmaktadır:
            </p>
            <div className="overflow-x-auto rounded-tp-card border border-tp-line bg-white">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-tp-ink text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Alıcı</th>
                    <th className="px-4 py-3 font-semibold">Ülke</th>
                    <th className="px-4 py-3 font-semibold">Aktarım Amacı</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((t) => (
                    <tr key={t.name} className="border-t border-tp-line">
                      <td className="px-4 py-3 font-medium text-tp-ink">{t.name}</td>
                      <td className="px-4 py-3">{t.country}</td>
                      <td className="px-4 py-3">{t.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Yurt dışına aktarımlar, KVKK m. 9 ve ilgili mevzuat çerçevesinde, Standart Sözleşme Maddeleri
              (SCC) kapsamında gerçekleştirilmektedir. Standart sözleşmenin imzalanmasının ardından mevzuatta
              öngörülen süre içinde Kişisel Verileri Koruma Kurumu’na bildirim yapılır. Yüz fotoğraflarınızın
              yurt dışındaki hizmet sağlayıcılara aktarımı için ayrıca açık rızanız alınır.
            </p>
          </Section>

          <Section n={6} title="Kişisel Verilerin Saklama Süreleri">
            <p>
              Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen süreler boyunca
              saklanır; sürenin dolması hâlinde silinir, yok edilir veya anonim hâle getirilir.
            </p>
            <dl className="divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
              {retention.map((r) => (
                <div key={r.item} className="grid gap-1 p-4 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-tp-ink">{r.item}</dt>
                  <dd className="sm:col-span-2">{r.period}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section n={7} title="İlgili Kişi Olarak Haklarınız (KVKK Madde 11)">
            <p>KVKK m. 11 uyarınca veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz:</p>
            <ol className="space-y-2">
              {rights.map((r, i) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tp-ink text-xs font-semibold text-tp-bronze">
                    {String.fromCharCode(97 + i)}
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section n={8} title="Başvuru Yöntemi">
            <p>
              Yukarıda belirtilen haklarınıza ilişkin taleplerinizi, kimliğinizi tespit edici bilgiler ve talep
              konusunu açıkça belirten bir dilekçe ile{' '}
              <a href={`mailto:${CONTACT}`} className="font-medium text-tp-bronze-ink underline underline-offset-2">
                {CONTACT}
              </a>{' '}
              adresine e-posta yoluyla iletebilirsiniz. Başvurunuz, talebin niteliğine göre en kısa sürede ve
              en geç otuz (30) gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet
              gerektirmesi hâlinde Kişisel Verileri Koruma Kurulu’nca belirlenen tarifedeki ücret alınabilir.
            </p>
            <p>
              Başvurunuza verilen cevabı yetersiz bulmanız veya süresinde cevap verilmemesi hâlinde,
              KVKK m. 14 uyarınca Kişisel Verileri Koruma Kurulu’na şikâyette bulunma hakkınız saklıdır.
            </p>
          </Section>

          <Section n={9} title="Değişiklikler">
            <p>
              İşbu Aydınlatma Metni, mevzuattaki veya hizmetimizdeki değişikliklere bağlı olarak güncellenebilir.
              Güncel metin her zaman bu sayfada yayımlanır.
            </p>
          </Section>
        </article>
      </main>
      <Footer />
    </>
  );
}
