# FlatFinder waitlist app

This repo now contains:
- A working FlatFinder landing page with a modal waitlist form.
- A real `/api/waitlist` backend endpoint in the Cloudflare Worker.
- Supabase storage integration for waitlist submissions.
- Optional confirmation emails through Resend.

## 1) Supabase setup (one-time)

1. Open your Supabase project.
2. Go to SQL Editor.
3. Run `supabase_migration.sql`.

## 2) Environment setup (required before form submission works)

1. Copy `.dev.vars.example` to `.dev.vars`.
2. Fill in your real values:
   - `SUPABASE_URL` **or** `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Optional: set `RESEND_API_KEY` + `FROM_EMAIL` for confirmation emails.

## 3) Which page to use

- Use `http://localhost:5173/flatfinder-landing.html` for the FlatFinder landing page experience.
- It is now wired directly to the modal waitlist and `POST /api/waitlist`.

## 4) Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## 5) Deploy

Before deploy, add the same secrets in your Cloudflare Worker environment:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- (optional) `RESEND_API_KEY`
- (optional) `FROM_EMAIL`

Then deploy:

```bash
npm run deploy
```
