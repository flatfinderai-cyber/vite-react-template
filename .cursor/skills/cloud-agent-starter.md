# Cloud Agent Starter Skill — vite-react-template

Use this skill whenever you need to build, run, lint, or test this codebase.

---

## Stack at a glance

| Layer | Tech | Entry point |
|-------|------|-------------|
| Frontend | React 19 + TypeScript | `src/react-app/App.tsx` |
| Backend / API | Hono on Cloudflare Workers | `src/worker/index.ts` |
| Bundler & dev server | Vite 6 + `@cloudflare/vite-plugin` | `vite.config.ts` |
| Worker config | Wrangler | `wrangler.json` |
| Linter | ESLint (flat config) | `eslint.config.js` |
| Package manager | npm | `package-lock.json` |

Static HTML marketing pages (`flatfinder-landing.html`, `beta-signup.html`, etc.) live at the repo root and are **not** part of the Vite/React build.

---

## 1 — Environment setup

```bash
npm install            # installs all deps; no native addons
```

No `.env` or `.dev.vars` file is required for local dev — the worker has no secrets or bindings configured. If bindings are added later, create `.dev.vars` with the required values (see `wrangler.json` and `worker-configuration.d.ts`).

### Cloudflare credentials (deploy only)

Deploying with `wrangler deploy` requires a `CLOUDFLARE_API_TOKEN` (or interactive `wrangler login`). For local dev and testing, **no Cloudflare auth is needed**.

---

## 2 — Running the app

```bash
npm run dev            # starts Vite + Workers dev server on http://localhost:5173
```

Both the React SPA and the Hono API (`/api/`) are served from the same origin. HMR is active for both layers.

### Verifying the app works

1. Open `http://localhost:5173` — you should see the Vite + React + Hono + Cloudflare landing page.
2. Click **"Name from API is: unknown"** — the button fetches `GET /api/` and displays `"Cloudflare"`.
3. Click the **count** button — the counter increments (confirms React state + HMR).

### Quick API smoke test from the terminal

```bash
curl -s http://localhost:5173/api/ | grep -q '"name"' && echo "API OK" || echo "API FAIL"
```

---

## 3 — Build and preview

```bash
npm run build          # tsc -b && vite build  →  output in dist/
npm run preview        # build + vite preview (production bundle served locally)
```

### Full pre-deploy check (no actual deploy)

```bash
npm run check          # tsc && vite build && wrangler deploy --dry-run
```

This validates types, the Vite build, **and** the Worker bundle without pushing to Cloudflare.

---

## 4 — Linting

```bash
npm run lint           # eslint .
```

The config lives in `eslint.config.js` (ESLint flat config). It checks `**/*.{ts,tsx}` with recommended rules plus `react-hooks` and `react-refresh` plugins.

---

## 5 — Testing

### Automated tests

There is **no test framework installed yet** (no Vitest, Jest, or Playwright). If you add tests:

- **Vitest** is the natural choice — it shares the Vite config and supports Workers via `@cloudflare/vitest-pool-workers`.
- Place unit tests next to source files or in a `__tests__/` directory using the pattern `*.test.ts` / `*.test.tsx`.
- Add a `"test"` script to `package.json`.

### Manual testing workflows

#### React SPA changes

1. Start the dev server (`npm run dev`).
2. Open `http://localhost:5173` in a browser (or use the `computerUse` subagent).
3. Interact with the changed UI; confirm HMR picks up edits live.

#### Worker / API changes

1. Start the dev server (`npm run dev`).
2. Use `curl` or `fetch` against `http://localhost:5173/api/...` to exercise new routes.
3. Check the terminal for Worker log output.

#### Static HTML pages (FlatFinder landing, beta-signup, etc.)

These are standalone files at the repo root. Open them directly in a browser — they do not go through Vite.

```bash
# quick check: all static HTML files parse without errors
for f in flatfinder-landing.html beta-signup.html flatfinder-plan.html flatfinder_launch_readiness_2026.html; do
  [ -f "$f" ] && echo "OK  $f" || echo "MISSING  $f"
done
```

#### Full confidence checklist

```bash
npm run lint                    # no lint errors
npm run build                   # types + bundle pass
npm run check                   # dry-run deploy succeeds
# then: manual browser or curl verification of changed behavior
```

---

## 6 — Feature flags

There are **no application-level feature flags** in this codebase. `wrangler.json` sets `compatibility_flags: ["nodejs_compat"]` — that is a Workers runtime flag, not a product toggle.

If feature flags are added later (e.g., via environment variables or a service like LaunchDarkly), document them here with instructions for how to set or mock each flag during local development.

---

## 7 — Deployment

```bash
npm run build && npm run deploy   # build then wrangler deploy
npx wrangler tail                 # live-stream Worker logs
```

Requires `CLOUDFLARE_API_TOKEN` or a prior `wrangler login` session.

---

## 8 — Key file map

```
.
├── src/
│   ├── react-app/        # React SPA (App.tsx, main.tsx, styles, assets)
│   └── worker/           # Hono Worker entry (index.ts)
├── public/               # Static assets served by Vite (vite.svg)
├── index.html            # Vite HTML entry for the SPA
├── vite.config.ts        # Vite + Cloudflare plugin config
├── wrangler.json         # Worker name, bindings, assets, compat flags
├── eslint.config.js      # ESLint flat config
├── tsconfig.json         # TS project references root
├── tsconfig.app.json     # TS config for src/react-app
├── tsconfig.worker.json  # TS config for src/worker
├── tsconfig.node.json    # TS config for Vite/Node tooling
├── worker-configuration.d.ts  # Generated Env type from wrangler types
├── flatfinder-*.html     # Standalone marketing / planning pages
└── package.json          # Scripts, deps
```

---

## 9 — Keeping this skill up to date

When you discover a new testing trick, environment quirk, or runbook step:

1. **Open this file** (`.cursor/skills/cloud-agent-starter.md`).
2. **Add the info** to the appropriate section — or create a new section if it doesn't fit.
3. **Keep entries concrete**: include the exact command, config key, or file path so future agents can act on it immediately.
4. **Date your additions** with a `<!-- Added YYYY-MM-DD -->` comment so stale info can be identified later.
5. **Commit the update** alongside the related code change so the skill and the codebase stay in sync.
