'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Languages, Instagram as InstaIcon, Youtube } from 'lucide-react';

const SETTINGS = {
  brand: 'Heavenly Knits',
  instagram: 'https://www.instagram.com/heavenlyknits.co',
  youtube: 'https://www.youtube.com/@HeavenlyKnits',
};

const i18n = {
  en: {
    nav: { home: 'Home', catalog: 'Catalog', about: 'About', instagram: 'Instagram', contact: 'Contact', join: 'Join' },
    title: 'Join the Heavenly Knits Family 💕',
    desc: 'Be the first to know about new handmade designs, behind-the-scenes stories, and freebies. No spam.',
    placeholder: 'you@email.com',
    btn: 'Subscribe',
    sending: 'Sending…',
    ok: "You're in! Check your inbox ✨",
    errInvalid: 'Please enter a valid email.',
    errNet: 'Network error. Try again.',
    legal: 'By subscribing you agree to receive emails from Heavenly Knits. You can unsubscribe anytime.',
    langBtn: 'ES',
  },
  es: {
    nav: { home: 'Inicio', catalog: 'Catálogo', about: 'Acerca', instagram: 'Instagram', contact: 'Contacto', join: 'Únete' },
    title: 'Únete a la familia Heavenly Knits 💕',
    desc: 'Sé el primero en enterarte de nuevos diseños, historias detrás de escena y regalitos. Cero spam.',
    placeholder: 'tu@email.com',
    btn: 'Suscribirme',
    sending: 'Enviando…',
    ok: '¡Listo! Revisa tu correo ✨',
    errInvalid: 'Ingresa un correo válido.',
    errNet: 'Error de red. Intenta de nuevo.',
    legal: 'Al suscribirte aceptas recibir emails de Heavenly Knits. Puedes darte de baja cuando quieras.',
    langBtn: 'EN',
  },
};

export default function JoinPage() {
  // English by default
  const [lang, setLang] = useState('en');
  const t = i18n[lang];

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { type: 'ok'|'err', text: string }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    const v = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setMsg({ type: 'err', text: t.errInvalid });
      return;
    }

    setLoading(true);
    try {
      // Brevo handler -> /app/api/join/route.js
      const r = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      });

      // intenta parsear JSON (si la ruta devolvió HTML por error, esto lanzará)
      const j = await r.json().catch(() => ({}));

      if (r.ok && j?.ok) {
        setMsg({ type: 'ok', text: t.ok });
        setEmail('');
      } else {
        setMsg({ type: 'err', text: j?.error || t.errNet });
      }
    } catch {
      setMsg({ type: 'err', text: t.errNet });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[--hero] text-[--graphite-900]">
      {/* soft veil like the hero */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'var(--brand-bg)', opacity: 0.08 }} />

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-sm">
        <div className="relative">
          <div className="max-w-6xl mx-auto h-[72px] px-4 flex items-center gap-4 relative">
            {/* BRAND */}
            <Link href="/" className="flex items-center gap-3 shrink-0 z-10">
              <span className="font-display font-semibold text-[20px] sm:text-[22px] md:text-[24px] text-[--brand-rose]">
                {SETTINGS.brand}
              </span>
            </Link>

            {/* centered NAV (anchors back to /) */}
            <nav className="hidden md:flex items-center md:gap-6 lg:gap-8 text-[15px] normal-case tracking-wide font-sans absolute left-1/2 -translate-x-1/2">
              <Link href="/#home" className="nav-link text-[--graphite-600] hover:text-[--graphite-900]">{t.nav.home}</Link>
              <Link href="/#catalog" className="nav-link text-[--graphite-600] hover:text-[--graphite-900]">{t.nav.catalog}</Link>
              <Link href="/#about" className="nav-link text-[--graphite-600] hover:text-[--graphite-900]">{t.nav.about}</Link>
              <Link href="/#instagram" className="nav-link text-[--graphite-600] hover:text-[--graphite-900]">{t.nav.instagram}</Link>
              <Link href="/#contact" className="nav-link text-[--graphite-600] hover:text-[--graphite-900]">{t.nav.contact}</Link>
            </nav>

            {/* Lang switch + Join */}
            <button
              className="ml-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[--graphite-100] text-sm hover:bg-white/50 font-sans z-10"
              onClick={() => setLang(prev => (prev === 'en' ? 'es' : 'en'))}
              aria-label="Toggle language"
            >
              <Languages size={16} /> {t.langBtn}
            </button>

            <Link
              href="/join"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--hk-deeprose] text-white text-sm font-semibold shadow-sm hover:brightness-95 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--hk-deeprose]/30"
            >
              {t.nav.join}
            </Link>
          </div>

          {/* mobile menu */}
          <div className="md:hidden overflow-x-auto px-4 pb-2 -mt-1 relative z-10">
            <div className="flex gap-5 text-[14px] normal-case tracking-wide text-[--graphite-600] font-sans">
              <Link href="/#home" className="nav-link hover:text-[--graphite-900]">{t.nav.home}</Link>
              <Link href="/#catalog" className="nav-link hover:text-[--graphite-900]">{t.nav.catalog}</Link>
              <Link href="/#about" className="nav-link hover:text-[--graphite-900]">{t.nav.about}</Link>
              <Link href="/#instagram" className="nav-link hover:text-[--graphite-900]">{t.nav.instagram}</Link>
              <Link href="/#contact" className="nav-link hover:text-[--graphite-900]">{t.nav.contact}</Link>
              <Link href="/join" className="inline-flex items-center rounded-full px-3.5 py-1.5 bg-[--hk-deeprose] text-white text-[12.5px] font-semibold">
                {t.nav.join}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="min-h-[calc(100svh-72px)] grid place-items-center px-4 py-10">
        <div className="max-w-lg w-full bg-white border border-[--graphite-100] rounded-3xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
          <p className="text-[--graphite-600] mb-6">{t.desc}</p>

          <form onSubmit={onSubmit} className="flex gap-3">
            <input
              type="email"
              required
              placeholder={t.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 rounded-xl px-4 border border-[--graphite-200] focus:outline-none focus:ring-2 focus:ring-[--hk-deeprose]/30"
            />
            <button
              disabled={loading}
              className="h-12 px-5 rounded-xl bg-[--hk-deeprose] text-white font-semibold disabled:opacity-60"
            >
              {loading ? t.sending : t.btn}
            </button>
          </form>

          {msg && (
            <div className={`mt-4 text-sm ${msg.type === 'ok' ? 'text-green-700' : 'text-red-600'}`}>
              {msg.text}
            </div>
          )}

          <p className="mt-4 text-xs text-[--graphite-500]">{t.legal}</p>

          <div className="mt-6 flex items-center gap-3 text-[--graphite-600]">
            <a href={SETTINGS.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[--graphite-900]">
              <InstaIcon size={16} /> Instagram
            </a>
            <span className="opacity-40">•</span>
            <a href={SETTINGS.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[--graphite-900]">
              <Youtube size={16} /> YouTube
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
