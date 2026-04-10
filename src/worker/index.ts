import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", cors());

app.get("/api/", (c) =>
	c.json({
		name: "FlatFinder",
		version: "0.1.0-beta",
		status: "operational",
	}),
);

app.post("/api/beta-signup", async (c) => {
	const body = await c.req.json<Record<string, unknown>>();

	const email = String(body.email || "").trim().toLowerCase();
	const name = String(body.name || "").trim();
	const plan = String(body.plan || "pro");

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return c.json({ error: "A valid email address is required." }, 400);
	}

	if (!name) {
		return c.json({ error: "Your name is required." }, 400);
	}

	if (!["pro", "max", "ultra"].includes(plan)) {
		return c.json({ error: "Please select a valid plan." }, 400);
	}

	if (!body.terms_accepted) {
		return c.json(
			{ error: "You must accept the Terms & Conditions." },
			400,
		);
	}

	if (!body.privacy_accepted) {
		return c.json({ error: "You must accept the Privacy Policy." }, 400);
	}

	const signup = {
		id: crypto.randomUUID(),
		email,
		name,
		plan,
		city: String(body.city || ""),
		country: String(body.country || ""),
		province: String(body.province || ""),
		bedrooms: String(body.bedrooms || ""),
		currency: String(body.currency || "CAD"),
		budget: body.budget ? Number(body.budget) : null,
		people: body.people ? Number(body.people) : 1,
		income: body.income ? Number(body.income) : null,
		occupation: String(body.occupation || ""),
		employment: String(body.employment || ""),
		urgency: String(body.urgency || ""),
		denied: String(body.denied || ""),
		predatory_landlord: String(body.predatory_landlord || ""),
		source: String(body.source || "beta-signup"),
		terms_accepted: Boolean(body.terms_accepted),
		privacy_accepted: Boolean(body.privacy_accepted),
		updates_opted_in: Boolean(body.updates_opted_in),
		created_at: new Date().toISOString(),
		status: "waitlisted",
	};

	console.log(
		"[beta-signup] New signup:",
		JSON.stringify({
			id: signup.id,
			email: signup.email,
			plan: signup.plan,
			city: signup.city,
			created_at: signup.created_at,
		}),
	);

	return c.json({
		success: true,
		message: "You're on the list. We'll be in touch.",
		signup_id: signup.id,
	});
});

export default app;
