// middleware.js
import { NextResponse } from 'next/server';

const PREVIEW_COOKIE_KEYS = ['__hk_preview', 'hk-preview'];
const PREVIEW_TOKEN = process.env.PREVIEW_TOKEN || 'hk-preview-9347fda';

// Rutas que nunca deben bloquearse (estáticos, APIs, etc.)
const ALWAYS_ALLOW = [
  '/_next',        // assets Next.js
  '/favicon',      // favicons
  '/images',       // tus imágenes públicas
  '/products',     // imágenes de productos
  '/fonts',        // fuentes públicas
  '/api',          // endpoints API
  '/robots.txt',
  '/sitemap.xml'
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 🔒 /join: permitido SIEMPRE y con cabecera noindex
  if (pathname.startsWith('/join')) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return res;
  }

  // Permitir todo lo que empiece por las rutas whitelisted
  if (ALWAYS_ALLOW.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Guard del sitio: solo entra quien tenga la cookie de preview válida
  const cookies = req.cookies;
  const hasValid = PREVIEW_COOKIE_KEYS.some(
    (k) => cookies.get(k)?.value === PREVIEW_TOKEN
  );
  if (hasValid) return NextResponse.next();

  // Sin cookie válida → reescribe a la página de "Under Construction"
  const url = req.nextUrl.clone();
  url.pathname = '/under';
  return NextResponse.rewrite(url);
}

// Aplica a todo excepto /api (los /_next y demás ya están en el allowlist)
export const config = {
  matcher: ['/((?!api/.*).*)'],
};
