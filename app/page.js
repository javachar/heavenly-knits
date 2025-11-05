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

const i18n = {
  en: {
    nav: { home: "Home", product: "Product", artist: "Meet the Artist", contact: "Contact", fair: "Fair", instagram: "Instagram" },
    product: { title: "Yarn Spinner (Cow Edition)", badge: "3D Printed + Silent Bearing", buy: "Buy", enquire: "Enquire", colors: "Colors", materials: "Materials", size: "Size" },
    artist: { title: "Meet the Artist", p1: "Anguie is a Peruvian designer and visual artist based in Georgia. She creates delicate, colorful pieces using colorimetry to craft warm, balanced palettes.", p2: "Heavenly Knits brings artisanal technique to modern living with thoughtful materials and detail." },
    contact: { title: "Contact", formTitle: "Write us", name: "Name", email: "Email", msg: "Message", send: "Send", alt: "Or reach us at:" },
    fair: { title: "Find us at the Fair", p: "Scan to open the site on your phone and explore the catalog.", cta: "Open Catalog" },
    footer: { rights: "All rights reserved." },
    lang: "ES"
  },
  es: {
    nav: { home: "Inicio", product: "Producto", artist: "Conoce al Artista", contact: "Contacto", fair: "Feria", instagram: "Instagram" },
    product: { title: "Yarn Spinner (Edición Vaquita)", badge: "Impreso 3D + Rodamiento Silencioso", buy: "Comprar", enquire: "Encargar", colors: "Colores", materials: "Materiales", size: "Tamaño" },
    artist: { title: "Conoce al Artista", p1: "Anguie es diseñadora y artista visual peruana radicada en Georgia. Crea piezas delicadas y coloridas aplicando colorimetría para lograr paletas cálidas y equilibradas.", p2: "Heavenly Knits acerca la técnica artesanal a la vida moderna con materiales y detalles pensados." },
    contact: { title: "Contacto", formTitle: "Escríbenos", name: "Nombre", email: "Correo", msg: "Mensaje", send: "Enviar", alt: "O contáctanos en:" },
    fair: { title: "Encuéntranos en la feria", p: "Escanea para abrir el sitio en tu celular y explorar el catálogo.", cta: "Abrir catálogo" },
    footer: { rights: "Todos los derechos reservados." },
    lang: "EN"
  }
};

/* =========================
   PRODUCTO ÚNICO (Yarn Spinner Vaquita)
========================= */
const PRODUCT = {
  id: "hk-yarn-spinner-cow",
  name: { en: "Yarn Spinner – Cow Edition", es: "Yarn Spinner – Edición Vaquita" },
  price: "$44.99",
  img: "/images/yarn-spinner-cow.webp", // asegúrate de tener este archivo en /public/images/
  colors: ["Black/White", "Pink accents", "Brown horns"],
  materials: "PLA 3D print, steel bearing, rubber feet",
  size: "For 4–6 in yarn cakes (standard); smooth & silent spin",
  checkout: "", // si aún no tienes link de compra, déjalo vacío para desactivar el botón
};

/* =========================
   HELPERS
========================= */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

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

  // Mailto
  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${SETTINGS.brand} — Enquiry`);
    return `mailto:${SETTINGS.email}?subject=${subject}`;
  }, []);

  // Items nav
  const navItems = [
    ["home", t.nav.home],
    ["product", t.nav.product],
    ["artist", t.nav.artist],
    ["contact", t.nav.contact],
    ["fair", t.nav.fair],
    ["instagram", t.nav.instagram],
  ];

  // Splash (arranque suave)
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
          ${scrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white/30 backdrop-blur-md"}`}
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

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="relative min-h-[82vh] grid place-items-center bg-[--hero] section-anchor overflow-hidden"
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

      {/* ===== PRODUCTO: YARN SPINNER ===== */}
      <section id="product" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-6">
          <Palette size={18} className="text-[--raspberry]"/>
          <h2 className="text-2xl font-black">{t.product.title}</h2>
        </div>

        <article className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-md border border-[--graphite-100]">
          <div className="relative min-h-[320px]">
            <img
              src={PRODUCT.img}
              alt={PRODUCT.name[lang]}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 text-xs bg-white/95 rounded-full px-3 py-1 shadow">
              {t.product.badge}
            </span>
          </div>

          <div className="p-6 flex flex-col">
            <h3 className="font-display text-xl sm:text-2xl">{PRODUCT.name[lang]}</h3>
            <div className="text-[--graphite-600] mt-1">{PRODUCT.price}</div>

            <div className="mt-4 grid gap-2 text-sm">
              <div><span className="font-semibold">{t.product.colors}:</span> {PRODUCT.colors.join(', ')}</div>
              <div><span className="font-semibold">{t.product.materials}:</span> {PRODUCT.materials}</div>
              <div><span className="font-semibold">{t.product.size}:</span> {PRODUCT.size}</div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href={PRODUCT.checkout ? PRODUCT.checkout : undefined}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-white shadow-sm transition
                  ${PRODUCT.checkout ? "bg-[--raspberry] hover:brightness-95 active:scale-[0.99]" : "bg-[--graphite-600] opacity-60 cursor-not-allowed"}`}
                aria-disabled={!PRODUCT.checkout}
              >
                <ShoppingBag size={16} /> {t.product.buy}
              </a>
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl border border-[--graphite-100] hover:bg-[--graphite-100] transition"
              >
                {t.product.enquire}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a className="inline-flex items-center gap-2 text-[--graphite-600] hover:opacity-80" href={SETTINGS.instagram} target="_blank" rel="noreferrer"><InstaIcon size={18}/> Instagram</a>
              <a className="inline-flex items-center gap-2 text-[--graphite-600] hover:opacity-80" href={SETTINGS.youtube} target="_blank" rel="noreferrer"><Youtube size={18}/> YouTube</a>
            </div>
          </div>
        </article>
      </section>

      {/* ===== MEET THE ARTIST ===== */}
      <section id="artist" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-6">{t.artist.title}</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-md ring-1 ring-black/5">
            <img
              src="https://images.unsplash.com/photo-1520697222860-779f85a6a6cf?q=80&w=1200&auto=format&fit=crop"
              alt="Anguie portrait"
              className="w-full h-[340px] object-cover"
            />
          </div>
          <div>
            <p className="text-[--graphite-600] leading-relaxed">{t.artist.p1}</p>
            <p className="text-[--graphite-600] leading-relaxed mt-4">{t.artist.p2}</p>
          </div>
        </div>
      </section>

      {/* ===== CONTACTO ===== */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-6">{t.contact.title}</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <form
            onSubmit={(e)=>{e.preventDefault(); window.location.href = mailtoHref;}}
            className="bg-white border border-[--graphite-100] rounded-3xl p-6 shadow-md"
          >
            <div className="text-lg font-semibold mb-4">{t.contact.formTitle}</div>
            <input required placeholder={t.contact.name} className="w-full border rounded-xl px-4 py-2 mb-3"/>
            <input required type="email" placeholder={t.contact.email} className="w-full border rounded-xl px-4 py-2 mb-3"/>
            <textarea required placeholder={t.contact.msg} className="w-full border rounded-xl px-4 py-2 mb-3 h-32"/>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white hover:brightness-95 active:scale-[0.99] transition">
              {t.contact.send}<ArrowRight size={16}/>
            </button>
            <div className="text-sm text-[--graphite-600] mt-3">
              {t.contact.alt} <a href={mailtoHref} className="underline">{SETTINGS.email}</a>
            </div>
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

      {/* ===== FERIA / QR ===== */}
      <section id="fair" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-6">{lang==='en' ? 'Find us at the Fair' : 'Encuéntranos en la feria'}</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white border border-[--graphite-100] rounded-3xl p-8 shadow-md">
          <div className="justify-self-center">
            <QRCodeCanvas value={SETTINGS.siteUrl} size={220} bgColor="#ffffff" fgColor={COLORS.graphite900} includeMargin={true} />
          </div>
          <div>
            <p className="text-[--graphite-600] mb-4">{i18n[lang].fair.p}</p>
            <a href="#product" onClick={(e)=>{e.preventDefault(); document.getElementById('product')?.scrollIntoView({behavior:'smooth'});}}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white hover:brightness-95 active:scale-[0.99] transition">
              {i18n[lang].fair.cta} <ArrowRight size={16}/>
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
