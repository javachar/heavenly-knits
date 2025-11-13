import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY; // ej: us21-xxxxxxxxxxxxxxxxxxx
    const LIST_ID = process.env.MAILCHIMP_LIST_ID; // Audience/List ID
    const DC = API_KEY?.split('-')?.[1];           // data center (us21, us6, etc.)

    if (!API_KEY || !LIST_ID || !DC) {
      return NextResponse.json({ error: 'missing-env' }, { status: 500 });
    }

    const url = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending', // doble opt-in. Cambia a 'subscribed' si no quieres confirmación.
      }),
      cache: 'no-store',
    });

    // Si ya existe, Mailchimp suele responder 400 con title "Member Exists"
    const text = await res.text();
    let json = {};
    try { json = JSON.parse(text); } catch {}

    if (res.status === 400 && json?.title === 'Member Exists') {
      return NextResponse.json({ ok: true, already: true }, { status: 200 });
    }

    if (!res.ok) {
      return NextResponse.json({ error: json?.detail || 'mailchimp-error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'server-error' }, { status: 500 });
  }
}
