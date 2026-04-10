# Run & Test Skill

Use this skill whenever you need to start the application, run checks, test API routes, or deploy — for any task in this repo.

---

## Stack at a Glance

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 6 (SPA, `src/react-app/`) |
| Backend | Hono 4 on Cloudflare Workers (`src/worker/index.ts`) |
| Build/Deploy | `@cloudflare/vite-plugin` + Wrangler 4 |
| Language | TypeScript throughout |
| Lint | ESLint 9 + typescript-eslint |

No Docker, no database bindings, no auth layer, and no automated test suite are present in the current codebase.

---

## Prerequisites

### 1. Install dependencies
```bash
npm install
```
Run this once after cloning or whenever `package.json` changes.

### 2. Cloudflare login (deploy/tail only)
```bash
npx wrangler login
```
This opens a browser OAuth flow and writes a token to `~/.wrangler/config/default.toml`. It is only required when you need to deploy (`npm run deploy`) or stream live logs (`npx wrangler tail`). Local development with `npm run dev` does **not** require Cloudflare credentials.

### 3. Secrets / environment variables
Wrangler reads local secrets from `.dev.vars` (gitignored). The repo does not currently define any required secrets — the Worker at `src/worker/index.ts` has no `env.*` reads. When secrets are added:
1. Copy or create `.dev.vars` at the repo root.
2. Add `KEY=value` lines (no quotes needed).
3. Use `npx wrangler secret put KEY` to push to production.

---

## Starting the App

### Local dev server (primary workflow)
```bash
npm run dev
```
- Starts Vite at **http://localhost:5173** with HMR.
- The `@cloudflare/vite-plugin` simultaneously runs a local Worker runtime so `/api/` routes are live — no separate Worker process needed.
- The React app (`src/react-app/App.tsx`) fetches `/api/` from the Worker on button click and displays the response.

### Preview a production build locally
```bash
npm run preview
```
Runs `npm run build` first, then serves the bundled output via Vite preview. Useful for catching build-time issues before deploying.

---

## Running Checks

### Type-check + build + deploy dry-run (CI-equivalent)
```bash
npm run check
```
Equivalent to `tsc && vite build && wrangler deploy --dry-run`. This is the single command to confirm the entire stack compiles and would deploy cleanly.

### Lint only
```bash
npm run lint
```
Uses ESLint 9 with typescript-eslint. Fix lint errors before committing.

### Build only
```bash
npm run build
```
Runs `tsc -b` then `vite build`. Output goes to `dist/client/` (SPA assets) and a Worker bundle.

---

## Testing Areas and Workflows

### Frontend — React SPA (`src/react-app/`)

There is currently no automated test suite. Manual verification steps:

1. Start `npm run dev`.
2. Open http://localhost:5173 in a browser.
3. Confirm the Vite/React/Hono/Cloudflare logos render.
4. Click the **count** button — counter increments in UI state.
5. Click the **"Name from API"** button — the page should update to show `Cloudflare` (the value returned by the Worker `/api/` route).

If the API call fails, the button text stays `unknown`. Check the browser console and the terminal running `npm run dev` for errors.

**Adding a new component:**
- Edit files under `src/react-app/`.
- HMR will hot-reload the browser — no restart needed.
- Run `npm run lint` and `npm run build` to validate before committing.

### Worker / API (`src/worker/index.ts`)

The Worker uses Hono. All API routes live in or are imported from `src/worker/index.ts`.

**Testing a route locally:**
```bash
# With dev server running on port 5173:
curl http://localhost:5173/api/
# Expected: {"name":"Cloudflare"}
```

**Adding a new route:**
1. Add the route handler to `src/worker/index.ts`, e.g.:
   ```ts
   app.get("/api/hello", (c) => c.json({ message: "hello" }));
   ```
2. The dev server hot-reloads the Worker — no restart needed.
3. Verify with `curl http://localhost:5173/api/hello`.
4. Run `npm run check` to confirm types and build.

**Worker bindings (D1, KV, R2, etc.):**
- Add bindings to `wrangler.json` and regenerate types with `npm run cf-typegen`.
- Local bindings are defined in `wrangler.json` under `[env.dev]` or directly. Persist local D1/KV data lives in `.wrangler/state/` (gitignored).

### TypeScript Compilation

```bash
npx tsc --noEmit
```
Or use `npm run build` which runs `tsc -b` as the first step. There are three `tsconfig` files:
- `tsconfig.app.json` — frontend
- `tsconfig.worker.json` — Worker
- `tsconfig.node.json` — Vite config

### Linting

```bash
npm run lint
```
Config is in `eslint.config.js`. Fix all errors before committing; warnings are acceptable.

---

## Deployment

### Deploy to Cloudflare Workers
```bash
npm run build && npm run deploy
```
Requires `wrangler login` to be completed. Deploys the Worker at the name defined in `wrangler.json` (`"name": "vite-react-template"`).

### Stream live logs from production
```bash
npx wrangler tail
```
Streams real-time request/exception logs from the deployed Worker. Useful for debugging production issues.

---

## Static HTML Pages

The repo contains standalone HTML marketing pages (`flatfinder-landing.html`, `beta-signup.html`, `flatfinder-plan.html`). These are **not** served by Vite or the Worker — they are plain files. To preview them:

```bash
# Quick one-liner (Python, no install needed):
python3 -m http.server 8080
# Then open http://localhost:8080/flatfinder-landing.html
```

`beta-signup.html` has a form that posts to a Formspree endpoint. In dev, submissions will go to the real Formspree URL unless you stub it. To test the form flow without real submissions, temporarily replace the `action` attribute with a local echo endpoint.

---

## Feature Flags

No feature flag system is currently implemented. When one is added (e.g. Statsig, LaunchDarkly), document the SDK init call location and how to override flags in `.dev.vars` here.

---

## Common Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `npm run dev` fails with Worker error | Wrangler compat issue | Check `compatibility_date` in `wrangler.json`; run `npx wrangler --version` |
| `/api/` returns HTML 404 in browser | Build not run before preview | Run `npm run build` first, or use `npm run dev` |
| `wrangler deploy` prompts for login | Not authenticated | `npx wrangler login` |
| `tsc` errors after adding Worker binding | Types not regenerated | `npm run cf-typegen` |
| ESLint fails in CI | Lint not run before push | `npm run lint` locally before pushing |

---

## Keeping This Skill Up to Date

Whenever you discover a new testing trick, runbook step, or environment quirk, **update this file in the same PR as the code change**. Specifically:

- **New npm script added** → add it to the "Running Checks" table and describe when to use it.
- **New Wrangler binding added** (D1, KV, R2, Queue, etc.) → document the local setup steps under "Worker / API".
- **Secrets or env vars required** → add them to the "Secrets / environment variables" section with `.dev.vars` example lines.
- **New third-party service integrated** (auth, database, feature flags, email) → add a dedicated subsection under "Testing Areas".
- **New test framework added** → replace the "no automated test suite" note with the actual test command and location of test files.
- **New static page added** → note it in the "Static HTML Pages" section.

The goal is that a Cloud agent reading this file cold should be able to start the app, hit every meaningful code path, and validate their changes within five minutes — without consulting anyone.
