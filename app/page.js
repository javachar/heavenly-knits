'use client';

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Phone, Mail, Instagram as InstaIcon, Youtube,
  ArrowRight, Languages, Palette, ArrowUp
} from "lucide-react";
import Image from "next/image";

/* =========================
   SETTINGS
========================= */
const SETTINGS = {
  brand: "Heavenly Knits",
  taglineEN: "Handmade with love",
  taglineES: "Hecho a mano con amor",
  phone: "(520) 527-8311",
  email: "hello@heavenlyknits.com",
  instagram: "https://www.instagram.com/heavenlyknits.co",
  youtube: "https://www.youtube.com/@HeavenlyKnits",
  siteUrl: "https://heavenlyknits.com",
};

// Blur genérico muy liviano para placeholders
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPTEgaGVpZ2h0PTEgZmlsbD0nI2ZlZTVlNycvPjwvc3ZnPg==";

const i18n = {
  en: {
    nav: { home: "Home", catalog: "Catalog", about: "About", instagram: "Instagram", contact: "Contact" },
    catalog: { title: "Catalog", badge: "Made by Anguie", buy: "Buy", enquire: "Enquire", colors: "Colors", materials: "Materials", size: "Size" },
    about: {
      title: "Meet the Artist",
      p1: "Anguie Munoz (Peru, 1993) is an Interior Designer, Architect and multidisciplinary artist.",
      p2: "She has been living in Georgia for the past three years, where she continues to grow her career through design projects, art fairs, and portfolio development.",
      p3: "She is the founder of Heavenly Knits, a brand dedicated to handmade pieces crafted with love. Her work blends crochet, embroidery, painting, and 3D design, always highlighting the value of craftsmanship as a bridge to contemporary design."
    },
    contact: { title: "Contact", formTitle: "Write us", name: "Name", email: "Email", msg: "Message", send: "Send", alt: "Or reach us at:" },
    ig: { title: "Follow us on Instagram", view: "Open Instagram" },
    footer: { rights: "All rights reserved." },
    lang: "ES"
  },
  es: {
    nav: { home: "Inicio", catalog: "Catálogo", about: "Acerca", instagram: "Instagram", contact: "Contacto" },
    catalog: { title: "Catálogo", badge: "Hecho por Anguie", buy: "Comprar", enquire: "Encargar", colors: "Colores", materials: "Materiales", size: "Tamaño" },
    about: {
      title: "Conoce a la Artista",
      p1: "Anguie Muñoz (Perú, 1993) es Interior Designer, Architect y artista multidisciplinaria.",
      p2: "Vive en Georgia desde hace tres años, donde continúa consolidando su carrera a través de proyectos de diseño, ferias de arte y el desarrollo de su portafolio.",
      p3: "Es fundadora de Heavenly Knits, una marca dedicada a piezas hechas a mano con amor. Su obra combina crochet, bordado, pintura y diseño 3D, destacando siempre el valor de la artesanía como puente hacia el diseño contemporáneo."
    },
    contact: { title: "Contacto", formTitle: "Escríbenos", name: "Nombre", email: "Correo", msg: "Mensaje", send: "Enviar", alt: "O contáctanos en:" },
    ig: { title: "Síguenos en Instagram", view: "Abrir Instagram" },
    footer: { rights: "Todos los derechos reservados." },
    lang: "EN"
  }
};

/* =========================
   DATA
========================= */
const PRODUCTS = [
  {
    id: "hk-yarn-spinner-cow",
    name: {
      en: "Yarn Spinner - Cow (3D printed)",
      es: "Yarn Spinner - Vaquita (impreso 3D)"
    },
    price: "$44.99",
    img: "/products/yarn-spinner-cow.webp",
    colors: ["White / Black", "Pink accents", "Brown horns"],
    materials: "PLA + steel bearing (silent, smooth spin)",
    size: "Base anti-slip • removable screw pin",
    checkout: "#",
  },
];

/* =========================
   HELPERS
========================= */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    setMatches(m.matches);
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/* =========================
   Instagram Grid (9 últimas)
   (usa /api/instagram + /api/instagram/proxy)
========================= */

function InstagramGrid() {
  const [items, setItems] = useState(null); // null = cargando, [] = vacío
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/instagram", { cache: "no-store" });
        const json = await r.json();
        if (!alive) return;

        const list = Array.isArray(json?.data) ? json.data.slice(0, 9) : [];
        setItems(list);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "fetch-failed");
        setItems([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Skeleton
  if (items === null) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-[--graphite-100] animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Sin posts
  if (!items.length) {
    return (
      <div className="rounded-3xl bg-white border border-[--graphite-100] p-8 text-[--graphite-600]">
        No hay publicaciones disponibles por ahora.{" "}
        <a
          className="underline"
          href={SETTINGS.instagram}
          target="_blank"
          rel="noreferrer"
        >
          Abrir Instagram
        </a>
        {error && (
          <div className="mt-2 text-xs opacity-60">
            ({error})
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((p, i) => {
        const rawSrc =
          p.mediaUrl ||
          p.media_url ||
          p.thumbnail_url ||
          p.url;

        if (!rawSrc) return null;

        // usamos el proxy en vez de la URL directa de Instagram
        const src = `/api/instagram/proxy?u=${encodeURIComponent(rawSrc)}`;

        return (
          <a
            key={p.id || i}
            href={p.link || SETTINGS.instagram}
            target="_blank"
            rel="noreferrer"
            className="block aspect-square overflow-hidden rounded-xl bg-[--graphite-100] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--hk-deeprose]/30"
            aria-label={`Abrir Instagram - post ${i + 1}`}
            title="Ver en Instagram"
          >
            <img
              src={src}
              alt={`Instagram ${i + 1}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-[1.03]"
            />
          </a>
        );
      })}
    </div>
  );
}

/* =========================
   PAGE
========================= */
export default function Page() {
  const [lang, setLang] = useState("en");
  const t = i18n[lang];

  // Header sombra
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Splash
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const tmr = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(tmr);
  }, []);

  // BRAND y LOGO sincronizados
  const heroRef = useRef(null);
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  const CROSS_START = 0.72;
  const CROSS_END   = 0.86;

  const logoOpacity  = useTransform(heroProg, [0, CROSS_START, CROSS_END, 1], [1, 1, 0, 0]);
  const brandOpacity = useTransform(heroProg, [0, 0.78, CROSS_END, 1], [0, 0, 1, 1]);

  const brandY       = useTransform(heroProg, [0, 1], [6, 0]);
  const brandScaleMobile  = useTransform(heroProg, [0, 0.78, CROSS_END, 1], [0.98, 0.98, 1.02, 1.02]);
  const brandScaleDesktop = useTransform(heroProg, [0, 0.78, CROSS_END, 1], [0.98, 0.98, 1.04, 1.04]);
  const logoScale         = useTransform(heroProg, [0, CROSS_START, CROSS_END, 1], [1, 1, 0.98, 0.98]);

  const brandPhase = useTransform(heroProg, [0.78, CROSS_END], [0, 1], { clamp: true });
  const brandPhaseS = useSpring(brandPhase, { stiffness: 160, damping: 24, mass: 0.25 });

  const isMdUp = useMediaQuery('(min-width: 768px)');
  const brandScaleRaw = isMdUp ? brandScaleDesktop : brandScaleMobile;

  const springCfg = { stiffness: 140, damping: 22, mass: 0.25, restDelta: 0.001 };
  const brandOpacityS = useSpring(brandOpacity, springCfg);
  const brandScaleS   = useSpring(brandScaleRaw, { ...springCfg, damping: 24 });

  const veilOpacity = isMdUp ? 0.08 : 0.05;

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${SETTINGS.brand} - Enquiry`);
    return `mailto:${SETTINGS.email}?subject=${subject}`;
  }, []);

  // Nav ids (sin Journal)
  const navIds = ["home","catalog","about","instagram","contact"];

  // Scroll spy
  const [active, setActive] = useState("home");
  useEffect(() => {
    const idsForSpy = ["home","catalog","about","instagram","contact","footer"];
    const sections = idsForSpy.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting);
      if (!visible.length) return;
      const top = visible.reduce((a, b) =>
        a.intersectionRatio > b.intersectionRatio ? a : b
      );
      setActive(top.target.id === 'footer' ? 'contact' : top.target.id);
    }, {
      root: null,
      rootMargin: "-45% 0px -50% 0px",
      threshold: thresholds,
    });

    sections.forEach(el => obs.observe(el));
    return () => { sections.forEach(el => obs.unobserve(el)); obs.disconnect(); };
  }, []);

  // Back to top
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Variantes reutilizables (fade + parallax suave)
  const sectionVariants = {
    initial: { opacity: 0, y: 18, filter: "blur(1px)" },
    inview:  { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[--brand-bg] text-[--graphite-900]"
    >
      {/* Splash */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] grid place-items-center"
            style={{ background: "#FFF7F2" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="grid place-items-center gap-6">
              <svg width="64" height="64" viewBox="0 0 44 44" role="img" aria-label="Loading">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(246,163,192,0.35)" strokeWidth="4" />
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgb(246,163,192)" strokeWidth="4" strokeLinecap="round" strokeDasharray="80 200">
                  <animateTransform attributeName="transform" type="rotate" from="0 22 22" to="360 22 22" dur="0.9s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HEADER ===== */}
      <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-white/60 backdrop-blur-md shadow-sm" : "bg-white/30 backdrop-blur-md"}`}>
        <div className="relative">
          <motion.div style={{ opacity: brandPhaseS }} className="absolute inset-0 bg-white/70 backdrop-blur-lg shadow-md" />
          <div className="max-w-6xl mx-auto h-[72px] px-4 flex items-center gap-4 relative">
            {/* BRAND */}
            <a href="#home" className="flex items-center gap-3 shrink-0 z-10">
              <motion.span
                style={{ opacity: brandOpacityS, y: useSpring(brandY, {stiffness:140,damping:22,mass:0.25}), scale: brandScaleS }}
                className="font-display font-semibold text-[20px] sm:text-[22px] md:text-[24px] text-[--brand-rose]"
              >
                {SETTINGS.brand}
              </motion.span>
            </a>

            {/* NAV centrado */}
            <nav className="hidden md:flex items-center md:gap-6 lg:gap-8 text-[15px] uppercase tracking-wide font-sans absolute left-1/2 -translate-x-1/2">
              {navIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className={`nav-link ${active === id ? 'is-active' : ''} text-[--graphite-600] hover:text-[--graphite-900]`}
                  aria-current={active === id ? 'page' : undefined}
                >
                  {t.nav[id]}
                </button>
              ))}
            </nav>

            {/* Idioma (derecha) */}
            <button
              className="ml-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[--graphite-100] text-sm hover:bg-white/50 font-sans z-10"
              onClick={() => setLang(prev => (prev === 'en' ? 'es' : 'en'))}
              aria-label="Toggle language"
            >
              <Languages size={16} /> {t.lang}
            </button>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden overflow-x-auto px-4 pb-2 -mt-1 relative z-10">
            <div className="flex gap-5 text-[14px] uppercase tracking-wide text-[--graphite-600] font-sans">
              {navIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className={`nav-link ${active === id ? 'is-active' : ''} hover:text-[--graphite-900]`}
                  aria-current={active === id ? 'page' : undefined}
                >
                  {t.nav[id]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ===== CONTENEDOR CON SNAP ===== */}
      <main className="snap-y snap-mandatory">
        {/* ===== HERO ===== */}
        <section
          id="home"
          ref={heroRef}
          className="relative bg-[--hero] section-anchor snap-start"
          style={{ scrollMarginTop: '88px' }}
        >
          {/* leve velo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: veilOpacity }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[--brand-bg] pointer-events-none"
          />
          {/* contenido */}
          <div className="min-h-[calc(100svh-72px)] w-full flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ opacity: logoOpacity, scale: logoScale }}
              className="relative w-[546px] sm:w-[672px] md:w-[798px] lg:w-[924px] aspect-[1.9/1]"
            >
              <Image
                src="/images/logo-white.webp"
                alt="Heavenly Knits"
                fill
                priority
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                sizes="(max-width: 640px) 546px, (max-width: 768px) 672px, (max-width: 1024px) 798px, 924px"
              />
            </motion.div>
          </div>
        </section>

        {/* ===== CATALOGO ===== */}
        <motion.section
          id="catalog"
          className="snap-start section-anchor bg-[--ivory] flex items-start md:items-center"
          style={{ minHeight: 'calc(100svh - 72px)', scrollMarginTop: '88px' }}
          variants={sectionVariants}
          initial="initial"
          whileInView="inview"
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: .5, ease: [0.22,1,0.36,1] }}
        >
          <div className="max-w-6xl mx-auto px-4 w-full py-10 md:py-0">
            <div className="flex items-center gap-2 mb-6">
              <Palette size={18} className="text-[--raspberry]"/>
              <h2 className="text-2xl font-black">{t.catalog.title}</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map(p => (
                <motion.article
                  key={p.id}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.995 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md border border-[--graphite-100] flex flex-col transition-shadow focus-within:shadow-lg hover:shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.name[lang]}
                      width={960}
                      height={640}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 text-xs bg-white/90 rounded-full px-3 py-1 shadow">
                      {t.catalog.badge}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg">{p.name[lang]}</h3>
                    <div className="text-[--graphite-600] mt-1">{p.price}</div>
                    <div className="mt-3 text-xs">
                      <span className="font-semibold">{t.catalog.materials}:</span> {p.materials}
                    </div>
                    <div className="mt-4">
                      <a
                        href={p.checkout && p.checkout !== "#" ? p.checkout : undefined}
                        target={p.checkout && p.checkout !== "#" ? "_blank" : undefined}
                        rel={p.checkout && p.checkout !== "#" ? "noreferrer" : undefined}
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--raspberry]/30 ${p.checkout && p.checkout !== "#" ? "bg-[--raspberry] hover:brightness-95 active:scale-[0.99]" : "bg-[--graphite-600] opacity-60 cursor-not-allowed"}`}
                        aria-disabled={!p.checkout || p.checkout === "#"}
                      >
                        <ShoppingBag size={16} /> {t.catalog.buy}
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== ABOUT ===== */}
        <motion.section
          id="about"
          className="snap-start section-anchor bg-white flex items-start md:items-center"
          style={{ minHeight: 'calc(100svh - 72px)', scrollMarginTop: '88px' }}
          variants={sectionVariants}
          initial="initial"
          whileInView="inview"
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: .5, ease: [0.22,1,0.36,1] }}
        >
          <div className="max-w-6xl mx-auto px-4 w-full py-10 md:py-0">
            <h2 className="font-display text-[clamp(28px,2.4vw,40px)] font-semibold tracking-tight mb-8">
              {t.about.title}
            </h2>

            <div className="grid md:grid-cols-[420px_1fr] gap-10 md:items-center">
              <div className="rounded-3xl overflow-hidden bg-white border border-[--graphite-100] shadow-md">
                <div className="relative w-full aspect-[3/4] md:aspect-square">
                  <Image
                    src="/images/artist/anguie-portrait.webp"
                    alt="Anguie Munoz - Heavenly Knits"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover md:object-[50%_35%]"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </div>
              </div>

              <div className="font-sans editorial-copy max-w-[58ch]">
                <p className="mb-4">{t.about.p1}</p>
                <p className="mb-4">{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== INSTAGRAM (3×3) ===== */}
        <motion.section
          id="instagram"
          className="snap-start section-anchor bg-white flex items-start md:items-center"
          style={{ minHeight: 'calc(100svh - 72px)', scrollMarginTop: '88px' }}
          variants={sectionVariants}
          initial="initial"
          whileInView="inview"
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: .5, ease: [0.22,1,0.36,1] }}
        >
          <div className="max-w-6xl mx-auto px-4 w-full py-10 md:py-0">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display text-[clamp(28px,2.4vw,40px)] font-semibold tracking-tight">
                Instagram
              </h2>
              <a
                href={SETTINGS.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[--hk-deeprose] hover:underline"
              >
                {i18n[lang].ig.view} <InstaIcon size={16}/>
              </a>
            </div>

            <InstagramGrid />
          </div>
        </motion.section>

        {/* ===== CONTACT ===== */}
        <motion.section
          id="contact"
          className="snap-start section-anchor bg-white flex items-start md:items-center"
          style={{ minHeight: 'calc(100svh - 72px)', scrollMarginTop: '88px' }}
          variants={sectionVariants}
          initial="initial"
          whileInView="inview"
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: .5, ease: [0.22,1,0.36,1] }}
        >
          <div className="max-w-6xl mx-auto px-4 w-full py-10 md:py-0">
            <h2 className="text-2xl font-black">{t.contact.title}</h2>
            <div className="grid md:grid-cols-2 gap-10 mt-6">
              <form onSubmit={(e)=>{e.preventDefault(); window.location.href = mailtoHref;}} className="bg-white border border-[--graphite-100] rounded-3xl p-6 shadow-md">
                <div className="text-lg font-semibold mb-4">{t.contact.formTitle}</div>
                <input required placeholder={t.contact.name} className="w-full border rounded-xl px-4 py-2 mb-3"/>
                <input required type="email" placeholder={t.contact.email} className="w-full border rounded-xl px-4 py-2 mb-3"/>
                <textarea required placeholder={t.contact.msg} className="w-full border rounded-xl px-4 py-2 mb-3 h-32"/>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white hover:brightness-95 active:scale-[0.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--raspberry]/30">
                  {t.contact.send}<ArrowRight size={16}/>
                </button>
                <div className="text-sm text-[--graphite-600] mt-3">{t.contact.alt} <a href={mailtoHref} className="underline">{SETTINGS.email}</a></div>
              </form>
              <div className="bg-white border border-[--graphite-100] rounded-3xl p-6 shadow-md">
                <div className="flex flex-col gap-3">
                  <a className="inline-flex items-center gap-3" href={`tel:${SETTINGS.phone}`}><Phone size={18}/> {SETTINGS.phone}</a>
                  <a className="inline-flex items-center gap-3" href={`mailto:${SETTINGS.email}`}><Mail size={18}/> {SETTINGS.email}</a>
                  <a className="inline-flex items-center gap-3" href={SETTINGS.instagram} target="_blank" rel="noreferrer"><InstaIcon size={18}/> Instagram</a>
                  <a className="inline-flex items-center gap-3" href={SETTINGS.youtube} target="_blank" rel="noreferrer"><Youtube size={18}/> YouTube</a>
                  <p className="text-sm text-[--graphite-600]">{lang==='en' ? 'Based in Atlanta, GA' : 'Con base en Atlanta, GA'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== FOOTER (no full-screen) ===== */}
        <section id="footer" className="snap-start">
          <div className="relative text-[--graphite-900]">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--bubblegum),rgba(255,255,255,0))]" />
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-5 font-sans text-[15px] font-semibold tracking-wide">
                <a href="/privacy" className="hover:opacity-90 transition">
                  {lang === 'en' ? 'Shipping Policy' : 'Política de envíos'}
                </a>
                <span className="hidden sm:inline opacity-50">•</span>
                <a href="/faq" className="hover:opacity-90 transition">FAQ</a>
              </div>
            </div>
            <div className="h-px w-full bg-[--hk-deeprose]" />
          </div>

          <footer className="bg-[--hk-peach] text-[--hk-deeprose]">
            <div className="max-w-6xl mx-auto px-4 py-14">
              <div className="grid md:grid-cols-3 gap-10 items-center">
                <div className="flex flex-col items-center md:items-center justify-center text-center md:text-left">
                  <div className="uppercase text-[13px] tracking-[0.22em] font-bold mb-4 font-display">
                    {lang === 'en' ? 'Find us' : 'Encuéntranos'}
                  </div>
                  <div className="flex gap-3">
                    <a href={SETTINGS.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-[--hk-mint] border border-white/40 hover:brightness-95 transition" aria-label="Instagram" title="Instagram">
                      <InstaIcon size={18} color="var(--hk-deeprose)"/>
                    </a>
                    <a href={SETTINGS.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center rounded-full bg-[--hk-lavender] border border-white/40 hover:brightness-95 transition" aria-label="YouTube" title="YouTube">
                      <Youtube size={18} color="var(--hk-deeprose)"/>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div aria-hidden="true" className="absolute rounded-full bg-[--bubblegum] w-[200px] h-[200px] sm:w-[230px] sm:h-[230px]" />
                    <div className="relative w-[360px] sm:w-[420px] aspect-[1.8/1] z-10">
                      <Image src="/images/logo-white.webp" alt="Heavenly Knits" fill priority decoding="sync" placeholder="blur" blurDataURL={BLUR} className="object-contain drop-shadow" sizes="(max-width: 640px) 360px, (max-width: 768px) 420px, 420px" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center text-left">
                  <div className="font-display text-[13.5px] sm:text-[14px] tracking-[0.22em] uppercase mb-2">
                    {lang === 'en' ? 'Tied by threads' : 'Unidos por hilos'}
                  </div>
                  <p className="font-sans footer-copy mb-4">
                    {lang === 'en'
                      ? 'Soft updates, color stories, and freebies - just the good stitches.'
                      : 'Actualizaciones suaves, historias de color y freebies - solo puntadas bonitas.'}
                  </p>

                  <form onSubmit={(e)=>{e.preventDefault(); alert(lang==='en' ? 'Thanks for subscribing!' : '¡Gracias por suscribirte!');}} className="font-sans flex flex-col gap-3">
                    <input type="email" required placeholder={lang === 'en' ? 'Email' : 'Correo'} className="w-full md:w-[420px] h-12 rounded-xl px-4 text-[15px] text-[--hk-deeprose] bg-white placeholder:text-[--hk-deeprose]/70 border border-[--bubblegum] focus:outline-none focus:ring-2 focus:ring-[--hk-orange]/40" />
                    <button className="w-full md:w-[420px] h-12 rounded-xl text-[12.5px] font-semibold uppercase tracking-[0.12em] bg-[--hk-deeprose] text-white hover:bg-[--hk-orange] btn-soft">
                      {lang === 'en' ? 'Subscribe' : 'Suscríbete'}
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-[--hk-deeprose] text-sm text-[--hk-deeprose] flex flex-col md:flex-row items-center justify-between gap-3 font-sans">
                <div>
                  © {new Date().getFullYear()} {SETTINGS.brand}. {lang==='en' ? i18n.en.footer.rights : i18n.es.footer.rights}
                </div>
                <div className="flex items-center gap-4">
                  <a href="/privacy" className="hover:underline">{lang==='en' ? 'Privacy' : 'Privacidad'}</a>
                  <a href="/terms" className="hover:underline">{lang==='en' ? 'Terms' : 'Términos'}</a>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>

      {/* Back to top flotante */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            onClick={goTop}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: .25 }}
            className="fixed bottom-5 right-5 z-[60] h-11 w-11 rounded-full bg-[--hk-deeprose] text-white shadow-lg hover:brightness-95 active:scale-95 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--hk-deeprose]/40"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={18}/>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
