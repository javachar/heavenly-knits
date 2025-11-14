// middleware.js
import { NextResponse } from 'next/server';

/**
 * Heavenly Knits v0.3
 *
 * - Quitamos el modo "under construction".
 * - Dejamos pasar todas las rutas normales.
 * - /uc sigue estando disponible si entras directamente a /uc.
 */
export function middleware() {
  // Por ahora no bloqueamos nada, solo dejamos que Next maneje las rutas
  return NextResponse.next();
}

// Aplica solo a rutas que no son /api (igual que antes)
export const config = {
  matcher: ['/((?!api/.*).*)'],
};
