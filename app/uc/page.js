// app/uc/page.js
"use client";
import Image from "next/image";
import { Instagram, Youtube, Mail } from "lucide-react";
import Link from "next/link";

export default function UnderConstructionPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-[--hero] text-[--graphite-900] px-6 py-16">
      <div className="w-full max-w-[720px] text-center">
        {/* Logo: proporcionado y sutil */}
        <div className="mx-auto mb-8 relative w-[260px] sm:w-[320px] md:w-[360px] aspect-square">
          <Image
            src="/images/logo-white.webp"
            alt="Heavenly Knits"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 360px"
          />
        </div>

        {/* Titular y subtítulo más elegantes */}
        <h1 className="font-display font-semibold text-[28px] sm:text-[32px] leading-tight">
          We’re crafting something lovely
        </h1>
        <p className="mt-2 text-[15px] sm:text-[16px] text-[--graphite-900]/85">
          Our website is under construction.
        </p>

        {/* Botones */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/heavenlyknits.co"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white text-[--graphite-900] border border-white/60 hover:brightness-95"
          >
            <Instagram size={18} /> Instagram
          </a>
          <a
            href="https://www.youtube.com/@HeavenlyKnits"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-[--graphite-900] text-white hover:opacity-90"
          >
            <Youtube size={18} /> YouTube
          </a>
        </div>

        {/* Email */}
        <p className="mt-5 text-[14px] text-[--graphite-900]/80">
          or write us at{" "}
          <a
            href="mailto:hello@heavenlyknits.com"
            className="underline underline-offset-4"
          >
            hello@heavenlyknits.com
          </a>
        </p>

        <p className="mt-8 text-[12.5px] tracking-wide">
          Heavenly Knits — Handmade with love
        </p>
      </div>
    </main>
  );
}
