'use client';

import Head from 'next/head';
import { useState } from 'react';

// Links de marca
const SETTINGS = {
  instagram: 'https://www.instagram.com/heavenlyknits.co',
  youtube: 'https://www.youtube.com/@HeavenlyKnits',
  tiktok: 'https://www.tiktok.com/@heavenly.knits',
};

// Textos EN/ES
const i18n = {
  en: {
    title: 'Join the Heavenly Knits Family 💕',
    desc: 'Get updates about new Heavenly Knits drops, product launches, and special discounts. No spam, just cozy news.',
    placeholder: 'you@email.com',
    button: 'Subscribe',
    buttonLoading: 'Subscribing…',
    ok: "You’re in! Check your inbox 💌",
    already: "You’re already on our list with this email 💌",
    errInvalid: 'Please check your email address and try again.',
    errNet: 'Something went wrong. Please try again.',
    consent:
      'By subscribing, you agree to receive emails from Heavenly Knits. You can unsubscribe anytime.',
    instagram: 'Instagram',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    socialTitle: 'Follow Heavenly Knits',
    langToggleLabel: 'ES',
    langToggleAria: 'View this page in Spanish',
  },
  es: {
    title: 'Únete a la familia Heavenly Knits 💕',
    desc: 'Recibe novedades de Heavenly Knits: nuevos productos, lanzamientos y descuentos especiales. Sin spam, solo noticias acogedoras.',
    placeholder: 'tu@email.com',
    button: 'Suscribirme',
    buttonLoading: 'Enviando…',
    ok: '¡Listo! Ya estás en la lista 💌',
    already: 'Este correo ya está suscrito a Heavenly Knits 💌',
    errInvalid: 'Revisa tu correo electrónico e inténtalo de nuevo.',
    errNet: 'Algo salió mal. Inténtalo de nuevo.',
    consent:
      'Al suscribirte aceptas recibir correos de Heavenly Knits. Puedes darte de baja cuando quieras.',
    instagram: 'Instagram',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    socialTitle: 'Síguenos en redes',
    langToggleLabel: 'EN',
    langToggleAria: 'Ver esta página en inglés',
  },
};

export default function JoinPage() {
  const [lang, setLang] = useState('en');
  const t = i18n[lang];

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { type: 'ok' | 'err', text: string }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    const v = email.trim().toLowerCase();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!re.test(v)) {
      setMsg({ type: 'err', text: t.errInvalid });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok && data && data.ok) {
        // 👉 Diferenciar nuevo vs ya suscrito
        if (data.already) {
          setMsg({ type: 'ok', text: t.already });
        } else {
          setMsg({ type: 'ok', text: t.ok });
        }
        setEmail('');
      } else {
        setMsg({
          type: 'err',
          text: (data && data.error) || t.errNet,
        });
      }
    } catch {
      setMsg({ type: 'err', text: t.errNet });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta
          name="description"
          content="Email list for Heavenly Knits — handmade yarn accessories and cozy designs."
        />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://heavenlyknits.com/join" />
      </Head>

      {/* Fondo rosa suave */}
      <div
        className="min-h-screen text-[--graphite-900]"
        style={{
          background:
            'linear-gradient(180deg, #ffd5e6 0%, #ffeaf2 45%, #ffffff 100%)',
        }}
      >
        {/* Toggle idioma (arriba derecha) */}
        <button
          type="button"
          onClick={() => setLang((prev) => (prev === 'en' ? 'es' : 'en'))}
          className="fixed top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-medium text-[--graphite-600] shadow-sm backdrop-blur hover:bg-white"
          aria-label={t.langToggleAria}
        >
          {t.langToggleLabel}
        </button>

        {/* Contenido centrado */}
        <main className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur-md sm:p-8">
            <h1 className="mb-3 text-center text-2xl font-semibold tracking-tight text-[--graphite-900] sm:text-3xl">
              {t.title}
            </h1>

            <p className="mb-6 text-center text-sm text-[--graphite-600] sm:text-base">
              {t.desc}
            </p>

            <form onSubmit={onSubmit} className="space-y-3">
              <label className="block text-xs font-medium text-[--graphite-600]">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="mt-1 w-full rounded-full border border-pink-100 bg-white px-4 py-2.5 text-sm outline-none ring-0 transition focus:border-[--pinkBrand] focus:ring-2 focus:ring-[--pinkBrand]/40"
                  required
                />
              </label>

              {msg && (
                <p
                  className={`text-xs ${
                    msg.type === 'ok'
                      ? 'text-emerald-600'
                      : 'text-rose-600'
                  }`}
                >
                  {msg.text}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-[--pinkBrand] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[--raspberry] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? t.buttonLoading : t.button}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] leading-snug text-[--graphite-600]">
              {t.consent}
            </p>

            {/* Redes sociales */}
            <div className="mt-7">
              <p className="text-center text-[11px] font-semibold tracking-[0.18em] text-[--graphite-500] uppercase">
                {t.socialTitle}
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                {/* Instagram */}
                <a
                  href={SETTINGS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-[--bubblegum] px-4 py-2.5 text-sm font-semibold text-[--graphite-900] shadow-sm hover:bg-[--pinkBrand] hover:shadow-md transition"
                >
                  {t.instagram}
                </a>

                {/* YouTube */}
                <a
                  href={SETTINGS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-[#ff7a7a] bg-white px-4 py-2.5 text-sm font-semibold text-[#d62828] shadow-sm hover:bg-[#ffecec] hover:shadow-md transition"
                >
                  {t.youtube}
                </a>

                {/* TikTok */}
                <a
                  href={SETTINGS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center rounded-full border border-[#25f4ee] bg-[--graphite-900] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg:black hover:shadow-md transition"
                >
                  {t.tiktok}
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
