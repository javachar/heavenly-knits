// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const maintenance =
    process.env.MAINTENANCE === "1" || process.env.MAINTENANCE === "true";

  const hasPreview = req.cookies.get("__hk_preview")?.value === "1";
  const url = new URL(req.url);
  const path = url.pathname;

  // Permitir siempre assets y APIs de preview
  const allowList = [
    "/api/preview",
    "/api/unpreview",
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

  if (maintenance && !hasPreview && !isAllowed) {
    url.pathname = "/uc";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Aplica a todas las rutas excepto las de estáticos/API listadas arriba
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|robots.txt|sitemap.xml|api/preview|api/unpreview|uc|icons|images|fonts|assets).*)",
  ],
};
