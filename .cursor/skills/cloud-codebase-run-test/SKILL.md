---
name: cloud-codebase-run-test
description: Run, verify, and ship changes in this Vite + React + Hono + Cloudflare Workers repo. Use for local setup, dev server, lint/typecheck/build, Wrangler auth and deploy, and area-specific manual test flows.
---

# Run and test this codebase (Cloud agents)

Stack: **React 19** (Vite 6) + **Hono** Worker (`src/worker/index.ts`), deployed as a **Cloudflare Worker** with static assets from `dist/client` (`wrangler.json`). There is **no automated test runner** in `package.json` (no Vitest/Jest/Playwright); validation is **lint + TypeScript + production build + Wrangler dry-run**.

---

## First-time setup (any area)

1. **Install Node dependencies** (repo root):

   ```bash
   npm install
   ```

2. **Cloudflare / Wrangler login** (only when you need `deploy`, real remote operations, or some Wrangler commands that hit the API):

   ```bash
   npx wrangler login
   ```

   For non-interactive CI-style environments, use **`CLOUDFLARE_API_TOKEN`** with a token that has the right Workers permissions (see [Cloudflare API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)). Avoid committing tokens.

3. **Regenerate Worker types** after changing `wrangler.json` bindings or compatibility settings:

   ```bash
   npm run cf-typegen
   ```

   This refreshes `worker-configuration.d.ts` and keeps `Env` in sync.

---

## Repo map (where to work)

| Area | Path | Role |
|------|------|------|
| React app | `src/react-app/` | UI, client-side fetch to `/api/*` |
| Worker (API) | `src/worker/index.ts` | Hono routes; default export is the Worker |
| Vite + Cloudflare plugin | `vite.config.ts` | `react()` + `cloudflare()` — dev proxies Worker |
| Worker config | `wrangler.json` | Script entry, `compatibility_date` / `compatibility_flags`, assets dir, observability |
| Types | `worker-configuration.d.ts`, `tsconfig*.json` | Generated and app/worker TS configs |

---

## Global commands (run before claiming “green”)

| Goal | Command |
|------|---------|
| ESLint | `npm run lint` |
| Full gate (tsc + client build + Worker bundle + deploy dry-run) | `npm run check` |
| Production build only | `npm run build` |
| Deploy to Cloudflare | `npm run deploy` (requires auth and account routing) |

**Manual smoke after `npm run dev`:** open the app URL (default [http://localhost:5173](http://localhost:5173)), confirm UI loads, click **“Name from API”** — it should call `GET /api/` and show JSON `name` from the Worker (`src/worker/index.ts`).

**Production-like local check:** `npm run preview` (builds then serves preview).

**Live Worker logs (deployed):** `npx wrangler tail` (requires login and correct account/worker).

---

## By area: how to run and what to verify

### React app (`src/react-app/`)

- **Run:** `npm run dev` — HMR applies to React edits.
- **Verify:** UI renders; interactive elements work; network tab shows `/api/` when exercising API-backed UI.
- **Breakages:** Type errors surface in `npm run check` via `tsc` / Vite build; React hooks and a11y issues may surface in `npm run lint`.

### Worker / API (`src/worker/`)

- **Run:** Same as app — `npm run dev` serves the app and routes API through the Vite Cloudflare plugin (no separate API process).
- **Verify:** `curl -sS http://localhost:5173/api/` (or the dev server origin you are using) returns JSON consistent with Hono handlers.
- **Config:** Edits to routes or middleware → reload dev server if behavior looks stale; run `npm run check` to ensure the Worker bundle and `wrangler deploy --dry-run` succeed.
- **Bindings:** This template’s `wrangler.json` has **no KV/D1/R2/secrets** yet. When you add them, use **`.dev.vars`** locally for secrets (gitignored; see `.gitignore`). Run `npm run cf-typegen` after binding changes.

### Cloudflare / Wrangler (`wrangler.json`, deploy)

- **Dry-run (no auth required for local validation):** `npm run check` ends with `wrangler deploy --dry-run`.
- **Real deploy:** `npm run deploy` after `npx wrangler login` or with a valid `CLOUDFLARE_API_TOKEN`.
- **Verify:** Hit the deployed worker URL; run `npx wrangler tail` to confirm requests and errors.

### Tooling (ESLint, TypeScript, Vite)

- **Lint:** `npm run lint` — fix new errors in touched files; generated `worker-configuration.d.ts` may emit existing warnings.
- **Types:** `npm run check` runs `tsc` with project references — fixes must keep Worker `Env` and app types consistent.

---

## Feature flags and environment toggles

This repository **does not define application feature flags** (no LaunchDarkly/Flagsmith/env-based flag layer in source). There is **no flag runbook** here yet.

**When flags are added later:**

- Prefer **explicit env vars** or **Wrangler vars** (`wrangler.json` `[vars]` / secrets) and document the variable names in this skill.
- For **local-only** behavior, use **`.dev.vars`** for secrets and mirror keys in `.dev.vars.example` (without real values) if the team uses that pattern.

Until then, treat **`npm run dev` / `npm run build`** as unflagged; use **branch-based** or **config-file** toggles if you introduce them, and update this skill under “Maintaining this skill.”

---

## Maintaining this skill

When you discover a new command, env var, flag service, or manual test shortcut:

1. **Add it in the right section** — setup vs global commands vs the specific area (`react-app`, `worker`, `wrangler`, `tooling`).
2. **Keep tables and commands copy-paste accurate** — run the command once to confirm flags and script names.
3. **Note auth** — if a workflow needs `wrangler login`, API tokens, or dashboard steps, say so explicitly.
4. **Avoid duplicating long docs** — one or two lines plus a link to Cloudflare or Vite docs is enough for edge cases.

Commit changes to `.cursor/skills/cloud-codebase-run-test/SKILL.md` with the rest of the work so Cloud agents stay aligned with the repo.
