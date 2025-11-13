"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

const i18n = {
  en: {
    title: "Join the Heavenly Knits Family 💕",
    subtitle:
      "Be the first to know about new handmade designs, behind-the-scenes stories, and exclusive offers. (No spam, ever!)",
    email: "Your email",
    button: "Subscribe",
    success: "You're in! Subscription completed. 🧡",
    exists: "That email is already subscribed. Thank you! 🧵",
    invalid: "Please enter a valid email.",
    legal:
      "By subscribing, you agree to receive emails from Heavenly Knits. You can unsubscribe at any time.",
    langShort: "ES",
    sending: "Sending...",
  },
  es: {
    title: "Únete a la familia Heavenly Knits 💕",
    subtitle:
      "Sé el primero en enterarte de nuevos diseños hechos a mano, historias detrás de escena y ofertas exclusivas. (Cero spam).",
    email: "Tu email",
    button: "Suscribirme",
    success: "¡Listo! Suscripción completada. 🧡",
    exists: "Ese correo ya está suscrito. ¡Gracias! 🧵",
    invalid: "Ingresa un correo válido.",
    legal:
      "Al suscribirte, aceptas recibir correos de Heavenly Knits. Puedes darte de baja cuando quieras.",
    langShort: "EN",
    sending: "Enviando...",
  },
};

export default function JoinPage() {
  // EN forzado por defecto; si existe preferencia guardada, la usamos
  const [lang, setLang] = useState("en");
  const t = i18n[lang];

  useEffect(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem("hk_lang");
    setLang(saved === "es" || saved === "en" ? saved : "en"); // EN por defecto
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  function toggleLang() {
    setLang((p) => {
      const next = p === "en" ? "es" : "en";
      if (typeof window !== "undefined") localStorage.setItem("hk_lang", next);
      return next;
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(t.invalid);
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await r.json();
      if (j.ok) {
        setMsg(j.status === "exists" ? t.exists : t.success);
        setEmail("");
      } else {
        setErr(j.error || "Error");
      }
    } catch (e2) {
      setErr(e2?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] grid place-items-center px-4">
      {/* Botón flotante arriba-derecha SIEMPRE visible */}
      <button
        onClick={toggleLang}
        className="fixed top-4 right-4 inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-neutral-200 bg-white/90 backdrop-blur hover:bg-white text-sm shadow-sm"
        aria-label="Toggle language"
        title="Toggle language"
      >
        <Languages size={16} /> {t.langShort}
      </button>

      {/* Card */}
      <div className="w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-sm text-neutral-600 mb-5">{t.subtitle}</p>

        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full sm:flex-1 rounded-xl border border-neutral-300 px-4"
            required
          />
          <button
            disabled={loading}
            className={`h-11 px-5 rounded-xl text-white ${
              loading ? "bg-neutral-400" : "bg-[--hk-deeprose] hover:brightness-95"
            } transition`}
          >
            {loading ? t.sending : t.button}
          </button>
        </form>

        {msg && <p className="mt-3 text-green-700 text-sm">{msg}</p>}
        {err && <p className="mt-3 text-red-600 text-sm">{err}</p>}

        <p className="mt-4 text-xs text-neutral-500">{t.legal}</p>
      </div>
    </main>
  );
}
