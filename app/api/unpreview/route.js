import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ ok: true });

  // Borramos ambas
  const gone = { path: "/", maxAge: 0 };
  res.cookies.set("__hk_preview", "", gone);
  res.cookies.set("hk-preview", "", gone);

  return res;
}
