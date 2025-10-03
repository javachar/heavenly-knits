'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Languages, ShoppingBag } from 'lucide-react';

/* =========================
   SETTINGS / TEXTOS
========================= */
const SETTINGS = {
  brand: 'Heavenly Knits',
  phone: '+1 (520) 527-8311',
  email: 'hello.heavenlyknits@gmail.com',
  instagram: 'https://www.instagram.com/heavenlyknits.co',
  siteUrl: 'https://heavenlyknits.com',
  shopAllUrl: '#catalog',         // cambia a tu colección
  materialsUrl: '#catalog',       // cambia si tendrás página propia
  coursesUrl: '#blog',            // cambia si tendrás página propia
};

const COLORS = {
  pinkBrand: '#F6A3C0',
  coral: '#FF8F70',
  mango: '#FFB341',
  bubblegum: '#FFA2B8',
  raspberry: '#B12E5E',
  ivory: '#FFF7F2',
  graphite900: '#1E1E1E',
  graphite600: '#565656',
  graphite100: '#EDEDED',
};

const i18n = {
  en: {
    nav: { shop: 'Shop', materials: 'Materials', courses: 'Courses', about: 'About' },
    cta: 'VIEW ALL',
    sections: {
      kits: 'Kits',
      materials: 'Materials',
      courses: 'Courses',
    },
    insta: 'Instagram',
  },
  es: {
    nav: { shop: 'Tienda', materials: 'Materiales', courses: 'Cursos', about: 'Acerca' },
    cta: 'VER TODOS',
    sections: {
      kits: 'Kits',
      materials: 'Materiales',
      courses: 'Cursos',
    },
    insta: 'Instagram',
  },
};

/* =========================
   HELPERS
========================= */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const SafeImage = ({ src, alt, className, fallback }) => (
  <img
    src={src}
    onError={(e) => {
      if (fallback) e.currentTarget.src = fallback;
    }}
    alt={alt}
    className={className}
    loading="lazy"
  />
);

/* Sello “flor/estallido” estilo StayCrafty (simple) */
const BurstButton = ({ href, label }) => (
  <a
    href={href}
    className="relative inline-grid place-items-center text-white font-semibold font-ui"
    style={{
      width: 108,
      height: 108,
      backgroundColor: '#0A7A2A', // verde badge
      clipPath:
        'path("M54 0C59.5 7 67 9 74 13C81 17 84 26 91 31C98 36 108 37 112 44C116 51 114 60 116 68C118 76 124 83 122 91C120 99 112 104 106 110C100 116 97 125 89 128C81 131 72 128 64 130C56 132 48 138 40 136C32 134 27 126 20 121C13 116 3 114 1 106C-1 98 4 90 6 82C8 74 6 65 10 58C14 51 22 48 28 42C34 36 38 27 46 23C54 19 62 21 70 19C78 17 88 11 94 14C100 17 102 26 108 31C114 36 124 38 126 46C128 54 123 63 121 71C119 79 121 88 117 95C113 102 105 105 99 111C93 117 89 126 81 129C73 132 64 129 56 131C48 133 40 139 32 137C24 135 19 127 12 122C5 117 -5 115 -7 107C-9 99 -4 91 -2 83C0 75 -2 66 2 59C6 52 14 49 20 43C26 37 30 28 38 24C46 20 54 22 62 20C70 18 80 12 86 15C92 18 94 27 100 32C106 37 116 39 118 47C120 55 115 64 113 72C111 80 113 89 109 96C105 103 97 106 91 112C85 118 81 127 73 130C65 133 56 130 48 132C40 134 32 140 24 138C16 136 11 128 4 123C-3 118 -13 116 -15 108C-17 100 -12 92 -10 84C-8 76 -10 67 -6 60C-2 53 6 50 12 44C18 38 22 29 30 25C38 21 46 23 54 21C62 19 72 13 78 16C84 19 86 28 92 33C98 38 108 40 110 48C112 56 107 65 105 73C103 81 105 90 101 97C97 104 89 107 83 113C77 119 73 128 65 131C57 134 48 131 40 133C32 135 24 141 16 139C8 137 3 129 -4 124C-11 119 -21 117 -23 109C-25 101 -20 93 -18 85C-16 77 -18 68 -14 61C-10 54 -2 51 4 45C10 39 14 30 22 26C30 22 38 24 46 22C54 20 64 14 70 17C76 20 78 29 84 34C90 39 100 41 102 49C104 57 99 66 97 74C95 82 97 91 93 98C89 105 81 108 75 114C69 120 65 129 57 132C49 135 40 132 32 134C24 136 16 142 8 140C0 138 -5 130 -12 125 -19 120 -29 118 -31 110 -33 102 -28 94 -26 86 -24 78 -26 69 -22 62 -18 55 -10 52 -4 46 2 40 6 31 14 27 22 23 30 25 38 23 46 21 54 13 54 0Z")',
    }}
  >
    <span className="text-[11px] leading-tight text-center px-3">{label}</span>
  </a>
);

/* Sección tipo “lámina” a pantalla completa */
const Billboard = ({
  id,
  image,
  title,
  ctaHref,
  ctaLabel,
  align = 'right', // 'left' | 'right'
}) => (
  <section id={id} className="relative min-h-screen w-full overflow-hidden">
    <SafeImage
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
      fallback="https://images.unsplash.com/photo-1520975922284-7b683fe621b9?q=80&w=1600&auto=format&fit=crop"
    />
    {/* Borde superior e inferior con “papel” tenue */}
    <div className="absolute top-0 left-0 right-0 h-2 bg-[--ivory]/70" />
    <div className="absolute bottom-0 left-0 right-0 h-2 bg-[--ivory]/70" />

    <div
      className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-10 h-screen flex items-center ${
        align === 'right' ? 'justify-end' : 'justify-start'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-[--graphite-900] ${
          align === 'right' ? 'text-right items-end' : 'text-left items-start'
        } flex flex-col gap-5`}
      >
        <h2 className="font-display huge drop-shadow-[0_1px_0_rgba(255,255,255,.6)]">
          {title}
        </h2>
        <BurstButton href={ctaHref} label={ctaLabel} />
      </motion.div>
    </div>
  </section>
);

/* =========================
   PAGE
========================= */
export default function Page() {
  const [lang, setLang] = useState<'en' | 'es'>('es');
  const t = i18n[lang];

  // header sólido al hacer scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${SETTINGS.brand} — Enquiry`);
    return `mailto:${SETTINGS.email}?subject=${subject}`;
  }, []);

  return (
    <div className="min-h-screen bg-[--ivory] text-[--graphite-900] font-ui">
      <style>{`
        :root{
          --pink:${COLORS.pinkBrand};
          --coral:${COLORS.coral};
          --mango:${COLORS.mango};
          --bubblegum:${COLORS.bubblegum};
          --raspberry:${COLORS.raspberry};
          --ivory:${COLORS.ivory};
          --graphite-900:${COLORS.graphite900};
          --graphite-600:${COLORS.graphite600};
          --graphite-100:${COLORS.graphite100};
          --font-display:'Recoleta Alt Semibold','Times New Roman',serif;
          --font-ui:'Poppins',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji',sans-serif;
        }
      `}</style>

      {/* HEADER estilo StayCrafty (logo centrado) */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-white/95 shadow-sm' : 'bg-white/70 backdrop-blur'
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between relative">
          {/* Nav izquierda */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] uppercase tracking-wide">
            <button onClick={() => scrollToId('kits')} className="hover:opacity-80">
              {t.nav.shop}
            </button>
            <button onClick={() => scrollToId('materials')} className="hover:opacity-80">
              {t.nav.materials}
            </button>
            <button onClick={() => scrollToId('courses')} className="hover:opacity-80">
              {t.nav.courses}
            </button>
          </nav>

          {/* Logo centro absoluto */}
          <a
            href="#hero"
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
            aria-label="Heavenly Knits — Home"
          >
            <img src="/images/logo.png" alt="Heavenly Knits" className="h-8 w-auto" />
          </a>

          {/* Acciones derecha */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[--graphite-100] text-sm hover:bg-[--graphite-100]"
              onClick={() => setLang((p) => (p === 'en' ? 'es' : 'en'))}
              aria-label="Toggle language"
            >
              <Languages size={16} /> {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <a
              href={SETTINGS.shopAllUrl}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[--raspberry] text-white text-sm hover:brightness-95"
            >
              <ShoppingBag size={16} /> {t.nav.shop}
            </a>
          </div>
        </div>
      </header>

      {/* HERO pantalla completa con logo al centro */}
      <section id="hero" className="relative min-h-screen w-full overflow-hidden">
        <SafeImage
          src="/images/hero.jpg"
          alt="Heavenly Knits"
          className="absolute inset-0 w-full h-full object-cover"
          fallback="https://images.unsplash.com/photo-1582735729253-f854e6851a89?q=80&w=1600&auto=format&fit=crop"
        />
        {/* Logo marca centrado */}
        <div className="relative z-10 grid place-items-center h-screen">
          <img
            src="/images/logo-white.png"
            onError={(e) => {
              // si no hay logo blanco, usamos el normal con un fondo claro
              e.currentTarget.src = '/images/logo.png';
            }}
            alt="Heavenly Knits"
            className="w-[220px] sm:w-[260px] md:w-[300px] drop-shadow-[0_2px_12px_rgba(0,0,0,.25)]"
          />
        </div>
      </section>

      {/* BILLBOARDS tipo StayCrafty */}
      <Billboard
        id="kits"
        image="/images/kits.jpg"
        title={t.sections.kits}
        ctaHref={SETTINGS.shopAllUrl}
        ctaLabel={t.cta}
        align="right"
      />

      <Billboard
        id="materials"
        image="/images/materials.jpg"
        title={t.sections.materials}
        ctaHref={SETTINGS.materialsUrl}
        ctaLabel={t.cta}
        align="left"
      />

      <Billboard
        id="courses"
        image="/images/courses.jpg"
        title={t.sections.courses}
        ctaHref={SETTINGS.coursesUrl}
        ctaLabel={t.cta}
        align="right"
      />

      {/* INSTAGRAM GRID */}
      <section id="instagram" className="py-14 bg-[--ivory]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
          <h3 className="font-display text-[38px] sm:text-[48px] md:text-[56px] leading-none mb-6">
            {t.insta}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { href: SETTINGS.instagram, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop' },
              { href: SETTINGS.instagram, img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' },
              { href: SETTINGS.instagram, img: 'https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=800&auto=format&fit=crop' },
              { href: SETTINGS.instagram, img: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=800&auto=format&fit=crop' },
              { href: SETTINGS.instagram, img: 'https://images.unsplash.com/photo-1520975922284-7b683fe621b9?q=80&w=800&auto=format&fit=crop' },
              { href: SETTINGS.instagram, img: 'https://images.unsplash.com/photo-1551298370-9d3d53740c43?q=80&w=800&auto=format&fit=crop' },
            ].map((it, i) => (
              <a
                key={i}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-[--graphite-100] bg-white"
                aria-label="Open Instagram"
              >
                <img
                  src={it.img}
                  alt="Instagram"
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER mínimo */}
      <footer className="border-t border-[--graphite-100] py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 text-sm text-[--graphite-600] flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} {SETTINGS.brand}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href={mailtoHref}>Contact</a>
            <a className="hover:underline" href={SETTINGS.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
