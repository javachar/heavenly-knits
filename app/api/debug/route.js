import { NextResponse } from "next/server";

export async function GET(req) {
  const c1 = req.cookies.get("__hk_preview")?.value || null;
  const c2 = req.cookies.get("hk-preview")?.value || null;

  return NextResponse.json({
    env: {
      NODE_ENV: process.env.NODE_ENV,
      MAINTENANCE: process.env.MAINTENANCE,
      PREVIEW_TOKEN: process.env.PREVIEW_TOKEN ? "set" : "missing",
    },
    cookies: {
      "__hk_preview": c1,
      "hk-preview": c2,
    },
  });
}
