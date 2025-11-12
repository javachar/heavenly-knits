// app/api/instagram/route.js
import { NextResponse } from "next/server";

/**
 * Devuelve: { data: [{ id, mediaUrl, link }], source: "web_profile" | "html" | "dev" | "empty" | "error" }
 */

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const APP_ID = "936619743392459"; // público de la web app

const USERNAME =
  process.env.INSTAGRAM_USERNAME?.trim() || "heavenlyknits.co";

const ABS = (u) => (u && u.startsWith("http") ? u : undefined);

// --- A) Endpoint JSON “oficial” (no requiere token, pero sí headers)
async function tryWebProfileInfo(username) {
  const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(
    username
  )}`;
  const r = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Referer: "https://www.instagram.com/",
      "X-IG-App-ID": APP_ID,
      Accept: "application/json, text/plain, */*",
    },
    cache: "no-store",
  });

  if (!r.ok) throw new Error(`A) ${r.status} ${r.statusText}`);
  const j = await r.json();

  const edges =
    j?.data?.user?.edge_owner_to_timeline_media?.edges || [];
  const data = edges
    .map((e) => {
      const n = e?.node;
      return {
        id: n?.id,
        mediaUrl: ABS(n?.display_url),
        link: n?.shortcode
          ? `https://www.instagram.com/p/${n.shortcode}/`
          : `https://www.instagram.com/${username}/`,
      };
    })
    .filter((x) => x.mediaUrl);

  return { data: data.slice(0, 9), source: "web_profile" };
}

// --- B) Parseo del HTML público (plan B si A falla)
async function tryPublicHTML(username) {
  const url = `https://www.instagram.com/${encodeURIComponent(
    username
  )}/`;

  const r = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml",
      Referer: "https://www.instagram.com/",
    },
    cache: "no-store",
  });

  if (!r.ok) throw new Error(`B) ${r.status} ${r.statusText}`);
  const html = await r.text();

  const urls = [];
  const displayUrlRe = /"display_url"\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = displayUrlRe.exec(html)) && urls.length < 20) {
    const u = m[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/");
    if (u.startsWith("http")) urls.push(u);
  }

  const codes = [];
  const shortcodeRe = /"shortcode"\s*:\s*"([^"]+)"/g;
  while ((m = shortcodeRe.exec(html)) && codes.length < 20) {
    codes.push(m[1]);
  }

  const len = Math.min(urls.length, codes.length);
  const data = Array.from({ length: len }).map((_, i) => ({
    id: codes[i] || String(i),
    mediaUrl: urls[i],
    link: codes[i]
      ? `https://www.instagram.com/p/${codes[i]}/`
      : `https://www.instagram.com/${username}/`,
  }));

  return { data: data.slice(0, 9), source: "html" };
}

// --- C) Fallback de desarrollo
function devPlaceholders() {
  const seeds = ["hk1","hk2","hk3","hk4","hk5","hk6","hk7","hk8","hk9"];
  const data = seeds.map((s, i) => ({
    id: `ph-${i}`,
    mediaUrl: `https://picsum.photos/seed/${s}/600/600`,
    link: `https://www.instagram.com/${USERNAME}/`,
  }));
  return { data, source: "dev" };
}

export async function GET() {
  try {
    // A
    try {
      const { data, source } = await tryWebProfileInfo(USERNAME);
      if (data.length) {
        return NextResponse.json({ data, source }, { status: 200 });
      }
    } catch (_) {
      // pasa a B
    }

    // B
    try {
      const { data, source } = await tryPublicHTML(USERNAME);
      if (data.length) {
        return NextResponse.json({ data, source }, { status: 200 });
      }
    } catch (_) {
      // pasa a C
    }

    // C (solo en dev)
    if (process.env.NODE_ENV !== "production") {
      const { data, source } = devPlaceholders();
      return NextResponse.json({ data, source }, { status: 200 });
    }

    // Producción y no hubo nada
    return NextResponse.json({ data: [], source: "empty" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        data: [],
        source: "error",
        error: e?.message || "instagram-failed",
      },
      { status: 200 }
    );
  }
}
