// middleware.ts
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*"],
};

export function middleware(req: Request) {
  // @ts-ignore
  const url = new URL(req.url);

  // Si no estamos en modo mantenimiento, no hacemos nada
  if (process.env.MAINTENANCE !== "1") {
    return NextResponse.next();
  }

  // Rutas que deben seguir funcionando siempre (assets, sitemap, robots, íconos, ruta UC y APIs de preview)
  const allowPrefixes = [
    "/_next",
    "/favicon",
    "/icon",
    "/apple-touch-icon",
    "/sitemap.xml",
    "/robots.txt",
    "/uc",
    "/api/preview",
    "/api/unpreview",
  ];
  if (allowPrefixes.some((p) => url.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ¿Tiene cookie de preview?
  // @ts-ignore
  const cookies = (req as any).cookies ?? new Map();
  const hasPreview = cookies.get?.("hk_preview") === "1";

  if (hasPreview) {
    return NextResponse.next();
  }

  // Reescribe a /uc (under construction)
  const rewriteUrl = new URL("/uc", req.url);
  return NextResponse.rewrite(rewriteUrl);
}
