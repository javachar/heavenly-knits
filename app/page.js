'use client';
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Phone, Mail, Instagram, Youtube, ArrowRight, Languages, Sparkles, Palette } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

/* =========================
   SETTINGS
========================= */
const SETTINGS = {
  brand: "Heavenly Knits",
  taglineEN: "Handmade with love",
  taglineES: "Hecho a mano con amor",
  phone: "+1 (520) 527-8311",
  email: "hello.heavenlyknits@gmail.com",
  instagram: "https://www.instagram.com/heavenlyknits.co?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  youtube: "https://www.youtube.com/@HeavenlyKnits",
  siteUrl: "https://heavenlyknits.com",
};

const COLORS = {
  pinkBrand: "#F58FB5",
  coral: "#FF8F70",
  mango: "#FFA20D",
  bubblegum: "#FF8CAA",
  raspberry: "#C0356B",
  ivory: "#FFF4EE",
  graphite900: "#2B2B2B",
  graphite600: "#5E5E5E",
  graphite100: "#F5F5F6"
};

const i18n = {
  en: {
    nav: { home: "Home", catalog: "Catalog", portfolio: "Portfolio", about: "About", blog: "Journal", contact: "Contact", fair: "Fair" },
    hero: { title: "Textiles & Knits that feel like home.", ctaCatalog: "Explore Catalog", ctaPortfolio: "See Projects" },
    catalog: { title: "Catalog", badge: "Made by Anguie", buy: "Buy", enquire: "Enquire", colors: "Colors", materials: "Materials", size: "Size" },
    portfolio: { title: "Projects" },
    about: { title: "About Anguie", p1: "Anguie is a Peruvian designer and visual artist based in Georgia. She creates delicate, colorful pieces using colorimetry to craft combinations that feel balanced and warm.", p2: "Heavenly Knits brings artisanal technique to modern living through thoughtful materials and detail." },
    blog: { title: "Journal", empty: "Coming soon: tutorials, fair recaps, and behind the scenes." },
    contact: { title: "Contact", formTitle: "Write us", name: "Name", email: "Email", msg: "Message", send: "Send", alt: "Or reach us at:" },
    fair: { title: "Find us at the Fair", p: "Scan to open the site on your phone and explore the catalog.", cta: "Open Catalog" },
    footer: { rights: "All rights reserved." },
    lang: "ES"
  },
  es: {
    nav: { home: "Inicio", catalog: "Catálogo", portfolio: "Portafolio", about: "Acerca", blog: "Blog", contact: "Contacto", fair: "Feria" },
    hero: { title: "Textiles y tejidos que se sienten como hogar.", ctaCatalog: "Ver catálogo", ctaPortfolio: "Ver proyectos" },
    catalog: { title: "Catálogo", badge: "Hecho por Anguie", buy: "Comprar", enquire: "Encargar", colors: "Colores", materials: "Materiales", size: "Tamaño" },
    portfolio: { title: "Proyectos" },
    about: { title: "Sobre Anguie", p1: "Anguie es diseñadora y artista visual peruana radicada en Georgia. Crea piezas delicadas y coloridas aplicando colorimetría para lograr combinaciones equilibradas y cálidas.", p2: "Heavenly Knits acerca la técnica artesanal a la vida moderna con materiales y detalles pensados." },
    blog: { title: "Blog", empty: "Muy pronto: tutoriales, crónicas de ferias y detrás de cámaras." },
    contact: { title: "Contacto", formTitle: "Escríbenos", name: "Nombre", email: "Correo", msg: "Mensaje", send: "Enviar", alt: "O contáctanos en:" },
    fair: { title: "Encuéntranos en la feria", p: "Escanea para abrir el sitio en tu celular y explorar el catálogo.", cta: "Abrir catálogo" },
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
    img: "/images/blusa-rose.png", // asegúrate que exista en /public/images/
    colors: ["Coral", "Mango", "Ivory"],
    materials: "Cotton thread, bamboo hoop, linen fabric",
    size: "8 in / 20 cm",
    // Enlace estable con variant_id:
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
    checkout: "#", // pon aquí el link de Shopify cuando lo tengas
  },
  {
    id: "hk-003",
    name: { en: "Embroidery Threads – Colorimetry Set", es: "Hilos de Bordado – Set Colorimetría" },
    price: "$24",
    img: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1200&auto=format&fit=crop",
    colors: ["Raspberry", "Pink", "Ivory"],
    materials: "100% cotton – 12 colors",
    size: "12 × 8 m skeins",
    checkout: "#", // pon aquí el link de Shopify cuando lo tengas
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
   PAGE
========================= */
export default function Page() {
  const [lang, setLang] = useState("en");
  const t = i18n[lang];

  const bgGradient = `linear-gradient(135deg,
    color-mix(in srgb, ${COLORS.pinkBrand} 40%, white 60%) 0%,
    color-mix(in srgb, ${COLORS.coral} 45%, white 55%) 50%,
    color-mix(in srgb, ${COLORS.bubblegum} 40%, white 60%) 100%)`;

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`${SETTINGS.brand} — Enquiry`);
    return `mailto:${SETTINGS.email}?subject=${subject}`;
  }, []);

  return (
    <div className="min-h-screen bg-[--ivory] text-[--graphite-900]">
      <style>{`
        :root {
          --pink: #F58FB5;
          --coral: #FF8F70;
          --mango: #FFA20D;
          --bubblegum: #FF8CAA;
          --raspberry: #C0356B;
          --ivory: #FFF8F5;         /* más suave */
          --graphite-900: #222222;  /* más legible */
          --graphite-600: #5B5B5B;
          --graphite-100: #ECECEC;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-[--graphite-100]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full" style={{background: bgGradient}} />
            <div className="leading-tight">
              <div className="font-black text-lg tracking-tight">{SETTINGS.brand}</div>
              <div className="text-xs text-[--graphite-600]">{lang === 'en' ? SETTINGS.taglineEN : SETTINGS.taglineES}</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button className="hover:text-[--raspberry]" onClick={() => scrollToId('home')}>{t.nav.home}</button>
            <button className="hover:text-[--raspberry]" onClick={() => scrollToId('catalog')}>{t.nav.catalog}</button>
            <button className="hover:text-[--raspberry]" onClick={() => scrollToId('portfolio')}>{t.nav.portfolio}</button>
            <button className="hover:text-[--raspberry]" onClick={() => scrollToId('about')}>{t.nav.about}</button>
            <button className="hover:text-[--raspberry]" onClick={() => scrollToId('blog')}>{t.nav.blog}</button>
            <button className="hover:text-[--raspberry]" onClick={() => scrollToId('contact')}>{t.nav.contact}</button>
            <button className="hover:text-[--raspberry]" onClick={() => scrollToId('fair')}>{t.nav.fair}</button>
          </nav>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm hover:bg-[--graphite-100]"
            onClick={() => setLang(prev => prev === 'en' ? 'es' : 'en')}>
            <Languages size={16} /> {t.lang}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: bgGradient }} />
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.6}}>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-[--graphite-600]">
              {lang==='en' ? 'Colorimetry-driven palettes, feminine details, and artisanal technique.' : 'Paletas guiadas por colorimetría, detalles femeninos y técnica artesanal.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollToId('catalog')} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white shadow-sm hover:opacity-95">
                <ShoppingBag size={18}/>{t.hero.ctaCatalog}
              </button>
              <button onClick={() => scrollToId('portfolio')} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border hover:bg-[--graphite-100]">
                <Sparkles size={18}/>{t.hero.ctaPortfolio}
              </button>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.6, delay:.1}} className="md:justify-self-end">
            <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img src="https://images.unsplash.com/photo-1582735729253-f854e6851a89?q=80&w=1400&auto=format&fit=crop" alt="Heavenly Knits" className="w-full h-[360px] object-cover"/>
            </div>
          </motion.div>
        </div>
      </section>

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

                {/* Actions */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={p.checkout && p.checkout !== "#" ? p.checkout : undefined}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-white shadow-sm
                                ${p.checkout && p.checkout !== "#" ? "bg-[--raspberry] hover:opacity-95 cursor-pointer" : "bg-[--graphite-600] opacity-60 cursor-not-allowed"}`}
                    aria-disabled={!p.checkout || p.checkout === "#"}
                  >
                    <ShoppingBag size={16} />
                    {t.catalog.buy}
                  </a>

                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl border hover:bg-[--graphite-100]"
                  >
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
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white hover:opacity-95">{t.contact.send}<ArrowRight size={16}/></button>
            <div className="text-sm text-[--graphite-600] mt-3">{t.contact.alt} <a href={mailtoHref} className="underline">{SETTINGS.email}</a></div>
          </form>
          <div className="bg-white border border-[--graphite-100] rounded-3xl p-6 shadow-md">
            <div className="flex flex-col gap-3">
              <a className="inline-flex items-center gap-3" href={`tel:${SETTINGS.phone}`}><Phone size={18}/> {SETTINGS.phone}</a>
              <a className="inline-flex items-center gap-3" href={`mailto:${SETTINGS.email}`}><Mail size={18}/> {SETTINGS.email}</a>
              <a className="inline-flex items-center gap-3" href={SETTINGS.instagram} target="_blank" rel="noreferrer"><Instagram size={18}/> Instagram</a>
              <a className="inline-flex items-center gap-3" href={SETTINGS.youtube} target="_blank" rel="noreferrer"><Youtube size={18}/> YouTube</a>
              <p className="text-sm text-[--graphite-600]">{lang==='en' ? 'Based in Atlanta, GA' : 'Con base en Atlanta, GA'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fair / QR */}
      <section id="fair" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-6">{t.fair.title}</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white border border-[--graphite-100] rounded-3xl p-8 shadow-md">
          <div className="justify-self-center">
            <QRCodeCanvas value={SETTINGS.siteUrl} size={220} bgColor="#ffffff" fgColor={COLORS.graphite900} includeMargin={true} />
          </div>
          <div>
            <p className="text-[--graphite-600] mb-4">{t.fair.p}</p>
            <a href="#catalog" onClick={(e)=>{e.preventDefault(); document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'});}} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[--raspberry] text-white hover:opacity-95">
              {t.fair.cta} <ArrowRight size={16}/>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[--graphite-100] py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[--graphite-600]">© {new Date().getFullYear()} {SETTINGS.brand}. {t.footer.rights}</div>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
