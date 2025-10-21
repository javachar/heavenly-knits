'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram as InstaIcon, Youtube } from 'lucide-react';

const copyDict = {
  en: {
    title: "We’re crafting something lovely",
    subtitle: "Our website is under construction.",
    ig: "Instagram",
    yt: "YouTube",
    or: "or write us at",
    lang: "ES",
  },
  es: {
    title: "Estamos tejiendo algo lindo",
    subtitle: "Nuestro sitio está en construcción.",
    ig: "Instagram",
    yt: "YouTube",
    or: "o escríbenos a",
    lang: "EN",
  },
};

export default function UnderConstructionPage() {
  const [lang, setLang] = React.useState('en'); // EN por defecto
  const t = copyDict[lang];

  // Splash local (1s) + aparición suave del contenido
  const [booting, setBooting] = React.useState(true);
  React.useEffect(() => {
    const id = setTimeout(() => setBooting(false), 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative min-h-screen grid place-items-center bg-[--hero] text-[--graphite-900]">
      {/* Toggle idioma */}
      <button
        onClick={() => setLang(prev => (prev === 'en' ? 'es' : 'en'))}
        className="absolute top-4 right-4 rounded-full border border-white/40 bg-white/70 backdrop-blur px-3 py-1 text-sm hover:bg-white/90 transition"
        aria-label="Toggle language"
      >
        {t.lang}
      </button>

      {/* Splash blanco con anillo */}
      {booting && (
        <div className="absolute inset-0 z-[40] grid place-items-center bg-white">
          <span className="uc-ring" aria-hidden="true" />
        </div>
      )}

      {/* Contenido */}
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: booting ? 0 : 1, y: booting ? 8 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-xl px-6 text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: booting ? 0 : 1, scale: booting ? 0.98 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mx-auto mb-8 relative w-[220px] sm:w-[260px] md:w-[300px] aspect-[1.8/1]"
        >
          <Image
            src="/images/logo-white.webp"
            alt="Heavenly Knits"
            fill
            priority
            className="object-contain drop-shadow"
            sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 300px"
          />
        </motion.div>

        {/* Texto */}
        <h1 className="font-display font-semibold text-[26px] sm:text-[30px] leading-tight">
          {t.title}
        </h1>
        <p className="mt-2 text-[--graphite-600]">{t.subtitle}</p>

        {/* Botones */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/heavenlyknits.co"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl h-11 px-5 bg-white text-[--graphite-900] border border-white/60 hover:brightness-95 transition"
          >
            <InstaIcon size={18} />
            {t.ig}
          </a>
          <a
            href="https://www.youtube.com/@HeavenlyKnits"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl h-11 px-5 bg-[--graphite-900] text-white hover:opacity-90 transition"
          >
            <Youtube size={18} />
            {t.yt}
          </a>
        </div>

        {/* Email */}
        <p className="mt-5 text-sm text-[--graphite-600]">
          {t.or}{' '}
          <a
            href="mailto:hello@heavenlyknits.com"
            className="underline decoration-white/60 underline-offset-4 hover:opacity-90"
          >
            hello@heavenlyknits.com
          </a>
        </p>

        <p className="mt-6 text-xs text-[--graphite-700]/80">
          Heavenly Knits — Handmade with love
        </p>
      </motion.main>

      {/* estilos locales para el anillo del splash */}
      <style jsx global>{`
        .uc-ring {
          width: 52px;
          height: 52px;
          border-radius: 9999px;
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.06);
          position: relative;
          animation: ucPulse 1.4s ease-out infinite;
        }
        .uc-ring::after {
          content: '';
          position: absolute;
          inset: 10px;
          border-radius: 9999px;
          background: rgba(0, 0, 0, 0.06);
        }
        @keyframes ucPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.06);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(0, 0, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
