// app/api/join/route.js
import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID; // ID numérico o string de la lista en Brevo

export async function POST(req) {
  try {
    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      return NextResponse.json(
        { ok: false, error: "Missing Brevo env vars" },
        { status: 500 }
      );
    }

    // Leer body (si viene vacío, usamos objeto vacío)
    const body = await req.json().catch(() => ({}));
    const { email, firstName, lastName, source } = body || {};

    const v = String(email || "").trim().toLowerCase();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRe.test(v)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    const listIdNumber = Number(BREVO_LIST_ID);
    const listIds = Number.isNaN(listIdNumber)
      ? []
      : [listIdNumber];

    const payload = {
      email: v,
      attributes: {
        FIRSTNAME: firstName || "",
        LASTNAME: lastName || "",
        SOURCE: source || "HeavenlyKnits Join",
      },
      listIds,
      updateEnabled: true,
    };

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const msg =
        (data && (data.message || data.error)) ||
        `Brevo error (status ${res.status})`;
      return NextResponse.json(
        { ok: false, error: msg },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "server-error" },
      { status: 500 }
    );
  }
}
