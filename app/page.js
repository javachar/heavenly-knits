'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Languages, ArrowRight } from "lucide-react";

/* ====== Ajusta aquí los datos ====== */
const SETTINGS = {
  brand: "Heavenly Knits",
  instagram: "https://www.instagram.com/heavenlyknits.co/",
  email: "hello.heavenlyknits@gmail.com",
};

const COLORS = {
  raspberry: "#B12E5E",
  coral: "#FF8F70",
  ivory: "#FFF7F2",
};

const i18n = {
  en: {
    nav: { shop:"Shop", materials:"Materials", courses:"Courses", about:"About", contact:"Contact" },
    cta: "See all",
    instagram: "Instagram",
  },
  es: {
    nav: { shop:"Tienda", materials:"Materiales", courses:"Cursos", about:"Acerca", contact:"Contacto" },
    cta: "Ver todos",
    instagram: "Instagram",
  }
};

/* Un banner a pantalla completa */
function Banner({ id, title, image, align="right", cta, href="#" }) {
  return (
    <section id={id} className="relative min-h-[92vh] md:min-h-screen">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />
      {/* velo suave para legibilidad */}
      <div className="absolute inset-0 bg-white/0" />
      <div className={`absolute inset-0 max-w-6xl mx-auto px-4 flex items-center ${align === "right" ? "justify-end" : "justify-start"}`}>
        <div className="text-[--graphite-900]">
          <h2 className="font-display text-[64px] leading-none md:text-[92px]" style={{color: COLORS.coral}}>
            {title}
          </h2>
          <a href={href} className="badge-round mt-6 inline-flex gap-2">
            {cta} <ArrowRight size={16}/>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Page(){
  const [lang, setLang] = useState("en");
  const t = i18n[lang];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[--ivory] text-[--graphite-900]">
      {/* HEADER estilo StayCrafty */}
      <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-white/95 shadow-sm" : "bg-white/70 backdrop-blur border-b border-[--graphite-100]"}`}>
        <div className="max-w-6xl mx-auto h-14 px-4 flex items-center justify-between">
          <nav className="hidden md:flex gap-6 text-xs uppercase tracking-wide text-[--graphite-600]">
            <a href="#shop" className="hover:text-[--graphite-900]">{t.nav.shop}</a>
            <a href="#materials" className="hover:text-[--graphite-900]">{t.nav.materials}</a>
            <a href="#courses" className="hover:text-[--graphite-900]">{t.nav.courses}</a>
          </nav>

          {/* Logo centrado */}
          <a href="#home" className="shrink-0">
            <Image src="/images/logo.png" alt="Heavenly Knits" width={140} height={28} priority />
          </a>

          <div className="flex items-center gap-3">
            <a href="#about" className="hidden md:inline text-xs uppercase tracking-wide text-[--graphite-600] hover:text-[--graphite-900]">{t.nav.about}</a>
            <a href={`mailto:${SETTINGS.email}`} className="hidden md:inline text-xs uppercase tracking-wide text-[--graphite-600] hover:text-[--graphite-900]">{t.nav.contact}</a>
            <button
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[--graphite-100] text-xs"
              onClick={() => setLang(prev => prev === "en" ? "es" : "en")}
              aria-label="toggle language"
            >
              <Languages size={14}/> {lang === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      </header>

      {/* HERO full screen con textura y logo al centro */}
      <section id="home" className="relative min-h-[92vh] md:min-h-screen hero-texture">
        <div className="absolute inset-0">
          {/* Si quieres, coloca una ilustración grande detrás (opcional) */}
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 min-h-[92vh] md:min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Image src="/images/logo.png" alt="Heavenly Knits" width={220} height={44} priority className="mx-auto" />
            <p className="mt-6 text-[--graphite-600]">Textiles & Knits that feel like home.</p>
          </div>
        </div>
      </section>

      {/* BANNERS a pantalla completa (Kits / Materiales / Cursos) */}
      <Banner
        id="shop"
        title="Kits"
        image="https://images.unsplash.com/photo-1520975922284-7b683fe621b9?q=80&w=2400&auto=format&fit=crop"
        align="right"
        cta={t.cta}
        href="#"
      />
      <Banner
        id="materials"
        title={lang === "en" ? "Materials" : "Materiales"}
        image="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2400&auto=format&fit=crop"
        align="left"
        cta={t.cta}
        href="#"
      />
      <Banner
        id="courses"
        title={lang === "en" ? "Courses" : "Cursos"}
        image="https://images.unsplash.com/photo-1582735729253-f854e6851a89?q=80&w=2400&auto=format&fit=crop"
        align="right"
        cta={t.cta}
        href="#"
      />

      {/* INSTAGRAM GRID */}
      <section className="py-16 hero-texture">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="font-display text-4xl md:text-5xl text-center" style={{color: COLORS.coral}}>
            {t.instagram}
          </h3>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
              "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
              "https://images.unsplash.com/photo-1519681393784-d120267933ba",
              "https://images.unsplash.com/photo-1504194104404-433180773017",
              "https://images.unsplash.com/photo-1520975922284-7b683fe621b9",
              "https://images.unsplash.com/photo-1582735729253-f854e6851a89",
            ].map((base, i) => {
              const src = `${base}?q=80&w=1200&auto=format&fit=crop`;
              return (
                <a key={i} href={SETTINGS.instagram} target="_blank" rel="noreferrer" className="block relative aspect-square rounded-2xl overflow-hidden">
                  <Image src={src} alt={`post ${i+1}`} fill className="object-cover" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER simple */}
      <footer className="border-t border-[--graphite-100] py-10">
        <div className="max-w-6xl mx-auto px-4 text-sm text-[--graphite-600] flex items-center justify-between">
          <div>© {new Date().getFullYear()} {SETTINGS.brand}. All rights reserved.</div>
          <a href={SETTINGS.instagram} target="_blank" rel="noreferrer" className="underline">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
