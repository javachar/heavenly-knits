// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  // Solo forzamos UC en producción
  const isProd = process.env.NODE_ENV === "production";
  const maintenance =
    process.env.MAINTENANCE === "1" || process.env.MAINTENANCE === "true";

  // Aceptar cualquiera de estos nombres y valores
  const c1 = req.cookies.get("__hk_preview")?.value;
  const c2 = req.cookies.get("hk-preview")?.value;
  const hasPreview =
    c1 === "1" || c1 === "true" || c2 === "1" || c2 === "true";

  // Siempre permitir estáticos y APIs de control
  const allowList = [
    "/api/preview",
    "/api/unpreview",
    "/api/debug",   // <— endpoint de diagnóstico
    "/uc",
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico",
  ];
  const isAllowed =
    allowList.some((p) => path.startsWith(p)) ||
    path.startsWith("/_next") ||
    path.startsWith("/icons") ||
    path.startsWith("/images") ||
    path.startsWith("/fonts") ||
    path.startsWith("/assets");

  // Si estamos en prod + mantenimiento activo + NO cookie preview => UC
  if (isProd && maintenance && !hasPreview && !isAllowed) {
    url.pathname = "/uc";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|robots.txt|sitemap.xml|api/preview|api/unpreview|api/debug|uc|icons|images|fonts|assets).*)",
  ],
};
