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
  phone: "+1 (520) 527-8311",
  email: "hello.heavenlyknits@gmail.com",
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
    about: { title: "About Anguie", p1: "Anguie is a Peruvian designer and visual artist based in Georgia. She creates delicate, colorful pieces using colorimetry to craft combinations that feel balanced and warm.", p2: "Heavenly Knits brings artisanal technique to modern living through thoughtful materials and detail." },
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
    about: { title: "Sobre Anguie", p1: "Anguie es diseñadora y artista visual peruana radicada en Georgia. Crea piezas delicadas y coloridas aplicando colorimetría para lograr combinaciones equilibradas y cálidas.", p2: "Heavenly Knits acerca la técnica artesanal a la vida moderna con materiales y detalles pensados." },
    blog: { title: "Blog", empty: "Muy pronto: tutoriales, crónicas de ferias y detrás de cámaras." },
    contact: { title: "Contacto", formTitle: "Escríbenos", name: "Nombre", email: "Correo", msg: "Mensaje", send: "Enviar", alt: "O contáctanos en:" },
    fair: { title: "Encuéntranos en la feria", p: "Escanea para abrir el sitio en tu celular y explorar el catálogo.", cta: "Abrir catálogo" },
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
    id: "hk-001",
    name: { en: "Embroidery Kit – Spring Garden", es: "Kit de Bordado – Jardín de Primavera" },
    price: "$32",
    img: "/images/blusa-rose.png",
    colors: ["Coral", "Mango", "Ivory"],
    materials: "Cotton thread, bamboo hoop, linen fabric",
    size: "8 in / 20 cm",
    checkout: "https://1f20zv-41.myshopify.com/cart/44864343212089:1?channel=buy_button",
  },
  {
    id: "hk-002",
    name: { en: "Crochet Cover – Mini Planter", es: "Funda de Crochet – Macetero Mini" },
    price: "$18",
    img: "https://images.unsplash.com/photo-1598023696416-0193a0bcd39b?q=80&w=1200&auto=format&fit=crop",
    colors: ["Bubblegum", "Mint", "Raspberry"],
    materials: "Recycled cotton yarn",
    size: "Ø 9–10 cm",
    checkout: "#",
  },
  {
    id: "hk-003",
    name: { en: "Embroidery Threads – Colorimetry Set", es: "Hilos de Bordado – Set Colorimetría" },
    price: "$24",
    img: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1200&auto=format&fit=crop",
    colors: ["Raspberry", "Pink", "Ivory"],
    materials: "100% cotton – 12 colors",
    size: "12 × 8 m skeins",
    checkout: "#",
  }
];

const PROJECTS = [
  {
    id: "p-01",
    title: { en: "Botanical Series", es: "Serie Botánica" },
    img: "https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1200&auto=format&fit=crop",
    desc: { en: "Textures and layered stitches inspired by gardens.", es: "Texturas y puntadas en capas inspiradas en jardines." }
  },
  {
    id: "p-02",
    title: { en: "Homes & Memories", es: "Hogares y Memorias" },
    img: "https://images.unsplash.com/photo-1520975922284-7b683fe621b9?q=80&w=1200&auto=format&fit=crop",
    desc: { en: "Custom pieces for warm interiors.", es: "Piezas a medida para interiores cálidos." }
  },
  {
    id: "p-03",
    title: { en: "Colorimetry Studies", es: "Estudios de Colorimetría" },
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    desc: { en: "Balanced, feminine palettes for textiles.", es: "Paletas equilibradas y femeninas para textiles." }
  }
];

/* =========================
   HELPERS
========================= */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* =========================
   SUBCOMPONENTS
========================= */
function InstagramEmbeds({ urls = [] }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (!existing) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      s.onload = () => {
        window?.instgrm?.Embeds?.process();
      };
      document.body.appendChild(s);
    } else {
      window?.instgrm?.Embeds?.process();
    }
  }, [urls]);

  if (!urls.length) {
    return (
      <div className="text-[--graphite-600]">
        <div className="rounded-2xl border border-[--graphite-100] p-6 bg-white">
          Loading Instagram…
        </div>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {urls.map((u, i) => (
        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-md border border-[--graphite-100] p-0">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={u}
            data-instgrm-version="14"
            style={{ background: "#FFF", width: "100%", margin: 0, border: 0, minWidth: 0 }}
          />
        </div>
      ))}
    </div>
  );
}

function FullSection({ id, title, img, align="right", cta }) {
  return (
    <section id={id} className="relative min-h-[92vh] section-anchor">
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

  // Instagram
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

  // Mailto
  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${SETTINGS.brand} — Enquiry`);
    return `mailto:${SETTINGS.email}?subject=${subject}`;
  }, []);

  // Items nav
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

  // ===== Splash control: solo splash blanco y luego la página aparece =====
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const tmr = setTimeout(() => setBooting(false), 1500);
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
            {/* Marca: Recoleta Alt Semibold */}
            <span className="font-display font-semibold tracking-tight text-[18px] text-[--raspberry]">
              {SETTINGS.brand}
            </span>
          </a>

          {/* Menú: Poppins */}
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
        className="relative min-h-screen grid place-items-center bg-[--hero] section-anchor overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative w-[240px] sm:w-[320px] md:w-[420px] lg:w-[520px] aspect-square"
        >
          <Image
            src="/images/logo-white.png"
            alt="Heavenly Knits"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, (max-width: 1024px) 420px, 520px"
          />
        </motion.div>
      </section>

      {/* SECCIONES */}
      <FullSection
        id="kits"
        title="Kits"
        img="https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1600&auto=format&fit=crop"
        align="right"
        cta={{ href: "#catalog", label: lang==='en' ? 'VIEW ALL' : 'VER TODOS' }}
      />
      <FullSection
        id="materials"
        title={lang==='en' ? 'Materials' : 'Materiales'}
        img="https://images.unsplash.com/photo-1520975922284-7b683fe621b9?q=80&w=1600&auto=format&fit=crop"
        align="left"
        cta={{ href: "#catalog", label: lang==='en' ? 'VIEW ALL' : 'VER TODOS' }}
      />
      <FullSection
        id="courses"
        title={lang==='en' ? 'Courses' : 'Cursos'}
        img="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
        align="right"
        cta={{ href: "#blog", label: lang==='en' ? 'SEE MORE' : 'VER MÁS' }}
      />

      {/* Catalog */}
      <section id="catalog" className="max-w-6xl mx-auto px-4 py-16">
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
                  <div><span className="font-semibold">{t.catalog.colors}:</span> {p.colors.join(', ')}</div>
                  <div className="col-span-2"><span className="font-semibold">{t.catalog.materials}:</span> {p.materials}</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a href={p.checkout && p.checkout !== "#" ? p.checkout : undefined}
                     target="_blank" rel="noreferrer"
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
      <section id="portfolio" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-6">{t.portfolio.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map(pr => (
            <motion.figure key={pr.id} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.6}} className="rounded-3xl overflow-hidden shadow-md border border-[--graphite-100] bg-white">
              <img src={pr.img} alt={pr.title[lang]} className="w-full h-56 object-cover"/>
              <figcaption className="p-4">
                <div className="font-semibold">{pr.title[lang]}</div>
                <div className="text-sm text-[--graphite-600] mt-1">{pr.desc[lang]}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-6">{t.about.title}</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-md ring-1 ring-black/5">
            <img src="https://images.unsplash.com/photo-1520697222860-779f85a6a6cf?q=80&w=1200&auto=format&fit=crop" alt="Anguie portrait" className="w-full h-[340px] object-cover"/>
          </div>
          <div>
            <p className="text-[--graphite-600] leading-relaxed">{t.about.p1}</p>
            <p className="text-[--graphite-600] leading-relaxed mt-4">{t.about.p2}</p>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-6">{t.blog.title}</h2>
        <div className="rounded-3xl bg-white border border-[--graphite-100] p-8 text-[--graphite-600]">
          {t.blog.empty}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
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
      <section id="fair" className="max-w-6xl mx-auto px-4 py-16">
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

      {/* Instagram dinámico */}
      <section id="instagram" className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black">
            {lang === 'en' ? i18n.en.ig.title : i18n.es.ig.title} <span className="text-[--graphite-600]">@{INSTAGRAM.handle}</span>
          </h2>
          <a href={`https://instagram.com/${INSTAGRAM.handle}`} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-[--graphite-100] hover:bg-[--graphite-100] transition">
            <InstaIcon size={18}/> {lang === 'en' ? i18n.en.ig.view : i18n.es.ig.view}
          </a>
        </div>

        {INSTAGRAM.mode === "embeds" ? (
          igError
            ? <div className="text-red-700 bg-red-50 border border-red-200 p-4 rounded-2xl">{igError}</div>
            : <InstagramEmbeds urls={embedUrls} />
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {INSTAGRAM.grid.map((p, i) => (
              <a key={i} href={p.href} target="_blank" rel="noreferrer" className="group block rounded-2xl overflow-hidden border border-[--graphite-100]">
                <img src={p.img} alt={p.alt} className="w-full aspect-square object-cover group-hover:scale-[1.02] transition-transform"/>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      {/* ===== Brand strip (HK palette) ===== */}
{/* ===== Top strip (gradient) + único separador Deep Rose ===== */}
<section className="relative text-[--graphite-900]">
  {/* Degradado muy suave desde bubblegum a transparente */}
  <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--bubblegum),rgba(255,255,255,0))]" />
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-5 font-sans text-[15px] font-semibold tracking-wide">
      <a href="/privacy" className="hover:opacity-90 transition">
        {lang === 'en' ? 'Shipping Policy' : 'Política de envíos'}
      </a>
      <span className="hidden sm:inline opacity-50">•</span>
      <a href="/faq" className="hover:opacity-90 transition">
        FAQ
      </a>
    </div>
  </div>
  {/* ÚNICO divisor (mismo color que “Privacy / Terms”) */}
  <div className="h-px w-full bg-[--hk-deeprose]" />
</section>

{/* ===== Footer (Peach base, Deep Rose type, accents) ===== */}
<footer className="bg-[--hk-peach] text-[--hk-deeprose]">
  <div className="max-w-6xl mx-auto px-4 py-14">
    {/* items-center => centrado vertical en desktop */}
    <div className="grid md:grid-cols-3 gap-10 items-center">
      {/* Col 1: FIND US (centrado vertical) */}
      <div className="flex flex-col items-center md:items-center justify-center text-center md:text-left">
        <div className="uppercase text-[13px] tracking-[0.22em] font-bold mb-4 font-display">
          {lang === 'en' ? 'Find us' : 'Encuéntranos'}
        </div>
        <div className="flex gap-3">
          <a
            href={SETTINGS.instagram}
            target="_blank" rel="noreferrer"
            className="w-10 h-10 grid place-items-center rounded-full bg-[--hk-mint] border border-white/40 hover:brightness-95 transition"
            aria-label="Instagram" title="Instagram"
          >
            <InstaIcon size={18} color="var(--hk-deeprose)"/>
          </a>
          <a
            href={SETTINGS.youtube}
            target="_blank" rel="noreferrer"
            className="w-10 h-10 grid place-items-center rounded-full bg-[--hk-lavender] border border-white/40 hover:brightness-95 transition"
            aria-label="YouTube" title="YouTube"
          >
            <Youtube size={18} color="var(--hk-deeprose)"/>
          </a>
        </div>
      </div>

      {/* Col 2: Logo GRANDE con círculo bubblegum detrás (centrado total) */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* círculo de fondo */}
          <div
            aria-hidden="true"
            className="absolute rounded-full bg-[--bubblegum]
                       w-[200px] h-[200px] sm:w-[230px] sm:h-[230px]"
          />
          {/* logo encima */}
          <div className="relative w-[360px] sm:w-[420px] aspect-[1.8/1] z-10">
            <Image
              src="/images/logo-white.png"
              alt="Heavenly Knits"
              fill
              className="object-contain drop-shadow"
            />
          </div>
        </div>
      </div>

      {/* Col 3: Newsletter (alineada a la izquierda, mayúsculas) */}
      <div className="flex flex-col justify-center text-left">
        <div className="font-display text-[13.5px] sm:text-[14px] tracking-[0.22em] uppercase mb-2">
          {lang === 'en' ? 'Tied by threads' : 'Unidos por hilos'}
        </div>
        <p className="font-sans footer-copy mb-4">
          {lang === 'en'
            ? 'Soft updates, color stories, and freebies — just the good stitches.'
            : 'Actualizaciones suaves, historias de color y freebies — solo puntadas bonitas.'}
        </p>

        <form
          onSubmit={(e)=>{e.preventDefault(); alert(lang==='en' ? 'Thanks for subscribing!' : '¡Gracias por suscribirte!');}}
          className="font-sans flex flex-col gap-3"
        >
          <input
            type="email"
            required
            placeholder={lang === 'en' ? 'Email' : 'Correo'}
            className="w-full md:w-[420px] h-12 rounded-xl px-4 text-[15px]
                       text-[--hk-deeprose] bg-white placeholder:text-[--hk-deeprose]/70
                       border border-[--bubblegum] focus:outline-none focus:ring-2 focus:ring-[--hk-orange]/40"
          />
          <button
            className="w-full md:w-[420px] h-12 rounded-xl text-[12.5px] font-semibold uppercase tracking-[0.12em]
                       bg-[--hk-deeprose] text-white hover:bg-[--hk-orange] btn-soft"
          >
            {lang === 'en' ? 'Subscribe' : 'Suscríbete'}
          </button>
        </form>
      </div>
    </div>

    {/* Línea inferior (mismo color que “Privacy / Terms”) */}
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
