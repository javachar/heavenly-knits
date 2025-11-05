'use client';

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

/* ========= INSTAGRAM ========= */
const INSTAGRAM = {
  handle: "heavenlyknits.co",
  mode: "embeds",
  grid: [
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/1.jpg", alt: "Heavenly Knits 1" },
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/2.jpg", alt: "Heavenly Knits 2" },
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/3.jpg", alt: "Heavenly Knits 3" },
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/4.jpg", alt: "Heavenly Knits 4" },
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/5.jpg", alt: "Heavenly Knits 5" },
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/6.jpg", alt: "Heavenly Knits 6" },
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/7.jpg", alt: "Heavenly Knits 7" },
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/8.jpg", alt: "Heavenly Knits 8" },
    { href: "https://www.instagram.com/heavenlyknits.co/", img: "/ig/9.jpg", alt: "Heavenly Knits 9" },
  ],
};

const i18n = {
  en: {
    nav: { home: "Home", catalog: "Catalog", portfolio: "Portfolio", about: "About", blog: "Journal", contact: "Contact", fair: "Fair", instagram: "Instagram" },
    catalog: { title: "Catalog", badge: "Made by Anguie", buy: "Buy", enquire: "Enquire", colors: "Colors", materials: "Materials", size: "Size" },
    portfolio: { title: "Projects" },
    about: {
      title: "Meet the Artist",
      p1: "Anguie Munoz (Peru, 1993) is an Interior Designer, Architect and multidisciplinary artist.",
      p2: "She has been living in Georgia for the past three years, where she continues to grow her career through design projects, art fairs, and portfolio development.",
      p3: "She is the founder of Heavenly Knits, a brand dedicated to handmade pieces crafted with love. Her work blends crochet, embroidery, painting, and 3D design, always highlighting the value of craftsmanship as a bridge to contemporary design."
    },
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
    about: {
      title: "Conoce a la Artista",
      p1: "Anguie Muñoz (Perú, 1993) es Interior Designer, Architect y artista multidisciplinaria.",
      p2: "Vive en Georgia desde hace tres años, donde continúa consolidando su carrera a través de proyectos de diseño, ferias de arte y el desarrollo de su portafolio.",
      p3: "Es fundadora de Heavenly Knits, una marca dedicada a piezas hechas a mano con amor. Su obra combina crochet, bordado, pintura y diseño 3D, destacando siempre el valor de la artesanía como puente hacia el diseño contemporáneo."
    },
    blog: { title: "Blog", empty: "Muy pronto: tutoriales, crónicas de ferias y detrás de cámaras." },
    contact: { title: "Contacto", formTitle: "Escríbenos", name: "Nombre", email: "Correo", msg: "Mensaje", send: "Enviar", alt: "O contáctanos en:" },
    fair: { title: "Encuéntranos en la feria", p: "Escanea para abrir el sitio en tu celular y explorar el catálogo.", cta: "Abrir catálogo" },
    ig: { title: "Síguenos en Instagram", view: "Abrir Instagram" },
    footer: { rights: "Todos los derechos reservados." },
    lang: "EN"
  }
};

/* =========================
   DATA (solo 1 producto)
========================= */
const PRODUCTS = [
  {
    id: "hk-yarn-spinner-cow",
    name: {
      en: "Yarn Spinner – Cow (3D printed)",
      es: "Yarn Spinner – Vaquita (impreso 3D)"
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

/* =========================
   SECCIÓN FULL con PARALLAX
========================= */
function FullSection({ id, title, img, align = "right", cta, bgClass }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.0, 1, 1]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-[100svh] section-anchor ${bgClass || ""}`}
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y, opacity }}>
        <Image src={img} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
      </motion.div>

      <div className="max-w-[1320px] mx-auto h-full px-4 py-10 flex items-end">
        <div className={`w-full flex ${align === "right" ? "justify-end" : "justify-start"}`}>
          <div className="mb-12">
            <h2 className="font-display font-semibold tracking-tight text-[56px] sm:text-[72px] md:text-[88px] leading-none drop-shadow-[0_2px_0_rgba(255,255,255,0.6)]">
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
   PAGE (REAL SITE)
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

  // Instagram (embeds)
  const [embedUrls, setEmbedUrls] = useState([]);
  const [igError, setIgError] = useState("");
  useEffect(() => {
    if (INSTAGRAM.mode !== "embeds") return;
    (async () => {
      try {
        const res = await fetch("/api/instagram", { cache: "no-store" });
        const json = await res.json();
        if (res.ok) {
          const urls = (json.data || []).map(m => m.permalink).filter(Boolean);
          setEmbedUrls(urls);
        } else {
          setIgError(json?.error || "Instagram API error");
        }
      } catch {
        setIgError("No se pudo cargar Instagram.");
      }
    })();
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${SETTINGS.brand} — Enquiry`);
    return `mailto:${SETTINGS.email}?subject=${subject}`;
  }, []);

  const navItems = [
    ["home", t.nav.home],
    ["catalog", t.nav.catalog],
    ["portfolio", t.nav.portfolio],
    ["about", t.nav.about],
    ["blog", t.nav.blog],
    ["contact", t.nav.contact],
    ["fair", t.nav.fair],
    ["instagram", t.nav.instagram],
  ];

  // Splash
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const tmr = setTimeout(() => setBooting(false), 900);
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

      {/* ===== HERO (ya OK) ===== */}
      <section id="home" className="relative bg-[--hero] section-anchor overflow-hidden">
        <div className="h-[calc(100svh-64px)] w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-[420px] sm:w-[520px] md:w-[620px] lg:w-[720px] aspect-[1.9/1]"
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
              sizes="(max-width: 640px) 420px, (max-width: 768px) 520px, (max-width: 1024px) 620px, 720px"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== SECCIONES (colores + parallax) ===== */}
      <FullSection
        id="kits"
        title="Kits"
        img="https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1600&auto=format&fit=crop"
        align="right"
        bgClass="bg-white"
        cta={{ href: "#catalog", label: lang==='en' ? 'VIEW ALL' : 'VER TODOS' }}
      />
      <FullSection
        id="materials"
        title={lang==='en' ? 'Materials' : 'Materiales'}
        img="https://images.unsplash.com/photo-1520975922284-7b683fe621b9?q=80&w=1600&auto=format&fit=crop"
        align="left"
        bgClass="bg-[--ivory]"
        cta={{ href: "#catalog", label: lang==='en' ? 'VIEW ALL' : 'VER TODOS' }}
      />
      <FullSection
        id="courses"
        title={lang==='en' ? 'Courses' : 'Cursos'}
        img="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
        align="right"
        bgClass="bg-white"
        cta={{ href: "#blog", label: lang==='en' ? 'SEE MORE' : 'VER MÁS' }}
      />

      {/* Catalog (solo Yarn Spinner) */}
      <section id="catalog" className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center gap-2 mb-6">
          <Palette size={18} className="text-[--raspberry]"/>
          <h2 className="text-2xl font-black">{t.catalog.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(p => (
            <motion.article key={p.id} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.4}} className="bg-white rounded-3xl overflow-hidden shadow-md border border-[--graphite-100] flex flex-col">
              <div className="relative">
                <img src={p.img} alt={p.name[lang]} className="w-full h-56 object-cover"/>
                <span className="absolute top-3 left-3 text-xs bg-white/90 rounded-full px-3 py-1 shadow">{t.catalog.badge}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg">{p.name[lang]}</h3>
                <div className="text-[--graphite-600] mt-1">{p.price}</div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div className="col-span-3"><span className="font-semibold">{t.catalog.materials}:</span> {p.materials}</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a href={p.checkout && p.checkout !== "#" ? p.checkout : undefined}
                     target={p.checkout && p.checkout !== "#" ? "_blank" : undefined}
                     rel={p.checkout && p.checkout !== "#" ? "noreferrer" : undefined}
                     className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-white shadow-sm transition
                     ${p.checkout && p.checkout !== "#" ? "bg-[--raspberry] hover:brightness-95 active:scale-[0.99]" : "bg-[--graphite-600] opacity-60 cursor-not-allowed"}`}
                     aria-disabled={!p.checkout || p.checkout === "#"}>
                    <ShoppingBag size={16} /> {t.catalog.buy}
                  </a>
                  <a href={mailtoHref} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl border border-[--graphite-100] hover:bg-[--graphite-100] transition">
                    {t.catalog.enquire}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-black mb-6">{t.portfolio.title}</h2>
        <div className="rounded-3xl bg-white border border-[--graphite-100] p-8 text-[--graphite-600]">
          Coming soon.
        </div>
      </section>

      {/* About / Meet the Artist (BALANCEADO) */}
<section id="about" className="max-w-6xl mx-auto px-4 py-20">
  <h2 className="font-display text-[clamp(28px,2.4vw,40px)] font-semibold tracking-tight mb-8">
    {t.about.title}
  </h2>

  {/* Fijamos columna de imagen a 420px y el texto ocupa el resto */}
  <div className="grid md:grid-cols-[420px_1fr] gap-10 items-start">
    {/* Foto: vertical en mobile, cuadrada en md+ para equilibrar */}
    <div className="rounded-3xl overflow-hidden bg-white border border-[--graphite-100] shadow-md">
      <div className="relative w-full aspect-[3/4] md:aspect-square">
        <Image
          src="/images/artist/anguie-portrait.webp"
          alt="Anguie Munoz — Heavenly Knits"
          fill
          priority
          /* centramos un poquito más arriba para el corte cuadrado */
          className="object-cover md:object-[50%_35%]"
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </div>
    </div>

    {/* Texto: mayor tamaño, línea cómoda y ancho controlado */}
    <div className="font-sans max-w-[58ch] text-[clamp(16px,1.05vw,18px)] leading-[1.85] text-[--graphite-700]">
      <p className="mb-4">{t.about.p1}</p>
      <p className="mb-4">{t.about.p2}</p>
      <p>{t.about.p3}</p>
    </div>
  </div>
</section>


      {/* Blog */}
      <section id="blog" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-black mb-6">{t.blog.title}</h2>
        <div className="rounded-3xl bg-white border border-[--graphite-100] p-8 text-[--graphite-600]">
          {t.blog.empty}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-black mb-6">{t.contact.title}</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <form onSubmit={(e)=>{e.preventDefault(); window.location.href = mailtoHref;}} className="bg-white border border-[--graphite-100] rounded-3xl p-6 shadow-md">
            <div className="text-lg font-semibold mb-4">{t.contact.formTitle}</div>
            <input required placeholder={t.contact.name} className="w-full border rounded-xl px-4 py-2 mb-3"/>
            <input required type="email" placeholder={t.contact.email} className="w-full border rounded-xl px-4 py-2 mb-3"/>
            <textarea required placeholder={t.contact.msg} className="w-full border rounded-xl px-4 py-2 mb-3 h-32"/>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white hover:brightness-95 active:scale-[0.99] transition">
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
      </section>

      {/* Feria / QR */}
      <section id="fair" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-black mb-6">{t.fair.title}</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white border border-[--graphite-100] rounded-3xl p-8 shadow-md">
          <div className="justify-self-center">
            <QRCodeCanvas value={SETTINGS.siteUrl} size={220} bgColor="#ffffff" fgColor={COLORS.graphite900} includeMargin={true} />
          </div>
          <div>
            <p className="text-[--graphite-600] mb-4">{t.fair.p}</p>
            <a href="#catalog" onClick={(e)=>{e.preventDefault(); document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'});}}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white hover:brightness-95 active:scale-[0.99] transition">
              {t.fair.cta} <ArrowRight size={16}/>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section className="relative text-[--graphite-900]">
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
      </section>

      <footer className="bg-[--hk-peach] text-[--hk-deeprose]">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="flex flex-col items-center md:items-center justify-center text-center md:text-left">
              <div className="uppercase text-[13px] tracking-[0.22em] font-bold mb-4 font-display">
                {lang === 'en' ? 'Find us' : 'Encuéntranos'}
              </div>
              <div className="flex gap-3">
                <a href={SETTINGS.instagram} target="_blank" rel="noreferrer"
                   className="w-10 h-10 grid place-items-center rounded-full bg-[--hk-mint] border border-white/40 hover:brightness-95 transition"
                   aria-label="Instagram" title="Instagram">
                  <InstaIcon size={18} color="var(--hk-deeprose)"/>
                </a>
                <a href={SETTINGS.youtube} target="_blank" rel="noreferrer"
                   className="w-10 h-10 grid place-items-center rounded-full bg-[--hk-lavender] border border-white/40 hover:brightness-95 transition"
                   aria-label="YouTube" title="YouTube">
                  <Youtube size={18} color="var(--hk-deeprose)"/>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div aria-hidden="true"
                     className="absolute rounded-full bg-[--bubblegum] w-[200px] h-[200px] sm:w-[230px] sm:h-[230px]" />
                <div className="relative w-[360px] sm:w-[420px] aspect-[1.8/1] z-10">
                  <Image
                    src="/images/logo-white.webp"
                    alt="Heavenly Knits"
                    fill
                    priority
                    decoding="sync"
                    className="object-contain drop-shadow"
                    sizes="(max-width: 640px) 360px, (max-width: 768px) 420px, 420px"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-left">
              <div className="font-display text-[13.5px] sm:text-[14px] tracking-[0.22em] uppercase mb-2">
                {lang === 'en' ? 'Tied by threads' : 'Unidos por hilos'}
              </div>
              <p className="font-sans footer-copy mb-4">
                {lang === 'en'
                  ? 'Soft updates, color stories, and freebies — just the good stitches.'
                  : 'Actualizaciones suaves, historias de color y freebies — solo puntadas bonitas.'}
              </p>

              <form onSubmit={(e)=>{e.preventDefault(); alert(lang==='en' ? 'Thanks for subscribing!' : '¡Gracias por suscribirte!');}}
                    className="font-sans flex flex-col gap-3">
                <input type="email" required placeholder={lang === 'en' ? 'Email' : 'Correo'}
                       className="w-full md:w-[420px] h-12 rounded-xl px-4 text-[15px]
                                  text-[--hk-deeprose] bg-white placeholder:text-[--hk-deeprose]/70
                                  border border-[--bubblegum] focus:outline-none focus:ring-2 focus:ring-[--hk-orange]/40" />
                <button className="w-full md:w-[420px] h-12 rounded-xl text-[12.5px] font-semibold uppercase tracking-[0.12em]
                                   bg-[--hk-deeprose] text-white hover:bg-[--hk-orange] btn-soft">
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
    </motion.div>
  );
}
