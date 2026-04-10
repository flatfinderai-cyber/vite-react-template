-- Migration: 0001_beta_signups
-- FlatFinder™ — Beta Signup Table
-- Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
-- FlatFinder: Housing Revolutionised Inc.

CREATE TABLE IF NOT EXISTS beta_signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  plan TEXT CHECK(plan IN ('pro','max','ultra')) DEFAULT 'pro',
  city TEXT,
  country TEXT,
  bedrooms TEXT,
  currency TEXT DEFAULT 'CAD',
  budget REAL,
  people INTEGER DEFAULT 1,
  income REAL,
  employment TEXT,
  predatory_landlord TEXT,
  urgency TEXT,
  denied_rental TEXT,
  terms_accepted INTEGER DEFAULT 0,
  privacy_accepted INTEGER DEFAULT 0,
  updates_opted_in INTEGER DEFAULT 1,
  ip_country TEXT,
  source TEXT DEFAULT 'beta-signup',
  status TEXT DEFAULT 'waitlisted',
  created_at TEXT DEFAULT (datetime('now'))
);
