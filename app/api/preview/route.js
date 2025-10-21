import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  const expected = process.env.PREVIEW_TOKEN;
  if (!expected || token !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
  }

  // coloca cookie de preview por 7 días
  cookies().set("hk-preview", "1", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  // redirige a la home (ya verás el sitio normal)
  return NextResponse.redirect(new URL("/", req.url));
}
