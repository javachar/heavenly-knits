'use client';

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag, Phone, Mail, Instagram as InstaIcon, Youtube,
  ArrowRight, Languages, Palette
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
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

const COLORS = {
  pinkBrand: "#F6A3C0",
  coral: "#FF8F70",
  mango: "#FFB341",
  bubblegum: "#FFA2B8",
  raspberry: "#B12E5E",
  ivory: "#FFF7F2",
  graphite900: "#1E1E1E",
  graphite600: "#565656",
  graphite100: "#EDEDED",
};

/* ========= INSTAGRAM ========= (queda por si luego activamos embeds) */
const INSTAGRAM = {
  handle: "heavenlyknits.co",
  mode: "embeds",
  grid: [],
};

const i18n = {
  en: {
    nav: { home: "Home", catalog: "Catalog", portfolio: "Portfolio", about: "About", blog: "Journal", contact: "Contact", fair: "Fair", instagram: "Instagram" },
    catalog: { title: "Catalog", badge: "Made by Anguie", buy: "Buy", enquire: "Enquire", colors: "Colors", materials: "Materials", size: "Size" },
    portfolio: { title: "Projects" },
    about: { title: "Meet the Artist" },
    blog: { title: "Journal", empty: "Coming soon: tutorials, fair recaps, and behind the scenes." },
    contact: { title: "Contact", formTitle: "Write us", name: "Name", email: "Email", msg: "Message", send: "Send", alt: "Or reach us at:" },
    fair: { title: "Find us at the Fair", p: "Scan to open the site on your phone and explore the catalog.", cta: "Open Catalog" },
    ig: { title: "Follow us on Instagram", view: "Open Instagram" },
    footer: { rights: "All rights reserved." },
    lang: "ES"
  },
  es: {
    nav: { home: "Inicio", catalog: "Catálogo", portfolio: "Portafolio", about: "Acerca", blog: "Blog", contact: "Contacto", fair: "Feria", instagram: "Instagram" },
    catalog: { title: "Catálogo", badge: "Hecho por Anguie", buy: "Comprar", enquire: "Encargar", colors: "Colores", materials: "Materiales", size: "Tamaño" },
    portfolio: { title: "Proyectos" },
    about: { title: "Conoce a la Artista" },
    blog: { title: "Blog", empty: "Muy pronto: tutoriales, crónicas de ferias y detrás de cámaras." },
    contact: { title: "Contacto", formTitle: "Escríbenos", name: "Nombre", email: "Correo", msg: "Mensaje", send: "Enviar", alt: "O contáctanos en:" },
    fair: { title: "Encuéntranos en la feria", p: "Escanea para abrir el sitio en tu celular y explorar el catálogo.", cta: "Abrir catálogo" },
    ig: { title: "Síguenos en Instagram", view: "Abrir Instagram" },
    footer: { rights: "Todos los derechos reservados." },
    lang: "EN"
  }
};

/* =========================
   DATA: Featured Product
========================= */
const FEATURED_PRODUCT = {
  id: "hk-yarn-spinner-cow",
  name: { en: "3D Yarn Spinner — Cow Edition", es: "Yarn Spinner 3D — Vaquita" },
  price: "$44.99",
  img: "/images/yarn-spinner-cow.webp", // coloca tu imagen aquí
  bullets: {
    en: [
      "Ultra-smooth + silent bearing (no plastic-on-plastic)",
      "Non-slip rubber base — stable on any table",
      "Detachable threaded pin for easy skein swap",
      "Hand-painted details: classic cow palette",
    ],
    es: [
      "Rodamiento ultrasuave y silencioso (sin roce plástico-plástico)",
      "Base con gomas antideslizantes — estable en cualquier mesa",
      "Perno roscado desmontable para cambiar ovillos",
      "Detalles pintados a mano: paleta clásica de vaquita",
    ],
  },
  checkout: "#", // pon tu link final cuando lo tengas
};

/* =========================
   HELPERS
========================= */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function FullSection({ id, title, img, align="right", cta }) {
  return (
    <section id={id} className="relative snap-section min-h-[100svh] section-anchor">
      <div className="absolute inset-0 -z-10">
        <Image src={img} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
      </div>
      <div className="max-w-[1320px] mx-auto h-full px-4 py-10 flex items-end">
        <div className={`w-full flex ${align === "right" ? "justify-end" : "justify-start"}`}>
          <div className="mb-8">
            <h2 className="font-display font-semibold tracking-tight text-[64px] sm:text-[88px] leading-none drop-shadow-[0_2px_0_rgba(255,255,255,0.6)]">
              {title}
            </h2>
            {cta && (
              <a href={cta.href} className="inline-flex items-center gap-2 mt-4 scallop text-sm">
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   PAGE (FULL-SNAP)
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

  // Mailto
  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${SETTINGS.brand} — Enquiry`);
    return `mailto:${SETTINGS.email}?subject=${subject}`;
  }, []);

  // Items nav
  const navItems = [
    ["home", t.nav.home],
    ["product", t.nav.catalog],
    ["portfolio", t.nav.portfolio],
    ["about", t.nav.about],
    ["blog", t.nav.blog],
    ["contact", t.nav.contact],
    ["fair", t.nav.fair],
  ];

  // Splash (arranque)
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const tmr = setTimeout(() => setBooting(false), 1200);
    return () => clearTimeout(tmr);
  }, []);

  if (booting) {
    return (
      <div className="fixed inset-0 z-[9999] grid place-items-center bg-white">
        <div className="splash-loader" aria-hidden="true">
          <span className="ring ring-hero"></span>
          <span className="dot dot-hero"></span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-[--ivory] text-[--graphite-900]"
    >
      {/* ===== HEADER ===== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200
          ${scrolled ? "bg-white/60 backdrop-blur-md shadow-sm" : "bg-white/30 backdrop-blur-md"}`}
      >
        <div className="max-w-6xl mx-auto h-16 px-4 flex items-center gap-4">
          <a href="#home" className="flex items-center gap-3 shrink-0">
            <span className="font-display font-semibold tracking-tight text-[18px] text-[--raspberry]">
              {SETTINGS.brand}
            </span>
          </a>

          {/* Menú */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] uppercase tracking-wide mx-auto font-sans">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="nav-link-line text-[--graphite-600] hover:text-[--graphite-900]"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            className="ml-auto md:ml-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full
                       border border-[--graphite-100] text-sm hover:bg-white/50 font-sans"
            onClick={() => setLang(prev => prev === 'en' ? 'es' : 'en')}
            aria-label="Toggle language"
          >
            <Languages size={16} /> {t.lang}
          </button>
        </div>

        {/* Menú móvil */}
        <div className="md:hidden overflow-x-auto px-4 pb-2 -mt-1">
          <div className="flex gap-5 text-[14px] uppercase tracking-wide text-[--graphite-600] font-sans">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="nav-link-line pb-1 hover:text-[--graphite-900]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ===== BLOQUE DE SECCIONES FULL-SCREEN (scroll-snap) ===== */}
      <div className="snap-container">
        {/* HERO */}
        <section
          id="home"
          className="relative snap-section min-h-[100svh] grid place-items-center bg-[--hero] section-anchor overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative w-[240px] sm:w-[320px] md:w-[420px] lg:w-[520px] aspect-square"
          >
            <Image
              src="/images/logo-white.webp"
              alt="Heavenly Knits"
              fill
              priority
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="object-contain"
              sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, (max-width: 1024px) 420px, 520px"
            />
          </motion.div>
        </section>

        {/* HERO SECTIONS */}
        <FullSection
          id="kits"
          title="Kits"
          img="https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1600&auto=format&fit=crop"
          align="right"
          cta={{ href: "#product", label: lang==='en' ? 'VIEW PRODUCT' : 'VER PRODUCTO' }}
        />
        <FullSection
          id="materials"
          title={lang==='en' ? 'Materials' : 'Materiales'}
          img="https://images.unsplash.com/photo-1520975922284-7b683fe621b9?q=80&w=1600&auto=format&fit=crop"
          align="left"
          cta={{ href: "#product", label: lang==='en' ? 'VIEW PRODUCT' : 'VER PRODUCTO' }}
        />
        <FullSection
          id="courses"
          title={lang==='en' ? 'Courses' : 'Cursos'}
          img="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
          align="right"
          cta={{ href: "#blog", label: lang==='en' ? 'SEE MORE' : 'VER MÁS' }}
        />

        {/* FEATURED PRODUCT — YARN SPINNER */}
        <section id="product" className="snap-section min-h-[100svh] section-anchor grid place-items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 mb-4 text-[12px] uppercase tracking-wide text-[--graphite-600]">
                  <Palette size={16} className="text-[--raspberry]" />
                  {lang === 'en' ? 'Featured Product' : 'Producto destacado'}
                </div>
                <h2 className="font-display text-[36px] sm:text-[44px] leading-[1.05] tracking-tight">
                  {FEATURED_PRODUCT.name[lang]}
                </h2>
                <div className="mt-2 text-xl font-semibold text-[--raspberry]">
                  {FEATURED_PRODUCT.price}
                </div>
                <ul className="mt-4 space-y-2 text-[--graphite-600]">
                  {FEATURED_PRODUCT.bullets[lang].map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-[--raspberry]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={FEATURED_PRODUCT.checkout !== "#" ? FEATURED_PRODUCT.checkout : undefined}
                    target="_blank" rel="noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-5 h-12 rounded-2xl text-white shadow-sm transition
                    ${FEATURED_PRODUCT.checkout !== "#" ? "bg-[--raspberry] hover:brightness-95 active:scale-[0.99]" : "bg-[--graphite-600] opacity-60 cursor-not-allowed"}`}
                    aria-disabled={FEATURED_PRODUCT.checkout === "#"}
                  >
                    <ShoppingBag size={16} /> {lang === 'en' ? 'Buy' : 'Comprar'}
                  </a>
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-2xl border border-[--graphite-100] hover:bg-[--graphite-100] transition"
                  >
                    {lang === 'en' ? 'Enquire' : 'Encargar'}
                  </a>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[--graphite-100] bg-white shadow-md">
                  <Image
                    src={FEATURED_PRODUCT.img}
                    alt={FEATURED_PRODUCT.name[lang]}
                    fill
                    className="object-contain p-5"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO — LITE */}
        <section id="portfolio" className="snap-section min-h-[100svh] section-anchor grid place-items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <h2 className="text-2xl font-black mb-6">{t.portfolio.title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { id:"p1", img:"https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1200&auto=format&fit=crop", title: lang==='en' ? "Botanical Series" : "Serie Botánica" },
                { id:"p2", img:"https://images.unsplash.com/photo-1520975922284-7b683fe621b9?q=80&w=1200&auto=format&fit=crop", title: lang==='en' ? "Homes & Memories" : "Hogares y Memorias" },
                { id:"p3", img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", title: lang==='en' ? "Colorimetry Studies" : "Estudios de Colorimetría" }
              ].map(card => (
                <figure key={card.id} className="card">
                  <img src={card.img} alt={card.title} className="w-full h-56 object-cover"/>
                  <figcaption className="p-4">
                    <div className="font-semibold">{card.title}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT — MEET THE ARTIST */}
        <section id="about" className="snap-section min-h-[100svh] section-anchor grid place-items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <h2 className="text-2xl font-black mb-6">{lang === 'en' ? 'Meet the Artist' : i18n.es.about.title}</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-3xl overflow-hidden shadow-md ring-1 ring-black/5">
                <img src="https://images.unsplash.com/photo-1520697222860-779f85a6a6cf?q=80&w=1200&auto=format&fit=crop" alt="Anguie portrait" className="w-full h-[360px] object-cover"/>
              </div>
              <div className="space-y-4 text-[--graphite-600] leading-relaxed">
                {lang === 'en' ? (
                  <>
                    <p><strong>Anguie Munoz</strong> (Peru, 1993) is an Interior Designer, Architect and multidisciplinary artist.</p>
                    <p>She has been living in Georgia for the past three years, where she continues to grow her career through design projects, art fairs, and portfolio development.</p>
                    <p>She is the founder of <em>Heavenly Knits</em>, a brand dedicated to handmade pieces crafted with love. Her work blends crochet, embroidery, painting, and 3D design, always highlighting the value of craftsmanship as a bridge to contemporary design.</p>
                  </>
                ) : (
                  <>
                    <p>Anguie es diseñadora y artista visual peruana radicada en Georgia. Crea piezas delicadas y coloridas aplicando colorimetría para lograr combinaciones equilibradas y cálidas.</p>
                    <p>Heavenly Knits acerca la técnica artesanal a la vida moderna con materiales y detalles pensados.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* BLOG — LITE */}
        <section id="blog" className="snap-section min-h-[100svh] section-anchor grid place-items-center">
          <div className="max-w-3xl mx-auto px-4 w-full">
            <h2 className="text-2xl font-black mb-6">{t.blog.title}</h2>
            <div className="rounded-3xl bg-white border border-[--graphite-100] p-8 text-[--graphite-600]">
              {t.blog.empty}
            </div>
          </div>
        </section>

        {/* CONTACT — LITE */}
        <section id="contact" className="snap-section min-h-[100svh] section-anchor grid place-items-center">
          <div className="max-w-4xl mx-auto px-4 w-full">
            <h2 className="text-2xl font-black mb-6">{t.contact.title}</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="card p-6">
                <div className="text-lg font-semibold mb-4">{t.contact.formTitle}</div>
                <p className="text-[--graphite-600] mb-3">{t.contact.alt} <a href={mailtoHref} className="underline">{SETTINGS.email}</a></p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <a className="inline-flex items-center gap-3 btn-ghost" href={`tel:${SETTINGS.phone}`}><Phone size={18}/> {SETTINGS.phone}</a>
                  <a className="inline-flex items-center gap-3 btn-primary" href={`mailto:${SETTINGS.email}`}><Mail size={18}/> {SETTINGS.email}</a>
                </div>
              </div>
              <div className="card p-6">
                <div className="text-lg font-semibold mb-4">{lang==='en' ? 'Follow' : 'Síguenos'}</div>
                <div className="flex flex-col gap-3">
                  <a className="inline-flex items-center gap-3" href={SETTINGS.instagram} target="_blank" rel="noreferrer"><InstaIcon size={18}/> Instagram</a>
                  <a className="inline-flex items-center gap-3" href={SETTINGS.youtube} target="_blank" rel="noreferrer"><Youtube size={18}/> YouTube</a>
                  <p className="text-sm text-[--graphite-600]">{lang==='en' ? 'Based in Atlanta, GA' : 'Con base en Atlanta, GA'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAIR / QR — FULL */}
        <section id="fair" className="snap-section min-h-[100svh] section-anchor grid place-items-center">
          <div className="max-w-4xl mx-auto px-4 w-full">
            <h2 className="text-2xl font-black mb-6">{t.fair.title}</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center card p-8">
              <div className="justify-self-center">
                <QRCodeCanvas value={SETTINGS.siteUrl} size={220} bgColor="#ffffff" fgColor={COLORS.graphite900} includeMargin={true} />
              </div>
              <div>
                <p className="text-[--graphite-600] mb-4">{t.fair.p}</p>
                <a href="#product" onClick={(e)=>{e.preventDefault(); document.getElementById('product')?.scrollIntoView({behavior:'smooth'});}}
                   className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white hover:brightness-95 active:scale-[0.99] transition">
                  {t.fair.cta} <ArrowRight size={16}/>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER FIN — pequeño separator */}
        <section className="snap-section min-h-[40svh] grid place-items-end text-[--graphite-900]">
          <div className="w-full">
            <div className="h-px w-full bg-[--hk-deeprose]" />
            <footer className="bg-[--hk-peach] text-[--hk-deeprose]">
              <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 font-sans">
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
          </div>
        </section>
      </div>
    </motion.div>
  );
}
