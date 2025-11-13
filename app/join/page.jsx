// app/join/page.jsx
"use client";
import { useState } from "react";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // {type:'ok'|'err', text:string}

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);
    const v = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setMsg({ type: "err", text: "Please enter a valid email." });
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v }),
      });
      const j = await r.json();
      if (j.ok) {
        setMsg({ type: "ok", text: "You're in! Check your inbox for updates ✨" });
        setEmail("");
      } else {
        setMsg({ type: "err", text: j.error || "Could not subscribe. Try again." });
      }
    } catch {
      setMsg({ type: "err", text: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[60vh] grid place-items-center px-4 py-12">
      <div className="max-w-lg w-full bg-white border border-[--graphite-100] rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Join the Heavenly Knits Family 💕</h1>
        <p className="text-[--graphite-600] mb-6">
          Be the first to know about new designs, behind-the-scenes stories, and freebies. (No spam.)
        </p>
        <form onSubmit={onSubmit} className="flex gap-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 rounded-xl px-4 border border-[--graphite-200] focus:outline-none focus:ring-2 focus:ring-[--hk-deeprose]/30"
          />
          <button
            disabled={loading}
            className="h-12 px-5 rounded-xl bg-[--hk-deeprose] text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Sending…" : "Subscribe"}
          </button>
        </form>
        {msg && (
          <div className={`mt-4 text-sm ${msg.type === "ok" ? "text-green-700" : "text-red-600"}`}>
            {msg.text}
          </div>
        )}
        <p className="mt-4 text-xs text-[--graphite-500]">
          By subscribing you agree to receive emails from Heavenly Knits. You can unsubscribe anytime.
        </p>
      </div>
    </main>
  );
}
