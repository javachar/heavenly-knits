// app/layout.js
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://heavenlyknits.com"),
  title: {
    default: "Heavenly Knits — Handmade with love",
    template: "%s • Heavenly Knits",
  },
  description:
    "Heavenly Knits: textiles y bordados hechos a mano con amor. Paletas guiadas por colorimetría y detalles artesanales.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Heavenly Knits — Handmade with love",
    description:
      "Textiles & knits que se sienten como hogar: colorimetría, detalles femeninos y técnica artesanal.",
    url: "/",
    siteName: "Heavenly Knits",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heavenly Knits — Handmade with love",
    description: "Textiles & knits que se sienten como hogar.",
    images: ["/og-cover.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
