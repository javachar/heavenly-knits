'use client';
import React from "react";
import Image from "next/image";
import { Instagram as InstaIcon, Youtube, Mail, Languages } from "lucide-react";

const SETTINGS = {
  brand: "Heavenly Knits",
  email: "hello@heavenlyknits.com",
  instagram: "https://www.instagram.com/heavenlyknits.co",
  youtube: "https://www.youtube.com/@HeavenlyKnits",
};

export default function UnderConstructionPage() {
  const [lang, setLang] = React.useState<"en" | "es">("en");

  const t = lang === "en"
    ? {
        title: "We’re crafting something lovely",
        subtitle: "Our website is under construction.",
        ig: "Instagram",
        yt: "YouTube",
        or: "or write us at",
        brandLine: "Heavenly Knits — Handmade with love",
        langToggle: "ES",
      }
    : {
        title: "Estamos tejiendo algo bonito",
        subtitle: "Nuestro sitio está en construcción.",
        ig: "Instagram",
        yt: "YouTube",
        or: "o escríbenos a",
        brandLine: "Heavenly Knits — Handmade with love",
        langToggle: "EN",
      };

  return (
    <div className="min-h-screen w-full grid place-items-center bg-[--hero] text-[--graphite-900]">
      <button
        onClick={() => setLang((p) => (p === "en" ? "es" : "en"))}
        aria-label="Toggle language"
        className="fixed top-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 backdrop-blur px-3 py-1.5 text-sm hover:bg-white/80"
      >
        <Languages size={16} />
        {t.langToggle}
      </button>

      <div className="w-full max-w-[760px] px-6">
        {/* Logo con proporciones suaves */}
        <div className="mx-auto mb-8 sm:mb-10 relative w-[220px] sm:w-[260px] md:w-[300px] aspect-[1.8/1]">
          <Image
            src="/images/logo-white.webp"
            alt="Heavenly Knits"
            fill
            priority
            fetchPriority="high"
            className="object-contain drop-shadow"
            sizes="(max-width:640px) 220px,(max-width:768px) 260px, 300px"
          />
        </div>

        <h1 className="text-center font-display font-semibold tracking-tight text-[24px] sm:text-[28px] md:text-[32px]">
          {t.title}
        </h1>
        <p className="mt-2 text-center font-sans text-[15px] sm:text-[16px] text-[--graphite-900]/80">
          {t.subtitle}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={SETTINGS.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 bg-white text-[--graphite-900] border border-white/70 hover:brightness-95"
          >
            <InstaIcon size={18} />
            {t.ig}
          </a>
          <a
            href={SETTINGS.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 bg-[--graphite-900] text-white hover:opacity-90"
          >
            <Youtube size={18} />
            {t.yt}
          </a>
        </div>

        <p className="mt-5 text-center text-[13.5px] sm:text-[14px] text-[--graphite-900]/75">
          {t.or}{" "}
          <a
            href={`mailto:${SETTINGS.email}`}
            className="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
          >
            <Mail size={14} />
            {SETTINGS.email}
          </a>
        </p>

        <p className="mt-6 text-center text-[12.5px] text-[--graphite-900]/65">
          {t.brandLine}
        </p>
      </div>
    </div>
  );
}
