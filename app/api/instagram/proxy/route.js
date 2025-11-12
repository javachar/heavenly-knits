// app/api/instagram/proxy/route.js
import { NextResponse } from "next/server";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get("u");

  if (!rawUrl) {
    return new NextResponse("Missing url", { status: 400 });
  }

  try {
    const upstream = await fetch(rawUrl, {
      headers: {
        "User-Agent": UA,
        Referer: "https://www.instagram.com/",
        Accept:
          "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return new NextResponse(
        `Upstream error ${upstream.status}`,
        { status: upstream.status }
      );
    }

    const buf = await upstream.arrayBuffer();
    const contentType =
      upstream.headers.get("content-type") || "image/jpeg";

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // cache en el borde para que no bombardee tu server
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    return new NextResponse(
      `Proxy error: ${e?.message || "unknown"}`,
      { status: 500 }
    );
  }
}
