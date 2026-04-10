import { Hono } from "hono";
type Bindings = Env & {
	SUPABASE_URL?: string;
	NEXT_PUBLIC_SUPABASE_URL?: string;
	SUPABASE_SERVICE_ROLE_KEY?: string;
	SUPABASE_ANON_KEY?: string;
	NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
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

const TABLE_NOT_FOUND_CODES = new Set(["42P01", "PGRST205"]);

type SupabaseErrorPayload = {
	code?: string;
	message?: string;
	details?: string;
	hint?: string;
};

const parseSupabaseError = (payload: SupabaseErrorPayload | null) => {
	if (!payload) {
		return "Unknown Supabase error.";
	}
	return [payload.message, payload.details, payload.hint].filter(Boolean).join(" ");
};

const insertIntoSupabaseTable = async (
	supabaseUrl: string,
	supabaseKey: string,
	table: string,
	payload: Record<string, unknown>,
) => {
	const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			apikey: supabaseKey,
			Authorization: `Bearer ${supabaseKey}`,
			Prefer: "return=minimal",
		},
		body: JSON.stringify(payload),
	});

	const errorPayload = (await response.json().catch(() => null)) as SupabaseErrorPayload | null;
	return { response, errorPayload };
};

const isMissingTableError = (status: number, payload: SupabaseErrorPayload | null) => {
	return status === 404 || (payload?.code ? TABLE_NOT_FOUND_CODES.has(payload.code) : false);
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

	const supabaseUrl = (
		c.env.SUPABASE_URL || c.env.NEXT_PUBLIC_SUPABASE_URL
	)?.replace(/\/$/, "");
	const supabaseServiceRoleKey =
		c.env.SUPABASE_SERVICE_ROLE_KEY ||
		c.env.SUPABASE_ANON_KEY ||
		c.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseServiceRoleKey) {
		return c.json(
			{
				error:
					"Waitlist is not configured yet. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY).",
			},
			500,
		);
	}

	const city =
		body.city === "other"
			? body.city_other?.trim() || null
			: body.city?.trim() || null;
	const waitlistPayload = {
		name,
		email,
		city,
		moving_date: body.moving_date || null,
		household_size: body.household_size || null,
		budget: body.budget ?? null,
		bedrooms: body.bedrooms || null,
		bathrooms: body.bathrooms || null,
		property_type: body.property_type || null,
	};

	// Primary write path: `waitlist` table (new schema).
	const waitlistInsert = await insertIntoSupabaseTable(
		supabaseUrl,
		supabaseServiceRoleKey,
		"waitlist",
		waitlistPayload,
	);

	let insertSucceeded = waitlistInsert.response.ok;

	// Compatibility path: if the project still uses the old `beta_signups` table.
	if (
		!insertSucceeded &&
		isMissingTableError(waitlistInsert.response.status, waitlistInsert.errorPayload)
	) {
		const betaPayload = {
			email,
			city,
			bedrooms: body.bedrooms || null,
			budget: body.budget ?? null,
			created_at: new Date().toISOString(),
		};
		const betaInsert = await insertIntoSupabaseTable(
			supabaseUrl,
			supabaseServiceRoleKey,
			"beta_signups",
			betaPayload,
		);
		insertSucceeded = betaInsert.response.ok;

		if (!insertSucceeded) {
			if (betaInsert.errorPayload?.code === "23505") {
				return c.json({ error: "You're already on the list!" }, 409);
			}
			const errorDetail = parseSupabaseError(betaInsert.errorPayload);
			console.error("beta_signups insert failed", betaInsert.errorPayload);
			return c.json(
				{
					error: `Could not save signup in Supabase. ${errorDetail} Check table name and RLS insert policy.`,
				},
				500,
			);
		}
	} else if (!insertSucceeded) {
		if (waitlistInsert.errorPayload?.code === "23505") {
			return c.json({ error: "You're already on the list!" }, 409);
		}
		const errorDetail = parseSupabaseError(waitlistInsert.errorPayload);
		console.error("waitlist insert failed", waitlistInsert.errorPayload);
		return c.json(
			{
				error: `Could not save signup in Supabase. ${errorDetail} Check API key and RLS insert policy.`,
			},
			500,
		);
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
