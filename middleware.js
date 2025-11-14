// middleware.js
import { NextResponse } from 'next/server';

const PREVIEW_COOKIE_KEYS = ['__hk_preview', 'hk-preview'];
const PREVIEW_TOKEN = process.env.PREVIEW_TOKEN || 'hk-preview-9347fda';

// Rutas que NO deben bloquearse (archivos estáticos, APIs y JOIN)
const ALWAYS_ALLOW_PREFIX = [
  '/_next',
  '/favicon',
  '/images',
  '/products',
  '/fonts',
  '/api',
];
const ALWAYS_ALLOW_EXACT = ['/robots.txt', '/sitemap.xml', '/join', '/join/'];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Permitir prefijos whitelisted
  if (ALWAYS_ALLOW_PREFIX.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }
  // Permitir rutas exactas whitelisted (incluye /join y /join/)
  if (ALWAYS_ALLOW_EXACT.includes(pathname)) {
    return NextResponse.next();
  }

  // ¿Tiene cookie de preview válida?
  const cookies = req.cookies;
  const hasValid = PREVIEW_COOKIE_KEYS.some(
    (k) => cookies.get(k)?.value === PREVIEW_TOKEN
  );
  if (hasValid) return NextResponse.next();

  // Sin cookie válida -> mandar a la página de “Under Construction”
  const url = req.nextUrl.clone();
  url.pathname = '/under';
  return NextResponse.rewrite(url);
}

// IMPORTANTÍSIMO: excluir /join desde el matcher
export const config = {
  matcher: [
    // aplica a todo MENOS:
    // - /api
    // - /_next (estáticos)
    // - /join (y subrutas)
    // - /fonts, /images, /products
    // - /favicon, /robots.txt, /sitemap.xml
    '/((?!api/|_next/|join(?:/|$)|fonts/|images/|products/|favicon|robots\\.txt|sitemap\\.xml).*)',
  ],
};
