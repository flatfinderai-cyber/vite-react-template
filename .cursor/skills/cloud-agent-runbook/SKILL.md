---
name: cloud-agent-runbook
description: Practical setup, login, run, and test workflows for Cloud agents working in this Vite + React + Hono + Cloudflare Workers repository.
---
# Cloud Agent Runbook

Use this skill at the start of any task in this repository. It is the default "how do I run this and prove it works?" guide for Cloud agents.

## Codebase map

- `src/react-app/*`: React SPA mounted from `index.html`.
- `src/worker/index.ts`: Hono Worker routes served under `/api/*`.
- Root `*.html`: standalone pages served directly by Vite during local dev, especially `flatfinder-landing.html`, `beta-signup.html`, `flatfinder-plan.html`, and `flatfinder_launch_readiness_2026.html`.
- `package.json`: primary install, dev, lint, build, preview, deploy, and dry-run commands.
- `wrangler.json` and `vite.config.ts`: Cloudflare/Vite integration points.

## Quick start from repo root

1. Confirm the toolchain:
   - `node -v`
   - `npm -v`
2. Install dependencies:
   - `npm install`
3. Start local development in a long-running session:
   - `npm run dev -- --host 0.0.0.0`
4. Use the printed local URL. The default is usually `http://127.0.0.1:5173`.

Common local URLs:

- SPA: `http://127.0.0.1:5173/`
- Worker API: `http://127.0.0.1:5173/api/`
- Landing page: `http://127.0.0.1:5173/flatfinder-landing.html`
- Beta signup page: `http://127.0.0.1:5173/beta-signup.html`
- Launch plan pages: `http://127.0.0.1:5173/flatfinder-plan.html` and `http://127.0.0.1:5173/flatfinder_launch_readiness_2026.html`

If port `5173` is busy, Vite will usually choose another port. Use the URL printed in the terminal instead of assuming the default.

## Cloudflare login and remote-only commands

Local development does not require Cloudflare login for:

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run preview`

Cloudflare login is required for remote Wrangler commands such as:

- `npm run check`
- `npm run deploy`
- `npx wrangler tail`
- `npx wrangler whoami`

Recommended auth flow:

1. Check current Wrangler auth state:
   - `npx wrangler whoami`
2. If not logged in, authenticate:
   - `npx wrangler login`
3. Re-run:
   - `npx wrangler whoami`

If browser-based Wrangler login is unavailable in the Cloud environment, do not block local development on it. Finish local validation first, then report remote deploy validation as pending.

There is no in-app end-user login flow in the current codebase, so "logging in" normally means Wrangler auth for deploy and Cloudflare account operations.

## Feature flags, env vars, and safe mocks

This repository does not currently define checked-in feature flags or a standard local `.env` workflow.

Practical defaults:

- Do not invent required flags for local work unless the task explicitly introduces them.
- The sample API response is controlled in `src/worker/index.ts`.
- The SPA fetch button in `src/react-app/App.tsx` calls `/api/`.
- `beta-signup.html` includes a Formspree placeholder. Without a real `FORMSPREE_ID`, the page stays in a safe dev mode and logs a warning instead of submitting live data.

When you need to keep moving without a finished backend or third-party service:

- Mock API responses at the Worker boundary in `src/worker/index.ts`.
- Leave the signup page in its built-in dev mode if no Formspree ID is available.
- Remove temporary mocks before commit unless the task is explicitly to add a durable stub or fake backend.

## Testing workflow by codebase area

### 1. React SPA (`src/react-app`)

Use this when changing React components, styles, state handling, or client-side fetch logic.

Recommended workflow:

1. Start dev server: `npm run dev -- --host 0.0.0.0`
2. Open `/`
3. Verify the counter increments
4. Click the API button and confirm the label changes from `unknown` to the current Worker response
5. Run:
   - `npm run lint`
   - `npm run build`

If you edited UI or interaction behavior, also do a browser-based manual test and capture a video or screenshot for the final walkthrough.

### 2. Worker / API (`src/worker`)

Use this when changing routes, response payloads, request handling, or integration points exposed through `/api/*`.

Recommended workflow:

1. Start dev server: `npm run dev -- --host 0.0.0.0`
2. Validate the route directly:
   - `curl -s http://127.0.0.1:5173/api/`
3. Open `/` and click the API button to confirm the frontend still consumes the Worker response correctly
4. Run:
   - `npm run build`
   - `npm run check` only if Wrangler auth is available

If `/api/` does not resolve locally, check `vite.config.ts` first and confirm the Cloudflare Vite plugin is still enabled.

### 3. Static HTML pages (repo root `*.html`)

Use this when editing landing pages, launch-readiness docs, the beta signup flow, or standalone HTML/CSS/JS outside the React SPA.

Recommended workflow:

1. Start dev server: `npm run dev -- --host 0.0.0.0`
2. Open the exact page path you changed, for example:
   - `/flatfinder-landing.html`
   - `/beta-signup.html`
   - `/flatfinder-plan.html`
   - `/flatfinder_launch_readiness_2026.html`
3. Validate the page-specific behavior:
   - `flatfinder-landing.html`: hero loads, CTA links are correct, layout still renders cleanly
   - `beta-signup.html`: plan selection, step progression, modal open/close, validation states, and submit behavior
   - `flatfinder-plan.html` and `flatfinder_launch_readiness_2026.html`: tabs/sections render correctly and there are no obvious console errors
4. Capture browser evidence for any user-facing change

For `beta-signup.html`, remember that no real submission happens until a valid Formspree ID is configured. In the default dev state, a console warning is expected and is not by itself a bug.

### 4. Tooling and deploy config (`package.json`, `vite.config.ts`, `wrangler.json`)

Use this when changing scripts, build behavior, Vite integration, Worker config, or deploy settings.

Recommended workflow:

1. Run:
   - `npm run lint`
   - `npm run build`
2. If Wrangler auth is available, also run:
   - `npm run check`
3. If deploy behavior changed and remote access is available:
   - `npm run deploy`
   - `npx wrangler tail`

Important local expectation:

- `npm run build` runs `tsc -b` and `vite build`
- `wrangler.json` points static assets at `dist/client`

If build or local routing breaks after tooling edits, check that `vite.config.ts` still includes `cloudflare()` and that `wrangler.json` still references the correct Worker entry and asset directory.

## Before you hand work back

Use the lightest set of checks that fully proves the area you changed:

- React-only change: manual browser check on `/`, plus `npm run lint` and `npm run build`
- Worker/API change: `curl` on `/api/`, browser verification from `/`, plus `npm run build`
- Static HTML change: open the exact page in the browser and test the changed interaction or layout
- Deploy/tooling change: `npm run lint`, `npm run build`, and `npm run check` if authenticated

Prefer local proof before remote deploy proof. Only depend on Cloudflare auth when the task actually touches deploy behavior or remote Wrangler commands.

## Keep this skill current

Whenever you discover a new testing trick, setup shortcut, or failure recovery step:

1. Add the exact command, URL, or click path that worked.
2. Put it under the closest codebase-area section instead of a generic note dump.
3. Mark whether it is local-only, requires Wrangler login, or depends on an external service.
4. Include the failure symptom and fastest known fix if that knowledge saves time.
5. Delete stale instructions as soon as the workflow changes.
