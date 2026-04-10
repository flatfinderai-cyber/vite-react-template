import { Hono } from "hono";
type Bindings = Env & {
	SUPABASE_URL?: string;
	SUPABASE_SERVICE_ROLE_KEY?: string;
	RESEND_API_KEY?: string;
	FROM_EMAIL?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

type WaitlistRequest = {
	name?: string;
	email?: string;
	city?: string | null;
	city_other?: string | null;
	moving_date?: string | null;
	household_size?: string | null;
	budget?: number | null;
	bedrooms?: string | null;
	bathrooms?: string | null;
	property_type?: string | null;
};

app.post("/api/waitlist", async (c) => {
	let body: WaitlistRequest;
	try {
		body = await c.req.json<WaitlistRequest>();
	} catch {
		return c.json({ error: "Invalid request body." }, 400);
	}

	const name = body.name?.trim();
	const email = body.email?.trim().toLowerCase();

	if (!name || !email) {
		return c.json({ error: "Name and email are required." }, 400);
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return c.json({ error: "Please enter a valid email." }, 400);
	}

	const supabaseUrl = c.env.SUPABASE_URL?.replace(/\/$/, "");
	const supabaseServiceRoleKey = c.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !supabaseServiceRoleKey) {
		return c.json(
			{
				error:
					"Waitlist is not configured yet. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
			},
			500,
		);
	}

	const city =
		body.city === "other"
			? body.city_other?.trim() || null
			: body.city?.trim() || null;

	const insertResponse = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			apikey: supabaseServiceRoleKey,
			Authorization: `Bearer ${supabaseServiceRoleKey}`,
			Prefer: "return=minimal",
		},
		body: JSON.stringify({
			name,
			email,
			city,
			moving_date: body.moving_date || null,
			household_size: body.household_size || null,
			budget: body.budget ?? null,
			bedrooms: body.bedrooms || null,
			bathrooms: body.bathrooms || null,
			property_type: body.property_type || null,
		}),
	});

	if (!insertResponse.ok) {
		const payload = (await insertResponse.json().catch(() => null)) as
			| { code?: string; message?: string }
			| null;

		if (payload?.code === "23505") {
			return c.json({ error: "You're already on the list!" }, 409);
		}

		console.error("waitlist insert failed", payload);
		return c.json({ error: "Something went wrong while saving your signup." }, 500);
	}

	const resendApiKey = c.env.RESEND_API_KEY;
	const fromEmail = c.env.FROM_EMAIL;

	if (resendApiKey && fromEmail) {
		try {
			await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${resendApiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					from: fromEmail,
					to: email,
					subject: "You're on the FlatFinder waitlist",
					html: `<div style="font-family:sans-serif;background:#1a1a1e;color:#f2f0eb;padding:40px 32px;max-width:480px">
						<p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#f07c2a">FlatFinder</p>
						<h1 style="font-size:26px;margin:12px 0">You're on the list, ${name.split(" ")[0]}.</h1>
						<p style="color:#9090a0;line-height:1.7">Benny is getting ready. You'll be the first to know when we launch.</p>
						<p style="color:#9090a0;font-size:13px;margin-top:24px">- The FlatFinder Team</p>
					</div>`,
				}),
			});
		} catch (emailError) {
			// Non-fatal: signup still succeeds even if confirmation email fails.
			console.error("waitlist email failed", emailError);
		}
	}

	return c.json({ success: true }, 201);
});

export default app;
