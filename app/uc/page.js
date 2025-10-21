'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Instagram, Youtube } from 'lucide-react';

export default function UCPage() {
  const [lang, setLang] = useState('en'); // EN por defecto
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 700); // splash corto y suave
    return () => clearTimeout(t);
  }, []);

  const copy = lang === 'en'
    ? {
        heading: "We’re crafting something lovely",
        sub: "Our website is under construction.",
        ig: "Instagram",
        yt: "YouTube",
        or: "or write us at",
        toggle: "ES",
      }
    : {
        heading: "Estamos tejiendo algo bonito",
        sub: "Nuestro sitio está en construcción.",
        ig: "Instagram",
        yt: "YouTube",
        or: "o escríbenos a",
        toggle: "EN",
      };

  return (
    <div className="relative min-h-screen grid place-items-center bg-[--hero] text-[--graphite-900]">
      {/* Splash/fade-in */}
      <div
        className={`transition-opacity duration-500 ease-out ${
          booting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Toggle idioma */}
        <button
          onClick={() => setLang((p) => (p === 'en' ? 'es' : 'en'))}
          className="absolute top-4 right-4 rounded-full border border-white/50 bg-white/70 backdrop-blur px-3 py-1 text-sm hover:bg-white"
          aria-label="Toggle language"
        >
          {copy.toggle}
        </button>

        <div className="w-full max-w-xl px-6 text-center mx-auto">
          {/* LOGO GRANDE (ajustado) */}
          <div className="mx-auto mb-8 relative w-40 sm:w-52 md:w-64 lg:w-72 aspect-[1.9/1]">
            <Image
              src="/images/logo-white.webp"
              alt="Heavenly Knits"
              fill
              priority
              className="object-contain drop-shadow-[0_1px_0_rgba(0,0,0,0.06)]"
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 256px, 288px"
            />
          </div>

          {/* TÍTULO y SUB */}
          <h1 className="font-display text-[22px] sm:text-[26px] md:text-[28px] font-semibold tracking-tight">
            {copy.heading}
          </h1>
          <p className="mt-2 text-[--graphite-900]/75 text-[14.5px]">
            {copy.sub}
          </p>

          {/* BOTONES */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://www.instagram.com/heavenlyknits.co"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl h-11 px-5 bg-white text-[--graphite-900] border border-white/60 hover:brightness-95"
            >
              <Instagram size={16} />
              {copy.ig}
            </a>
            <a
              href="https://www.youtube.com/@HeavenlyKnits"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl h-11 px-5 bg-[--graphite-900] text-white hover:opacity-90"
            >
              <Youtube size={16} />
              {copy.yt}
            </a>
          </div>

          {/* EMAIL */}
          <p className="mt-4 text-[13.5px] text-[--graphite-900]/75">
            {copy.or}{' '}
            <a
              href="mailto:hello@heavenlyknits.com"
              className="underline decoration-white/60 underline-offset-4 hover:opacity-90"
            >
              hello@heavenlyknits.com
            </a>
          </p>

          {/* Créditos pequeños */}
          <p className="mt-6 text-[12px] text-[--graphite-900]/65">
            Heavenly Knits — Handmade with love
          </p>
        </div>
      </div>
    </div>
  );
}
