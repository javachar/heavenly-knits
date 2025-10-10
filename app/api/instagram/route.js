// app/api/instagram/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const USER_ID = process.env.heavenlyknits.co;          // p.ej. 1784140xxxxxxxxx
  const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN; // long-lived token (60 días)
  const limit = 9;

  if (!USER_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Faltan variables INSTAGRAM_USER_ID o INSTAGRAM_ACCESS_TOKEN." },
      { status: 500 }
    );
  }

  const fields = [
    "id",
    "caption",
    "media_url",
    "media_type",
    "permalink",
    "thumbnail_url",
    "timestamp",
  ].join(",");

  const url = `https://graph.instagram.com/${USER_ID}/media?fields=${fields}&limit=${limit}&access_token=${ACCESS_TOKEN}`;

  try {
    // Revalidate cada 3600s (1h)
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: json.error || "Error al llamar a Instagram API." },
        { status: 500, headers: { "Cache-Control": "s-maxage=300" } } // cache 5 min el error
      );
    }

    return NextResponse.json(
      { data: json.data || [] },
      { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Fallo de red al consultar Instagram." },
      { status: 500, headers: { "Cache-Control": "s-maxage=300" } }
    );
  }
}
