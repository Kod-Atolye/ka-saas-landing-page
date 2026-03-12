# KA SaaS Landing Page

KA SaaS Landing Page; SaaS startup'ları, yapay zeka araçları, dijital platformlar ve web uygulamaları için hazırlanmış çok sayfalı, üretim odaklı bir HTML şablon paketidir.

## Kurulum

1. Projeyi statik bir web sunucusunda açın.
2. Tüm sayfalar doğrudan kök dizindeki HTML dosyaları üzerinden çalışır.
3. CDN bağımlılıkları internet bağlantısı ile otomatik yüklenir.

Örnek yerel sunucu:

```bash
npx serve .
```

## Klasör Yapısı

```text
KA-SaaS-Landing-page/
├── index.html
├── about.html
├── pricing.html
├── features.html
├── integrations.html
├── blog.html
├── blog-post.html
├── contact.html
├── login.html
├── register.html
├── 404.html
├── terms.html
├── privacy.html
├── ui-kit.html
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   └── style.css
│   ├── images/
│   ├── js/
│   └── scss/
└── README.md
```

## Kullanılan Kütüphaneler

- Bootstrap 5.3.x
- AOS 2.3.4
- Swiper.js 11
- Font Awesome 6.5.x
- Google Fonts: Inter, Space Grotesk, Poppins
- Chart.js 4

## SCSS Derleme

Kaynak SCSS dosyaları `assets/scss/` altında bulunur. Derlenmiş çıktı `assets/css/style.css` dosyasına alınır.

```bash
npx sass assets/scss/main.scss assets/css/style.css --style=expanded --no-source-map
```

## JavaScript Modülleri

- `assets/js/main.js`: tema, mobil menü, sticky header, formlar, chart ve swiper başlatma
- `assets/js/aos-init.js`: AOS yapılandırması
- `assets/js/counter.js`: görünürlük bazlı sayaç animasyonu
- `assets/js/pricing-toggle.js`: aylık/yıllık fiyat geçişi
- `assets/js/faq.js`: accordion durum yönetimi ve hash ile açılış
- `assets/js/modal.js`: YouTube video modal yönetimi

## Bootstrap Tree Shaking Notu

Bu teslimde CDN üzerinden tam Bootstrap paketi kullanılır. Daha küçük üretim paketi isterseniz:

1. Bootstrap SCSS ve JS kaynaklarını yerel olarak kurun.
2. Yalnızca kullanılan JS bileşenlerini içeren özel bundle üretin.
3. Kullanılmayan yardımcı sınıfları safelist stratejisi ile ayıklayın.
4. CDN yerine self-host edilmiş minimal paket kullanın.

## Performans ve Erişilebilirlik

- Tema tercihi `localStorage` içinde saklanır.
- `prefers-reduced-motion` desteği vardır.
- Tüm ana formlar klavye ile kullanılabilir.
- Skip link, aria nitelikleri ve odak görünürlüğü dahil edilmiştir.

## Lisans

Bu şablon demo ve geliştirme amaçlı hazırlanmıştır. Üretimde kullanmadan önce kullandığınız üçüncü parti kütüphanelerin lisans koşullarını ayrıca doğrulayın.
