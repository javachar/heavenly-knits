// app/layout.js
import "./globals.css";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const recoleta = localFont({
  src: [{ path: "../public/fonts/recoleta-alt-semibold.otf", weight: "600", style: "normal" }],
  variable: "--font-recoleta",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://heavenlyknits.com"),
  title: { default: "Heavenly Knits — Handmade with love", template: "%s • Heavenly Knits" },
  description:
    "Heavenly Knits: textiles y bordados hechos a mano con amor. Paletas guiadas por colorimetría y detalles artesanales.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3" },
      { url: "/icon-32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png?v=3", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=3", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180" }],
    shortcut: ["/favicon.ico?v=3"],
  },
};

// evita el warning de Next: themeColor va en viewport
export const viewport = { themeColor: "#FFFFFF" };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${recoleta.variable} ${poppins.variable}`}
      style={{ background: "#fff", colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        {/* CSS crítico inline: asegura primer paint blanco y tema claro */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { color-scheme: light only; }
              html, body, #__next, [data-nextjs-root] { background:#fff !important; }
              @media (prefers-color-scheme: dark) {
                html, body { background:#fff !important; }
              }
            `,
          }}
        />
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#ffffff" />

        {/* Precarga del logo (WebP) para que aparezca instantáneo al salir del splash */}
        <link rel="preload" as="image" href="/images/logo-white.webp" type="image/webp" />
      </head>
      <body style={{ background: "#fff" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
