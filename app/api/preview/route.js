import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";

  const expected = process.env.PREVIEW_TOKEN || "";
  if (!expected || token !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  // Seteamos AMBAS cookies por compatibilidad
  const opts = { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" };
  res.cookies.set("__hk_preview", "1", opts);
  res.cookies.set("hk-preview", "1", opts);

  return res;
}
