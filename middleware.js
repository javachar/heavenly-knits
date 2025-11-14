// middleware.js
import { NextResponse } from 'next/server';

const PREVIEW_COOKIE_KEYS = ['__hk_preview', 'hk-preview'];
const PREVIEW_TOKEN = process.env.PREVIEW_TOKEN || 'hk-preview-9347fda';

// Rutas que nunca deben bloquearse (estáticos, APIs, etc.)
const ALWAYS_ALLOW = [
  '/_next', '/favicon', '/images', '/products', '/fonts',
  '/api', '/robots.txt', '/sitemap.xml', '/join' // <— join libre
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Permitir todo lo que empiece por las rutas whitelisted
  if (ALWAYS_ALLOW.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Si ya tienes una página “Under Construction”, ajusta esta condición:
  // Aquí pedimos cookie válida para ver el sitio completo (excepto /join).
  const cookies = req.cookies;
  const hasValid = PREVIEW_COOKIE_KEYS.some((k) => cookies.get(k)?.value === PREVIEW_TOKEN);
  if (hasValid) return NextResponse.next();

  // Si no tiene cookie válida, redirige (o responde) a tu “Under Construction”
  // Cambia "/under" por la ruta/página que uses (si la tienes).
  const url = req.nextUrl.clone();
  url.pathname = '/under';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api/.*).*)'], // aplica a todo excepto /api
};
