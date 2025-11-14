'use client';

import Head from 'next/head';
import { useState } from 'react';

// Links de marca (para los íconos de abajo)
const SETTINGS = {
  instagram: 'https://www.instagram.com/heavenlyknits.co',
  youtube: 'https://www.youtube.com/@HeavenlyKnits',
};

// Textos EN/ES (EN por defecto)
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
    legal:
      'By subscribing, you agree to receive emails from Heavenly Knits. You can unsubscribe anytime.',
    instagram: 'Instagram',
    youtube: 'YouTube',
    lang: 'ES',
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
    legal:
      'Al suscribirte aceptas recibir emails de Heavenly Knits. Puedes darte de baja cuando quieras.',
    instagram: 'Instagram',
    youtube: 'YouTube',
    lang: 'EN',
  },
};

export default function JoinPage() {
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
    <>
      {/* Meta para NO indexar esta página */}
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://heavenlyknits.com/" />

        {/* Poppins desde Google */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Recoleta Alt Semibold desde /public (no import de módulo) */}
        <style>{`
          @font-face {
            font-family: 'RecoletaAlt';
            src: url('/fonts/recoleta-alt-semibold.otf') format('opentype');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }
          :root {
            --join-card-shadow: 0 14px 28px rgba(0,0,0,0.06), 0 8px 12px rgba(0,0,0,0.04);
          }
          .title-recoleta { font-family: 'RecoletaAlt', ui-serif, Georgia, serif; }
          .copy-poppins { font-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; }
        `}</style>
      </Head>

      {/* Fondo estilo hero (sin navbar) */}
      <div
        className="min-h-screen text-[--graphite-900]"
        style={{
          background:
            'linear-gradient(180deg, var(--brand-bg) 0%, rgba(255,255,255,0) 40%), var(--hero)',
        }}
      >
        {/* Toggle de idioma discreto (arriba-derecha) */}
        <button
          onClick={() => setLang((p) => (p === 'en' ? 'es' : 'en'))}
          className="fixed top-4 right-4 z-10 inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/60 bg-white/70 backdrop-blur text-sm hover:bg-white shadow"
          aria-label="Toggle language"
        >
          {t.lang}
        </button>

        {/* Contenido centrado */}
        <main className="min-h-[calc(100svh-0px)] grid place-items-center px-4 py-10">
          <div
            className="max-w-lg w-full bg-white border border-[--graphite-100] rounded-3xl p-8"
            style={{ boxShadow: 'var(--join-card-shadow)' }}
          >
            <h1 className="title-recoleta text-[24px] sm:text-[26px] font-semibold mb-2">
              {t.title}
            </h1>

            <p className="copy-poppins text-[--graphite-700] text-[15px] leading-relaxed mb-6">
              {t.desc}
            </p>

            <form onSubmit={onSubmit} className="copy-poppins flex gap-3">
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
                className="h-12 px-5 rounded-xl bg-[--hk-deeprose] text-white font-semibold disabled:opacity-60 hover:brightness-95 active:scale-[0.99]"
              >
                {loading ? t.sending : t.btn}
              </button>
            </form>

            {msg && (
              <div
                className={`copy-poppins mt-4 text-sm ${
                  msg.type === 'ok' ? 'text-green-700' : 'text-red-600'
                }`}
              >
                {msg.text}
              </div>
            )}

            <p className="copy-poppins mt-4 text-xs text-[--graphite-500]">{t.legal}</p>

            <div className="copy-poppins mt-6 flex items-center gap-3 text-[--graphite-600]">
              <a
                href={SETTINGS.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[--graphite-900]"
              >
                {t.instagram}
              </a>
              <span className="opacity-40">•</span>
              <a
                href={SETTINGS.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[--graphite-900]"
              >
                {t.youtube}
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
