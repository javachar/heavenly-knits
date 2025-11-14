// middleware.js
import { NextResponse } from 'next/server';

const PREVIEW_COOKIE_KEYS = ['__hk_preview', 'hk-preview'];
const PREVIEW_TOKEN = process.env.PREVIEW_TOKEN || 'hk-preview-9347fda';

// Prefijos que siempre se dejan pasar
const ALWAYS_PREFIXES = [
  '/_next',
  '/images',
  '/fonts',
  '/products',
  '/favicon',
];

// Rutas exactas que siempre se dejan pasar
const ALWAYS_EXACT = [
  '/robots.txt',
  '/sitemap.xml',
  '/join',   // landing de email abierta al público
  '/uc',     // página de under construction
];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookies = req.cookies;

  // 1) Dejar pasar assets estáticos, /join y /uc
  if (
    ALWAYS_EXACT.includes(pathname) ||
    ALWAYS_PREFIXES.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  // 2) Si el usuario tiene cookie de preview válida, ve el sitio normal
  const hasPreview = PREVIEW_COOKIE_KEYS.some(
    (k) => cookies.get(k)?.value === PREVIEW_TOKEN
  );
  if (hasPreview) {
    return NextResponse.next();
  }

  // 3) Para todo lo demás: reescribir a /uc (under construction)
  const url = req.nextUrl.clone();
  url.pathname = '/uc';
  return NextResponse.rewrite(url);
}

// Aplica a todo excepto /api (las APIs pasan directo)
export const config = {
  matcher: ['/((?!api/.*).*)'],
};
