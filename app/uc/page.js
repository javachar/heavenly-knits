// app/uc/page.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Instagram, Youtube } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const copyDict = {
  en: {
    title: "We’re crafting something lovely",
    subtitle: "Our website is under construction.",
    ig: "Instagram",
    yt: "YouTube",
    or: "or write us at",
    brandLine: "Heavenly Knits — Handmade with love",
    lang: "ES",
  },
  es: {
    title: "Estamos tejiendo algo lindo",
    subtitle: "Nuestro sitio está en construcción.",
    ig: "Instagram",
    yt: "YouTube",
    or: "o escríbenos a",
    brandLine: "Heavenly Knits — Hecho a mano con amor",
    lang: "EN",
  },
};

export default function UnderConstructionPage() {
  const [lang, setLang] = useState('en');
  const [ready, setReady] = useState(false);
  const t = copyDict[lang];

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className="min-h-screen grid place-items-center bg-[--hero] text-[--graphite-900]"
      aria-label="Under construction screen"
    >
      {/* Toggle idioma */}
      <button
        onClick={() => setLang(prev => (prev === 'en' ? 'es' : 'en'))}
        className="fixed top-4 right-4 rounded-full border border-[--graphite-100] bg-white/80 backdrop-blur px-3 py-1 text-sm hover:bg-white"
        aria-label="Toggle language"
      >
        {t.lang}
      </button>

      <div
        className={`w-full max-w-[860px] px-6 text-center transition-all duration-500 ease-out
                    ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        {/* LOGO */}
        <div className="mx-auto mb-8 sm:mb-10">
          <div
            className="relative mx-auto w-[320px] sm:w-[380px] md:w-[460px] lg:w-[560px] aspect-[1.8/1]"
            aria-hidden="true"
          >
            <Image
              src="/images/logo-white.webp"
              alt="Heavenly Knits"
              fill
              priority
              className="object-contain drop-shadow"
              sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, (max-width: 1024px) 460px, 560px"
            />
          </div>
        </div>

        {/* Texto */}
        <h1 className="font-display font-semibold tracking-tight text-[26px] sm:text-[30px] md:text-[34px]">
          {t.title}
        </h1>
        <p className="mt-2 text-[--graphite-900]/80 text-[15px] sm:text-[16px]">
          {t.subtitle}
        </p>

        {/* Botones */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/heavenlyknits.co"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl h-11 px-5
                       bg-white text-[--graphite-900] border border-white/70 hover:brightness-95"
          >
            <Instagram size={16} />
            {t.ig}
          </a>
          <a
            href="https://www.youtube.com/@HeavenlyKnits"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl h-11 px-5
                       bg-[--graphite-900] text-white hover:opacity-90"
          >
            <Youtube size={16} />
            {t.yt}
          </a>
        </div>

        {/* Email */}
        <p className="mt-4 text-sm text-[--graphite-900]/75">
          {t.or}{' '}
          <a
            href="mailto:hello@heavenlyknits.com"
            className="underline decoration-[--graphite-900]/30 underline-offset-2 hover:opacity-90"
          >
            hello@heavenlyknits.com
          </a>
        </p>

        {/* Línea de marca */}
        <p className="mt-6 text-xs text-[--graphite-900]/60">{t.brandLine}</p>
      </div>

      {/* Métricas de la pantalla UC */}
      <Analytics />
    </div>
  );
}
