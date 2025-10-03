// app/layout.js
import "./globals.css";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

export const viewport = {
  themeColor: "#FFF7F2",
};

const recoleta = localFont({
  src: "../public/fonts/recoleta-alt-semibold.otf", // asegúrate de que exista
  weight: "600",
  style: "normal",
  variable: "--font-recoleta",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
});

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
      { url: "/favicon.ico?v=3" },
      { url: "/icon-32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png?v=3", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=3", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180" }],
    shortcut: ["/favicon.ico?v=3"],
  },
  manifest: "/manifest.webmanifest",
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
      <body className={`${recoleta.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
