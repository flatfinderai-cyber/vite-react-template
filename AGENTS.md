# Cloud Agent Instructions

## Skills

The following skill files are available. Read the relevant skill before starting any implementation or testing task.

| Skill file | When to use |
|-----------|-------------|
| `.cursor/skills/run-and-test.md` | Any time you need to start the app, run type-checks or lint, exercise API routes, deploy to Cloudflare, or validate your changes end-to-end. |

## Codebase Overview

- **Frontend:** React 19 SPA under `src/react-app/`. Entry point is `src/react-app/main.tsx`.
- **Backend:** Cloudflare Worker using Hono 4, entry point `src/worker/index.ts`. All API routes are defined here.
- **Build system:** Vite 6 with `@cloudflare/vite-plugin`. A single `npm run dev` starts both the SPA dev server and a local Worker runtime.
- **Deploy target:** Cloudflare Workers (configured in `wrangler.json`).

## Key Commands (Quick Reference)

```bash
npm install          # install deps
npm run dev          # start full-stack dev server → http://localhost:5173
npm run lint         # run ESLint
npm run build        # type-check + build
npm run check        # build + wrangler deploy --dry-run (CI equivalent)
npm run deploy       # deploy to Cloudflare Workers (requires wrangler login)
npx wrangler tail    # stream live production logs
```

## Testing Conventions

- No automated test suite exists yet. All validation is currently done via `npm run check` (type-check + build) and `npm run lint`, plus manual verification against the running dev server.
- Before committing, always run `npm run lint` and `npm run build` (or `npm run check`) and confirm both pass.
- For Worker API changes, verify routes with `curl http://localhost:5173/api/<route>` while `npm run dev` is running.
- For UI changes, open http://localhost:5173 in a browser (use the `computerUse` subagent) and confirm the rendered output matches expectations.

## Cloudflare Login

`npx wrangler login` is required only for deploy and `wrangler tail`. Local development does not need Cloudflare credentials.

## Environment Variables / Secrets

Local secrets go in `.dev.vars` (gitignored). The repo currently has no required secrets. If secrets are added, document them in `.cursor/skills/run-and-test.md`.
