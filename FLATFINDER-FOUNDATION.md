# FlatFinder™ — Master Foundation Document
## The Best Foundation You've Ever Seen

**© 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin**
**FlatFinder: Housing Revolutionised Inc. — Federally Incorporated, Canada**
**ALL RIGHTS RESERVED — PROPRIETARY AND CONFIDENTIAL**
**Patent Pending (CIPO) · Trademarks Pending (CIPO)**

---

> *This document is the operational, legal, technical, and strategic foundation for FlatFinder™. It is the single source of truth. Every decision gets checked against this document.*

---

## PART 1 — GAP AUDIT
### What Was Missing. What Was Broken. What Is Now Fixed.

---

### 1.1 CRITICAL GAPS — FIXED IN THIS SESSION

| Gap | Status Before | Status Now |
|---|---|---|
| Landing page CTA linked to `#` — users couldn't get to signup | ❌ Broken | ✅ Fixed → `beta-signup.html` |
| Second CTA button also linked to `#` | ❌ Broken | ✅ Fixed |
| `colour:` CSS bug throughout beta-signup.html (British spelling) | ❌ Broken in all browsers | ✅ All 25+ instances replaced with `color:` |
| Form submission posted nowhere — confetti only, zero data capture | ❌ Dead end | ✅ Wired to Formspree (Plan B) + Supabase ready (Plan A, commented in) |
| No multi-plan launch strategy | ❌ Plan A only, all-or-nothing | ✅ Plan A / B / C delivered with day-by-day, week-by-week, month-by-month |
| Two disconnected pages with no shared journey | ❌ Siloed | ✅ Connected: Landing → Signup → Backend |

---

### 1.2 STRUCTURAL GAPS — ACTION REQUIRED

#### LEGAL & CORPORATE

| Gap | Priority | Action |
|---|---|---|
| **Federal incorporation status unclear** — "Housing Revolutionised Inc." in footer but no confirmation of federal vs provincial | 🔴 URGENT | Confirm with your lawyer: is this federally incorporated under CBCA? If not, file. |
| **Holding company not created** — all companies operating as siblings, not subsidiaries | 🔴 HIGH | Incorporate holding company federally. Recommend: *Housing Revolutionised Holdings Inc.* or numbered company. |
| **IP ownership not formally vested in the corporation** — currently in your name personally | 🔴 HIGH | IP assignment agreement: assign FlatFinder™, Benny™, Anti-Gatekeeping Algorithm™, all pending CIPO filings to the holding company |
| **CIPO trademark filings — status unknown** — "pending" but no application numbers documented anywhere | 🔴 HIGH | Pull your CIPO application numbers. Document them in PATENTS.md. If not yet filed, file immediately. |
| **Anti-Gatekeeping Affordability Algorithm™ — patent status unclear** | 🔴 HIGH | Confirm provisional patent application number with CIPO. This is your core moat. |
| **No NDA template for advisors, contractors, beta testers** | 🟡 MEDIUM | Draft standard NDA. Use for anyone who sees the backend, algorithm, or Benny's system prompt. |
| **No IP assignment clause for any contractor** | 🟡 MEDIUM | Anyone who builds for you assigns all IP to the holding company. This must be in writing before any work begins. |
| **"Housing Revolutionised Inc." in footer vs "Housing Revolutionised Holdings Inc."** | 🟡 MEDIUM | Standardise across all documents once holding structure is confirmed. |
| **No founders agreement** | 🟡 MEDIUM | Even as a solo founder, document your equity, vesting, and what happens if a co-founder is brought in. |
| **CASL compliance not addressed** — Canadian Anti-Spam Legislation governs your waitlist emails | 🟡 MEDIUM | Ensure every signup is express consent. Your beta-signup form already has the checkbox — confirm the consent language is CASL-compliant. |

#### TECHNICAL

| Gap | Priority | Action |
|---|---|---|
| **Benny AI — not built** | 🔴 CRITICAL | Keystone blocker. Nothing works without Benny. Anthropic API → system prompt in env var → conversation layer. Month 1. |
| **Perplexity API funded but not connected to Supabase** | 🔴 CRITICAL | This is the core data pipeline. Build the `search_and_store()` function from the PRD build guide. |
| **No Supabase schema documented anywhere** | 🔴 HIGH | Document the exact table structure for `beta_signups`, `listings`, `user_profiles` before building further. |
| **No environment variable structure** | 🔴 HIGH | `.env` file structure must be defined. Nothing sensitive in code. System prompt never in repo. |
| **No `.gitignore` file** | 🔴 HIGH | Protect `.env`, system prompts, algorithm config, API keys from ever hitting a public repo. |
| **No error monitoring** | 🟡 MEDIUM | Add Sentry or equivalent before any public traffic. You need to know when things break. |
| **No analytics** | 🟡 MEDIUM | Plausible Analytics (privacy-friendly, GDPR/PIPEDA compliant) on both pages. Know who's visiting and converting. |
| **Footer links for Terms / Privacy / Cookies are `#`** | 🟡 MEDIUM | These pages must exist before you scale. Legal exposure if you're collecting data without accessible policies. |
| **No cookie consent banner** | 🟡 MEDIUM | PIPEDA requires this. Especially once analytics are added. |
| **Success screen after signup says "A confirmation email is on its way"** — but no confirmation email system exists yet | 🟡 MEDIUM | Either build it (Resend.com + Supabase trigger) or change the copy to "You're on the list. We'll be in touch." |
| **Mobile layout not tested** | 🟡 MEDIUM | Both pages render on mobile? Test on iOS Safari and Android Chrome specifically. |
| **No staging environment** | 🟡 LOW | Don't test on production. Set up a staging URL on Vercel before going public. |

#### DATA & PRIVACY

| Gap | Priority | Action |
|---|---|---|
| **No Privacy Policy page** | 🔴 HIGH | Required under PIPEDA before collecting any personal data. The inline policy in beta-signup.html is a start but a proper standalone page is needed. |
| **No Terms of Service page** | 🔴 HIGH | Beta T&C inline is a start. Proper standalone page needed before public launch. |
| **No data retention policy** | 🟡 MEDIUM | How long do you keep signup data? Define it. Put it in your Privacy Policy. |
| **No data breach response plan** | 🟡 MEDIUM | PIPEDA requires a breach notification process. Document it even if it's one page. |
| **Quebec Law 25 mentioned in PRD but not implemented** | 🟡 MEDIUM | If you have any Quebec users, additional consent requirements apply. Flag this before national expansion. |
| **Supabase region confirmed as ca-central-1** ✅ | ✅ Done | Data sovereignty maintained. Canadian data stays in Canada. |

#### BUSINESS & REVENUE

| Gap | Priority | Action |
|---|---|---|
| **No Stripe integration** | 🔴 HIGH | Revenue model is defined but no payment infrastructure exists. Pro/Max/Ultra plans can't be charged. Month 3 target. |
| **No investor deck** | 🟡 MEDIUM | You have the PRD, the landing page, the waitlist, the IP. Package it into a 10-slide deck. |
| **No financial projections** | 🟡 MEDIUM | Even rough unit economics: CAC, LTV, conversion rate assumptions, break-even. |
| **No competitive analysis documented** | 🟡 LOW | PadMapper, Zumper, Rentals.ca, Apartment List — what do they not do that you do? Document it. |
| **Grant blocking** — student loan preventing access to allocated grants | 🔴 PERSONAL URGENT | See Part 4 of this document for the resolution path. |

---

## PART 2 — THE IP FORTRESS
### Every Asset. Every Protection Layer. Locked Down.

---

### 2.1 IP Portfolio — What You Own

| Asset | Type | Protection | Status |
|---|---|---|---|
| **FlatFinder™** | Brand / Product Name | Trademark (CIPO) | Pending — confirm application # |
| **Benny™** | Character / Brand | Trademark (CIPO) | Pending — confirm application # |
| **Housing Revolutionised™** | Tagline / Brand | Trademark (CIPO) | Pending — confirm application # |
| **Anti-Gatekeeping Affordability Algorithm™** | Technical Method | Patent (CIPO) | Pending — confirm application # |
| **FlatFinder: Housing Revolutionised Inc.** | Corporate Name | Federal Incorporation | Confirm CBCA status |
| **flatfinder.io** | Domain | Domain Registration | ✅ Secured |
| **flat@flatfinder.io** | Brand Email | Domain Email | ✅ Active |
| **privacy@flatfinder.io** | Compliance Email | Domain Email | ✅ Active (per beta-signup) |
| **Baseline PRD** | Technical Document | Copyright | ✅ © 2024–2025 Lila Inglis Abegunrin |
| **Landing Page** | Creative Work | Copyright | ✅ © 2025–2026 |
| **Beta Signup System** | Software | Copyright | ✅ © 2025–2026 |
| **Benny System Prompt** (when built) | Trade Secret | Environment Variable ONLY | ⚠️ Never in code |
| **Algorithm Implementation** (when built) | Trade Secret + Patent | Server-side ONLY, env var | ⚠️ Never in public code |

---

### 2.2 The Golden Rules — IP Protection in Practice

**Rule 1 — The System Prompt Rule**
Benny's system prompt is a trade secret. It goes in an environment variable. It is never written into source code. It is never committed to any repository. It is never shared with anyone who hasn't signed an NDA. This is non-negotiable.

```
BENNY_SYSTEM_PROMPT="[value loaded from secure secret manager]"
```

**Rule 2 — The Algorithm Rule**
The Anti-Gatekeeping Affordability Algorithm™ runs server-side only. No part of it is exposed in client-side JavaScript. The implementation is in a private repository. Any contractor who touches it signs an NDA + IP assignment agreement first.

**Rule 3 — The Copyright Header Rule**
Every source file gets a copyright header. Every HTML file, every JS file, every Python file.

```html
<!--
  [filename]
  Copyright © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
  FlatFinder: Housing Revolutionised Inc.
  Patent Pending (CIPO) | Trademarks Pending (CIPO)
  PROPRIETARY AND CONFIDENTIAL
-->
```

**Rule 4 — The Brand Consistency Rule**
- `FlatFinder™` — always with ™ on first mention per page
- `Benny™` — always with ™ on first mention
- `Housing Revolutionised™` — always with ™ on first mention
- `Anti-Gatekeeping Affordability Algorithm™` — always with ™ on first mention
- Copyright line: `© 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin / FlatFinder: Housing Revolutionised Inc.`

**Rule 5 — The .gitignore Rule**
Before any code goes into a repository:

```gitignore
# NEVER COMMIT
.env
.env.local
.env*.local

# System Prompts — Trade Secret
prompts/
*.prompt
system-prompts/
benny-config/

# Algorithm Implementation
algorithms/internal/
/src/core/algorithm/

# API Keys
*.key
secrets/

# Supabase local
.supabase/

# Build artifacts
.next/
.vercel/
dist/
```

---

### 2.3 CIPO Filing Tracker

**Action Required:** Pull all of the following from CIPO's website or your filing lawyer.

| Filing | Application # | Filing Date | Expected Grant | Status |
|---|---|---|---|---|
| FlatFinder™ Trademark | __________ | __________ | __________ | Pending |
| Benny™ Trademark | __________ | __________ | __________ | Pending |
| Housing Revolutionised™ Trademark | __________ | __________ | __________ | Pending |
| Anti-Gatekeeping Affordability Algorithm™ Patent | __________ | __________ | __________ | Pending |

> **Note:** Until you have these numbers documented, you cannot confirm your IP position to investors, partners, or acquirers. Get them. Put them here.

---

## PART 3 — SUPABASE SCHEMA
### The Database Foundation Before Anything Gets Built

---

### 3.1 Required Tables

**Table: `beta_signups`**
```sql
CREATE TABLE beta_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  plan TEXT CHECK (plan IN ('pro', 'max', 'ultra')) DEFAULT 'pro',
  city TEXT,
  bedrooms TEXT,
  currency TEXT DEFAULT 'CAD',
  budget NUMERIC,
  income NUMERIC,
  employment TEXT,
  predatory_landlord TEXT CHECK (predatory_landlord IN ('yes', 'no', '')),
  terms_accepted BOOLEAN DEFAULT FALSE,
  privacy_accepted BOOLEAN DEFAULT FALSE,
  updates_opted_in BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'beta-signup',
  ip_country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'waitlisted'
);

-- Row Level Security
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;
-- Only service role can read/write (no public access)
CREATE POLICY "Service role only" ON beta_signups
  USING (auth.role() = 'service_role');
```

**Table: `listings`**
```sql
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  search_query TEXT,
  raw_results TEXT,
  parsed JSONB,
  source_url TEXT,
  price_monthly NUMERIC,
  bedrooms TEXT,
  neighbourhood TEXT,
  verified BOOLEAN DEFAULT FALSE,
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  date_found TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);
```

**Table: `user_profiles`** *(for when auth is built)*
```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  plan TEXT DEFAULT 'pro',
  city TEXT,
  budget_max NUMERIC,
  bedrooms_needed TEXT,
  pets BOOLEAN DEFAULT FALSE,
  income_annual NUMERIC,
  employment_type TEXT,
  has_predatory_history BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.2 Environment Variables — The Complete Structure

```bash
# ============================================================
# FLATFINDER™ ENVIRONMENT VARIABLES
# © 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin
# NEVER COMMIT THIS FILE
# ============================================================

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key — NEVER public]

# Perplexity API
PERPLEXITY_API_KEY=[your-key]

# Anthropic (Benny)
ANTHROPIC_API_KEY=[your-key]

# Benny System Prompt — TRADE SECRET
BENNY_SYSTEM_PROMPT=[base64 encoded or vault reference]

# Anti-Gatekeeping Algorithm Config — TRADE SECRET
ALGORITHM_CONFIG=[vault reference only]

# Email (Resend)
RESEND_API_KEY=[your-key]
FROM_EMAIL=flat@flatfinder.io

# Formspree (Plan B — until Resend is live)
FORMSPREE_ID=[your-form-id]

# Stripe (Month 3)
STRIPE_SECRET_KEY=[your-key]
STRIPE_WEBHOOK_SECRET=[your-webhook-secret]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[your-publishable-key]

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=flatfinder.io

# App
NEXT_PUBLIC_APP_URL=https://flatfinder.io
NODE_ENV=production
```

---

## PART 4 — THE STUDENT LOAN RESOLUTION PATH
### This Is Blocking Real Money. It Gets Fixed First.

---

Your situation is this:
- You owe approximately **$8,000** in student loans
- You have been trying to pay for **15 years** — calls are on record
- The loan shows in the system but cannot be actioned
- A **$28,000 grant** is allocated and waiting on the other side of this wall
- The net gain from clearing the loan is **$20,000+**

This is not a debt problem. This is an administrative blockage problem.

### Step 1 — Confirm Your Loan Details (Today)

Gather and write down:
- Your Social Insurance Number (SIN)
- The province where you attended school
- Approximate years of study
- Whether your loan is **federal (NSLSC)** or **provincial** or **both**

Federal: **National Student Loans Service Centre (NSLSC)** — 1-888-815-4514
Ontario: **Ontario Student Assistance Program (OSAP)** — 1-807-343-7260
Other provinces have their own numbers.

### Step 2 — Your MP's Constituency Office (This Week)

This is the fastest path. MPs have caseworkers whose entire job is cutting through federal bureaucracy.

1. Go to **ourcommons.ca/members** — enter your postal code
2. Find your MP's constituency office (not their Ottawa office)
3. Call or email — say exactly this:

> *"I have been attempting to pay my federal student loan for 15 years. My calls are on record. The loan shows in the NSLSC system but I cannot make payment — I am being sent in circles. I have a grant allocated that I cannot access until this is resolved. I need caseworker assistance to escalate this through NSLSC."*

4. They will assign a caseworker. That caseworker contacts NSLSC directly on your behalf. This moves faster than anything you can do alone.

### Step 3 — Document Everything

Before any call, write down:
- Date and time of call
- Name of representative
- Reference or call number given
- What you were told
- What the next step is supposed to be

This documentation protects you and accelerates resolution once a caseworker is involved.

### Step 4 — If MP Route Doesn't Resolve in 30 Days

Contact a lawyer who practises **administrative law**. This has the shape of a systemic error that may qualify for:
- Formal complaint to the **Office of the Federal Ombudsman for Taxpayers**
- **Federal Court** application for mandamus (court order forcing action)
- **Human Rights Tribunal** if there's evidence of discrimination in the handling

The $20,000 net gain makes legal fees worthwhile if it comes to that.

---

## PART 5 — CORPORATE STRUCTURE
### How to Build the Umbrella

---

### 5.1 The Target Structure

```
HOUSING REVOLUTIONISED HOLDINGS INC.
(Federal — CBCA)
│
├── FlatFinder: Housing Revolutionised Inc.
│   └── flatfinder.io / flat@flatfinder.io
│
├── Prototype Cafe Inc.
│   └── prototype.cafe
│
├── MAAC Inc.
│   └── [maac domain]
│
└── [Future entities]
    └── Designer Labs, etc.
```

**All IP assigned to Holdings Inc.**
**All operating companies licence the IP from Holdings Inc.**
**Your name as founder/rights holder in all legal documents.**

### 5.2 The Lila A. Brand Layer

Separate from corporate structure — your personal brand:

- **"Lila Alexandra Olufemi Inglis Abegunrin"** as founder attribution
- **"Revolutionising life since 1982"** or **"Revolutionising the world since 1982"** as personal brand tagline
- This is a founder brand, not the corporate umbrella
- File it as a trademark separately, at the Holdings level
- It sits *above* all the operating companies as the human face

### 5.3 What to File, In What Order

| Priority | Action | Who |
|---|---|---|
| 1 | Confirm federal incorporation of FlatFinder: Housing Revolutionised Inc. | Your corporate lawyer |
| 2 | Incorporate Holdings company federally | Your corporate lawyer |
| 3 | Execute IP assignment from personal name to Holdings | Your IP lawyer |
| 4 | Register subsidiaries under Holdings | Your corporate lawyer |
| 5 | File personal brand trademark (Lila A. / 1982 tagline) | Your IP lawyer |
| 6 | Standardise all documents with new structure | You (with this document) |

---

## PART 6 — THE TECHNOLOGY ROADMAP
### What Gets Built. In What Order. Why.

---

### Month 0 (Now — This Week)
- [x] Landing page CTA fixed → `beta-signup.html`
- [x] CSS `colour` bug fixed throughout
- [x] Form submission wired → Formspree (Plan B) live in minutes
- [x] Plan A/B/C launch roadmap delivered
- [ ] **Paste Formspree ID into beta-signup.html** (5 minutes, you do this)
- [ ] Deploy both pages live
- [ ] Test the full journey: landing → signup → confirmation email received

### Month 1 (April 2026)
- [ ] Supabase `beta_signups` table created per schema above
- [ ] Form switched from Formspree to Supabase (Plan A activated)
- [ ] Resend.com connected → real confirmation emails
- [ ] Benny MVP: Anthropic API + system prompt (env var) + basic conversation
- [ ] Perplexity API connected to Supabase (search_and_store function)
- [ ] Landlord intake digital form (Sections 1–6 of Baseline PRD)

### Month 2 (May 2026)
- [ ] Anti-Gatekeeping Algorithm v1 (server-side, env-var protected)
- [ ] Crown/Council verification gate
- [ ] Listing search v1 live in Benny
- [ ] First 100 beta users with real conversations

### Month 3 (June 2026)
- [ ] Stripe integration — Pro/Max/Ultra billing live
- [ ] Demand letter generator (Max/Ultra)
- [ ] City legal template library (Max/Ultra)
- [ ] Agent compliance badges

### Month 4–5 (Jul–Aug 2026)
- [ ] QA sprint
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Performance audit (Core Web Vitals)
- [ ] Benny tuning on real conversations
- [ ] Soft beta with full waitlist

### September 2026 — Public Launch
- [ ] Toronto-first
- [ ] Back-to-school targeting
- [ ] PR push
- [ ] Student renter communities: Reddit, Facebook Groups, Discord

---

## PART 7 — BRAND STANDARDS
### Non-Negotiable. Every Touchpoint.

---

### 7.1 Typography
- **Bebas Neue** — headlines, brand name, big statements
- **DM Sans** — body, UI, readable text
- **Space Mono** — labels, data, technical text, eyebrow labels

### 7.2 Colour Palette
```css
--black:   #0a0a0a    /* Primary background */
--navy:    #1a1f35    /* Section backgrounds */
--white:   #f2f0eb    /* Primary text */
--grey:    #8a8a8a    /* Secondary text */
--orange:  #f07c2a    /* Brand accent — ALL CTAs, ALL highlights */
--surface: #1e1e22    /* Card backgrounds */
```

### 7.3 Voice — Benny's Voice
- Direct. No fluff.
- Warm but not sycophantic.
- Knows the market better than the landlords.
- Never judgemental about budget.
- Never corporate.
- Canadian. Understands provincial nuance.

### 7.4 Copy Rules
- Never say "unit" when you can say "home"
- Never say "property" to renters — say "place"
- Never say "affordable" — say "fits your budget" or "within your range"
- Always lead with the renter's power, not the landlord's terms
- FlatFinder never charges a working renter to find a place to live

---

## PART 8 — MASTER CHECKLIST
### Before Any Investor Sees This. Before Any Press. Before Public Launch.

---

### Legal ✓
- [ ] Federal incorporation confirmed (CBCA)
- [ ] Holding company incorporated
- [ ] IP assigned to holding company
- [ ] CIPO application numbers documented
- [ ] NDA template drafted
- [ ] IP assignment clause in all contractor agreements
- [ ] CASL-compliant signup consent confirmed

### Technical ✓
- [ ] Formspree ID pasted into beta-signup.html
- [ ] Both pages deployed and live
- [ ] Full journey tested end-to-end
- [ ] `.env` structure created (never committed)
- [ ] `.gitignore` created
- [ ] Supabase schema created per Part 3
- [ ] Copyright headers on all source files
- [ ] Error monitoring active (Sentry)
- [ ] Analytics active (Plausible)

### Content ✓
- [ ] Terms of Service page live at flatfinder.io/terms
- [ ] Privacy Policy page live at flatfinder.io/privacy
- [ ] Cookie consent banner active
- [ ] Success screen copy updated (no false confirmation email promise until email is built)
- [ ] Footer links working (not `#`)

### Business ✓
- [ ] Student loan resolved (MP caseworker engaged)
- [ ] Grant accessed once loan cleared
- [ ] Investor deck drafted (10 slides)
- [ ] Financial projections (even rough)

### IP ✓
- [ ] FlatFinder™ trademark: application # documented
- [ ] Benny™ trademark: application # documented
- [ ] Housing Revolutionised™ trademark: application # documented
- [ ] Anti-Gatekeeping Affordability Algorithm™ patent: application # documented
- [ ] Benny system prompt: env var only, never in code
- [ ] Algorithm implementation: server-side only, private repo

---

## APPENDIX — QUICK REFERENCE

**To activate Plan B (Formspree) — 5 minutes:**
1. formspree.io → sign up → new form
2. Copy form ID from endpoint URL
3. Open beta-signup.html → find `YOUR_FORMSPREE_ID` → replace
4. Deploy. Done.

**To activate Plan A (Supabase) — after Plan B is live:**
1. Create table per schema in Part 3
2. Copy ANON key from Supabase → Settings → API
3. In beta-signup.html → find commented Supabase block → uncomment → paste keys
4. Comment out Formspree block
5. Test. Deploy.

**To activate Benny — Month 1:**
1. Anthropic API key → in `.env` as `ANTHROPIC_API_KEY`
2. System prompt → in `.env` as `BENNY_SYSTEM_PROMPT` — NEVER in code
3. Build conversation endpoint server-side
4. Connect to frontend via API call only

**Key contacts:**
- Domain: flatfinder.io
- Brand email: flat@flatfinder.io
- Privacy: privacy@flatfinder.io
- Student loan: NSLSC 1-888-815-4514
- MP office: ourcommons.ca/members → your postal code

---

*© 2025–2026 Lila Alexandra Olufemi Inglis Abegunrin / FlatFinder: Housing Revolutionised Inc.*
*All Rights Reserved. Patent Pending (CIPO). Trademarks Pending (CIPO).*
*PROPRIETARY AND CONFIDENTIAL — Not for distribution without written consent.*
