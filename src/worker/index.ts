/*
  worker/index.ts — FlatFinder™ API
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  Patent Pending (CIPO) | Trademarks Pending (CIPO)
  PROPRIETARY AND CONFIDENTIAL — Server-side only. No client-side exposure.
*/

import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
  BENNY_SYSTEM_PROMPT?: string;
  ANTHROPIC_API_KEY?: string;
  ENVIRONMENT?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));

/* ─────────────────────────────────────────────
   POST /api/signup
   Stores a beta signup in D1 (beta_signups table)
───────────────────────────────────────────── */
app.post("/api/signup", async (c) => {
  const body = await c.req.json().catch(() => null);

  if (!body || !body.email) {
    return c.json({ error: "Email is required" }, 400);
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(body.email)) {
    return c.json({ error: "Invalid email address" }, 400);
  }

  const cf = c.req.raw.cf as Record<string, string> | undefined;
  const ipCountry = cf?.country ?? "unknown";

  try {
    await c.env.DB.prepare(`
      INSERT INTO beta_signups (
        email, name, plan, city, country, bedrooms, currency,
        budget, people, income, employment, predatory_landlord,
        urgency, denied_rental, terms_accepted, privacy_accepted,
        updates_opted_in, ip_country, source, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.email,
      body.name || null,
      body.plan || "pro",
      body.city || null,
      body.country || null,
      body.bedrooms || null,
      body.currency || "CAD",
      body.budget ? Number(body.budget) : null,
      body.people ? Number(body.people) : 1,
      body.income ? Number(body.income) : null,
      body.employment || null,
      body.predatory_landlord || null,
      body.urgency || null,
      body.denied_rental || null,
      body.terms_accepted ? 1 : 0,
      body.privacy_accepted ? 1 : 0,
      body.updates_opted_in ? 1 : 0,
      ipCountry,
      body.source || "beta-signup",
      "waitlisted"
    ).run();

    return c.json({ success: true, message: "You're on the list. We'll be in touch." }, 201);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("UNIQUE constraint failed")) {
      return c.json({ success: true, message: "You're already on the list!" }, 200);
    }
    console.error("Signup error:", msg);
    return c.json({ error: "Something went wrong. Please try again." }, 500);
  }
});

/* ─────────────────────────────────────────────
   GET /api/health
   Basic health check — no sensitive data
───────────────────────────────────────────── */
app.get("/api/health", (c) =>
  c.json({ status: "ok", service: "FlatFinder™ API", timestamp: new Date().toISOString() })
);

/* ─────────────────────────────────────────────
   POST /api/benny
   Benny™ AI scaffold — Month 1 build target
   System prompt ALWAYS loaded from env var, never hardcoded.
   Returns a friendly placeholder until Anthropic key is wired.
───────────────────────────────────────────── */
app.post("/api/benny", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || !body.message) {
    return c.json({ error: "Message is required" }, 400);
  }

  const apiKey = c.env.ANTHROPIC_API_KEY;
  const systemPrompt = c.env.BENNY_SYSTEM_PROMPT;

  if (!apiKey || !systemPrompt) {
    return c.json({
      reply:
        "Hey, I'm Benny™ — your FlatFinder apartment scout. I'm almost ready. " +
        "Once we launch the beta, I'll be scanning listings and fighting gatekeeping on your behalf. " +
        "Get on the waitlist at flatfinder.io/signup and I'll find your next home.",
      status: "pre-launch",
    });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1024,
        system: atob(systemPrompt),
        messages: [{ role: "user", content: body.message }],
      }),
    });

    if (!res.ok) {
      throw new Error(`Anthropic error: ${res.status}`);
    }

    const data = await res.json() as { content: Array<{ text: string }> };
    return c.json({ reply: data.content[0]?.text ?? "No response from Benny." });
  } catch (err) {
    console.error("Benny error:", err);
    return c.json({ error: "Benny is temporarily unavailable. Try again in a moment." }, 503);
  }
});

export default app;
