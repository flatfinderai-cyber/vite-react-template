/*
  worker-configuration.d.ts
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  PROPRIETARY AND CONFIDENTIAL
*/

interface Env {
  DB: D1Database;
  BENNY_SYSTEM_PROMPT?: string;
  ANTHROPIC_API_KEY?: string;
  ENVIRONMENT?: string;
}
