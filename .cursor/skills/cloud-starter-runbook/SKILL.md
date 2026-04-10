# Cloud Starter Runbook (Vite + React + Hono Worker)

Use this skill when you need to run, test, or debug this repository quickly in Cursor Cloud.

## 1) Fast setup (do this first)

1. Install dependencies:
   - `npm install`
2. Verify Cloudflare auth status:
   - `npx wrangler whoami`
3. If not logged in, authenticate:
   - `npx wrangler login`
4. Optional non-interactive auth for automation:
   - set `CLOUDFLARE_API_TOKEN` before deploy commands.

## 2) Start the app (full-stack local dev)

Code areas covered by this flow:
- Frontend: `src/react-app/*`
- Worker API: `src/worker/index.ts`

Run:
- `npm run dev`

Expected:
- Vite dev server starts on `http://localhost:5173`
- Frontend and `/api/` route are both served through the same local app

Quick smoke checks:
- Browser: open `http://localhost:5173`
- API: `curl -sS http://localhost:5173/api/` should return JSON like `{"name":"Cloudflare"}`

## 3) Area-specific workflows

### A) Frontend area (`src/react-app`)

Use when changing React UI, CSS, or client logic.

Workflow:
1. Keep `npm run dev` running.
2. Edit files under `src/react-app`.
3. Confirm HMR updates in browser.
4. Run quality checks:
   - `npm run lint`
   - `npm run build`

Concrete UI test pass criteria:
- Counter button increments.
- “Name from API” button updates value from backend response.
- No console/runtime errors in browser devtools.

### B) Worker/API area (`src/worker`)

Use when changing API routes or response payloads.

Workflow:
1. Keep `npm run dev` running.
2. Edit `src/worker/index.ts`.
3. Test endpoint directly:
   - `curl -i http://localhost:5173/api/`
4. Validate UI integration:
   - Click “Name from API” button and confirm updated value.
5. Run:
   - `npm run build`

Concrete API test pass criteria:
- Endpoint returns expected status code and JSON body.
- UI reflects updated API payload.

### C) Deploy/ops area (`wrangler.json`, worker deployment)

Use when changing Worker config or preparing deployment.

Workflow:
1. Build:
   - `npm run build`
2. High-signal preflight:
   - `npm run check`
3. Deploy when requested:
   - `npm run deploy`
4. Observe live logs (optional):
   - `npx wrangler tail`

Pass criteria:
- `check` completes without dry-run deploy errors.
- Real deploys (`npm run deploy`) are authenticated and complete successfully.
- Deployed Worker responds correctly for `/api/`.

## 4) Feature flags and environment mocking

Current state:
- No formal feature-flag system is configured in this repo yet.

Practical local mocking patterns:
1. Frontend flags:
   - Use `VITE_*` env vars in `.env.local` and read via `import.meta.env`.
2. Worker flags/bindings:
   - Add typed binding usage in Worker code and configure in `wrangler.json` (or local dev vars as needed).
3. Temporary test-only switches:
   - Use local constants/query params during debugging, then remove before commit.

Rule:
- Do not commit one-off debugging flags unless they are intended as permanent config.

## 5) Common Cloud-agent execution pattern

1. Start from repo root.
2. Run fast setup checks.
3. Start `npm run dev`.
4. Make smallest change in one code area.
5. Run area-specific validation + `npm run build`.
6. If deployment-related, run `npm run check` before `npm run deploy` (and ensure auth is ready for real deploys).

## 6) Keep this skill updated (runbook hygiene)

Whenever you discover a new testing trick or environment fix:
1. Add it to the most relevant area section above.
2. Include:
   - trigger/symptom,
   - exact command(s),
   - expected successful output/behavior.
3. Prefer small, concrete snippets over long prose.
4. Remove stale steps once they are no longer true for this codebase.
