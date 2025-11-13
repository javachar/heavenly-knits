'use client';

import { useState } from 'react';

const I18N = {
  en: {
    title: 'Join the Heavenly Knits Family 💕',
    subtitle:
      'Be the first to know about new handmade designs, behind-the-scenes stories, and exclusive offers. (No spam, ever!)',
    placeholder: 'you@email.com',
    cta: 'Subscribe',
    finePrint:
      'By subscribing, you agree to receive emails from Heavenly Knits. You can unsubscribe at any time.',
    success: "You're in! Check your inbox for updates ✨",
    invalid: 'Please enter a valid email.',
    error: 'We could not subscribe you. Please try again.',
    netErr: 'Network error. Please try again.',
    sending: 'Sending…',
    langBtn: 'ES',
  },
  es: {
    title: 'Únete a la familia Heavenly Knits 💕',
    subtitle:
      'Sé el primero en enterarte de nuevos diseños, historias detrás de escena y regalitos. (Cero spam.)',
    placeholder: 'tu@email.com',
    cta: 'Suscribirme',
    finePrint:
      'Al suscribirte aceptas recibir emails de Heavenly Knits. Puedes darte de baja cuando quieras.',
    success: '¡Listo! Revisa tu correo para novedades ✨',
    invalid: 'Ingresa un correo válido.',
    error: 'No pudimos suscribirte. Intenta otra vez.',
    netErr: 'Error de red. Intenta otra vez.',
    sending: 'Enviando…',
    langBtn: 'EN',
  },
};

export default function JoinPage() {
  const [lang, setLang] = useState('en'); // EN por defecto
  const t = I18N[lang];

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // {type: 'ok'|'err', text: string}

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    const v = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setMsg({ type: 'err', text: t.invalid });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.ok || data.already)) {
        setMsg({ type: 'ok', text: t.success });
        setEmail('');
      } else {
        setMsg({ type: 'err', text: data?.error || t.error });
      }
    } catch {
      setMsg({ type: 'err', text: t.netErr });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[60vh] grid place-items-center px-4 py-12">
      {/* Toggle ES/EN arriba a la derecha */}
      <div className="fixed top-4 right-4">
        <button
          onClick={() => setLang((p) => (p === 'en' ? 'es' : 'en'))}
          className="px-3.5 py-2 rounded-full border border-[--graphite-200] text-sm hover:bg-white/60"
          aria-label="Toggle language"
          title="Language"
        >
          {t.langBtn}
        </button>
      </div>

      <div className="max-w-lg w-full bg-white border border-[--graphite-100] rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-[--graphite-600] mb-6">{t.subtitle}</p>

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
            {loading ? t.sending : t.cta}
          </button>
        </form>

        {msg && (
          <div
            className={`mt-4 text-sm ${
              msg.type === 'ok' ? 'text-green-700' : 'text-red-600'
            }`}
          >
            {msg.text}
          </div>
        )}

        <p className="mt-4 text-xs text-[--graphite-500]">{t.finePrint}</p>
      </div>
    </main>
  );
}
