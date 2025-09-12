import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.js
export const metadata = {
  metadataBase: new URL('https://heavenlyknits.com'),
  title: {
    default: 'Heavenly Knits — Handmade with love',
    template: '%s · Heavenly Knits',
  },
  description:
    'Colorimetry-driven textiles & knits. Feminine palettes, delicate details, and artisanal technique.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Heavenly Knits — Handmade with love',
    description:
      'Colorimetry-driven textiles & knits. Feminine palettes, delicate details, and artisanal technique.',
    url: 'https://heavenlyknits.com',
    siteName: 'Heavenly Knits',
    images: [{ url: '/og-cover.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heavenly Knits — Handmade with love',
    images: ['/og-cover.jpg'],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
