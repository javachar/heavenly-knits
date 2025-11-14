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
    const listIds = Number.isNaN(listIdNumber) ? [] : [listIdNumber];

    // 1) Ver si el contacto YA existe en Brevo
    let already = false;
    try {
      const checkRes = await fetch(
        `https://api.brevo.com/v3/contacts/${encodeURIComponent(v)}`,
        {
          method: "GET",
          headers: {
            "api-key": BREVO_API_KEY,
            Accept: "application/json",
          },
        }
      );

      if (checkRes.ok) {
        // 200 -> el contacto ya existe
        already = true;
      } else if (checkRes.status === 404) {
        // 404 -> no existe, lo trataremos como nuevo
        already = false;
      }
      // Si hay otro status, seguimos igual y que el POST decida
    } catch {
      // Si falla el GET, no rompemos el flujo: seguimos como si no supiéramos
      already = false;
    }

    // 2) Crear o actualizar el contacto
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
      const message =
        (data && (data.message || data.error)) ||
        `Brevo error (status ${res.status})`;
      const code = data && data.code;

      const lowerMsg = typeof message === "string" ? message.toLowerCase() : "";
      const isDuplicate =
        code === "duplicate_parameter" ||
        lowerMsg.includes("already exist") ||
        lowerMsg.includes("already exists") ||
        lowerMsg.includes("contact already") ||
        lowerMsg.includes("duplicate");

      // Si Brevo dice duplicado, marcamos como ya suscrito igualmente
      if (isDuplicate) {
        return NextResponse.json(
          { ok: true, already: true },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { ok: false, error: message || "Brevo error" },
        { status: 400 }
      );
    }

    // 3) Responder al frontend: ok + si ya estaba antes o no
    return NextResponse.json(
      { ok: true, already },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "server-error" },
      { status: 500 }
    );
  }
}
