// app/api/unpreview/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  const res = NextResponse.redirect(new URL("/", req.url));

  // Elimina la cookie de preview
  res.cookies.set("__hk_preview", "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return res;
}
