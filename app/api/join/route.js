// app/api/join/route.js
import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID; // string o número

export async function POST(req) {
  try {
    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      return NextResponse.json({ ok: false, error: "Missing Brevo env vars" }, { status: 500 });
    }

    const { email, firstName, lastName, source } = await req.json();
    const v = String(email || "").trim().toLowerCase();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(v)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // Brevo Contacts API v3
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({
        email: v,
        attributes: {
          FIRSTNAME: firstName || "",
          LASTNAME: lastName || "",
          SOURCE: source || "website-join",
        },
        listIds: [Number(BREVO_LIST_ID)],
        updateEnabled: true, // si ya existe, lo actualiza y asegura que esté en la lista
        emailBlacklisted: false,
        smsBlacklisted: false,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Si ya existe, Brevo responde 400 con "duplicate parameter", aún así lo metemos a la lista (updateEnabled ya lo intenta)
      return NextResponse.json({ ok: false, error: data?.message || "Brevo error" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || "server-error" }, { status: 500 });
  }
}
