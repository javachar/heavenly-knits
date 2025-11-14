'use client';

import { useState } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import { Languages, Instagram as InstaIcon, Youtube } from 'lucide-react';

// ===== Fuentes =====
const recoleta = localFont({
  src: [
    {
      path: '/fonts/RecoletaAlt-Semibold.woff2', // <-- asegúrate del nombre
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-recoleta',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500','600'],
  variable: '--font-poppins',
  display: 'swap',
});

// ===== Config & i18n =====
const SETTINGS = {
  brand: 'Heavenly Knits',
  instagram: 'https://www.instagram.com/heavenlyknits.co',
  youtube: 'https://www.youtube.com/@HeavenlyKnits',
};

const i18n = {
  en: {
    title: 'Join the Heavenly Knits Family 💕',
    desc: 'Be the first to know about new handmade designs, behind-the-scenes stories, and freebies. No spam.',
    placeholder: 'you@email.com',
    btn: 'Subscribe',
    sending: 'Sending…',
    ok: "You're in! Check your inbox ✨",
    errInvalid: 'Please enter a valid email.',
    errNet: 'Network error. Try again.',
    legal: 'By subscribing you agree to receive emails from Heavenly Knits. You can unsubscribe anytime.',
  },
  es: {
    title: 'Únete a la familia Heavenly Knits 💕',
    desc: 'Sé el primero en enterarte de nuevos diseños, historias detrás de escena y regalitos. Cero spam.',
    placeholder: 'tu@email.com',
    btn: 'Suscribirme',
    sending: 'Enviando…',
    ok: '¡Listo! Revisa tu correo ✨',
    errInvalid: 'Ingresa un correo válido.',
    errNet: 'Error de red. Intenta de nuevo.',
    legal: 'Al suscribirte aceptas recibir emails de Heavenly Knits. Puedes darte de baja cuando quieras.',
  },
};

export default function JoinPage() {
  const [lang, setLang] = useState('en'); // EN por defecto
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
      const r = await fetch('/api/brevo/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      });
      const j = await r.json();
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
    <div
      className={`${poppins.variable} ${recoleta.variable} min-h-screen bg-[--hero] text-[--graphite-900]`}
      style={{ fontFamily: 'var(--font-poppins), ui-sans-serif, system-ui' }}
    >
      {/* velo suave como el hero */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'var(--brand-bg)', opacity: 0.08 }} />

      {/* Botón idioma (no navbar) */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={() => setLang((p) => (p === 'en' ? 'es' : 'en'))}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[--graphite-100] bg-white/70 backdrop-blur text-sm hover:bg-white shadow-sm"
          aria-label="Toggle language"
        >
          <Languages size={16} /> {lang === 'en' ? 'ES' : 'EN'}
        </button>
      </div>

      {/* Contenido centrado */}
      <main className="min-h-[calc(100svh)] grid place-items-center px-4 py-10">
        <div className="max-w-lg w-full bg-white border border-[--graphite-100] rounded-3xl p-8 shadow-sm">
          {/* Título con Recoleta */}
          <h1
            className="mb-2"
            style={{
              fontFamily: 'var(--font-recoleta), ui-serif, Georgia',
              fontWeight: 600,
              fontSize: 'clamp(28px, 2.2vw, 36px)',
              letterSpacing: '-0.01em',
            }}
          >
            {t.title}
          </h1>

          {/* Descripción con Poppins */}
          <p className="text-[--graphite-600] mb-6">
            {t.desc}
          </p>

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

          <p className="mt-4 text-xs text-[--graphite-500]">
            {t.legal}
          </p>

          {/* Social (opcional) */}
          <div className="mt-6 flex items-center gap-3 text-[--graphite-600]">
            <a href={SETTINGS.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[--graphite-900]">
              <InstaIcon size={16} /> Instagram
            </a>
            <span className="opacity-40">•</span>
            <a href={SETTINGS.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[--graphite-900]">
              <Youtube size={16} /> YouTube
            </a>
          </div>

          {/* Link de regreso (sin navbar) */}
          <div className="mt-6 text-sm">
            <Link href="/" className="underline hover:opacity-80">
              ← {lang === 'en' ? 'Back to home' : 'Volver al inicio'}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
