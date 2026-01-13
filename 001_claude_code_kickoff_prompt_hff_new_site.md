# 001 — Claude Code Kickoff Prompt (HFF-New-site)

## Quick questions (answer if you know; otherwise proceed with defaults)
1) **Package manager:** pnpm (default) or npm/yarn?
2) **Forms:** should volunteer/partner/contact + scholarship eligibility/app submit to **email only**, **Google Sheets**, or a **backend/db** (Supabase/Firestore/etc.)?
3) **Donations:** do we already have **Stripe account + product setup**, or should we scaffold with env vars + test mode placeholders?
4) **Fonts:** are there approved brand fonts? (Mock reads like a modern serif for headlines + clean sans for UI.)
5) **Dark mode:** required, optional, or not needed?

> If no answers, use defaults in “Assumptions” below.

---

## Assumptions (updated per client direction)
- **Next.js App Router + TypeScript + Tailwind + shadcn/ui**, deployed on Vercel.
- **pnpm** as package manager (adjust if repo already uses npm/yarn).
- **Frontend-first delivery:** build all UI + forms now; forms can **send to email** as an interim solution while backend is built.
- **Supabase planned:** scaffold Supabase integration (env vars, client, types) but keep it optional until phase 2.
- **Auth/admin planned:** include an `/admin` area and login UI now; wire to a temporary stub until Supabase Auth is enabled.
- **Donations:** create a donation page + components now; Stripe integration is **placeholder-only** (no products yet) with clear TODOs.
- Fonts: **Playfair Display** (headings) + **Inter** (body/UI) unless brand fonts are provided.
- Light theme is primary; dark aesthetic tokens included but optional.

---

## Your mission
You are Claude Code operating in the local repo folder:
- **Client folder:** `HFF-New-site`
- **Assets folder:** `HFF/` (contains logos + partner badges)
- **Mockups provided:**
  - Homepage mock: `/mnt/data/v2-mock-up-HF.jpeg`
  - Partnership/partner badges sheet: `/mnt/data/ea3c67b5-3a6d-4267-a3d8-658b574b23ba.jpeg`
  - Heart Forward logo asset: `/mnt/data/Heart Forward Finalization-01 (1).png`
- **Copy + content docs:**
  - Copy draft: `/mnt/data/heart_forward_website_copy_one_draft_recovery_centered_harm_reduction_nvc.md`
  - Dev scaffold instructions: `/mnt/data/heart_forward_website_scaffold_no_cms_dev_instructions_google_ad_grants_ready.md`
- **Claude scaffolding templates (to use):**
  - `/mnt/data/project-claude-md.template.md`
  - `/mnt/data/decisions-template.md`
  - `/mnt/data/intake-form.md`

### Non-negotiable requirement
**Use the homepage mockup as an exact visual replica** (layout, spacing, typography, hierarchy, card styling, background treatment, nav layout, buttons, shadows, radii). Build the homepage first, get it pixel-faithful and fully responsive, then apply the same design system to every other page in the sitemap.

Also implement:
- **Logos and partner badges** exactly per the partner badge sheet.
- Consistent styling across pages using a shared **design token system** (CSS variables + tokens JSON).
- Accessibility: keyboard navigation, focus states, contrast, reduced motion.

---

## Step 0 — Read + orient
1) `cd HFF-New-site`
2) Inspect repo structure. If empty, scaffold fresh Next.js app.
3) Read these files fully and treat them as source of truth:
   - `heart_forward_website_scaffold_no_cms_dev_instructions_google_ad_grants_ready.md`
   - `heart_forward_website_copy_one_draft_recovery_centered_harm_reduction_nvc.md`
   - `project-claude-md.template.md`, `decisions-template.md`, `intake-form.md`
4) Locate `HFF/` assets folder and list its contents. Create a clean structure in `/public/brand/`:
   - `/public/brand/logos/` (Heart Forward variants)
   - `/public/brand/partners/help-now-atx/` (Help Now ATX logos)
   - `/public/brand/badges/` (partnership badges: horizontal, circular, dark/light)
   - `/public/brand/icons/` (any icons)

---

## Step 1 — Scaffold the project (if not already)
**Create a Next.js App Router project** with:
- TypeScript
- Tailwind
- shadcn/ui (init)
- ESLint
- `lucide-react`
- `next/font` for fonts

### MCP setup (required)
The project must load with all required **MCP (Model Context Protocol) servers/tools** available for this codebase.

**Add an `mcp/` folder** containing:
- `mcp/README.md` documenting how to run MCP locally for this repo.
- `mcp/config.example.json` (or the repo’s standard MCP config filename) that includes entries for:
  - **filesystem** (repo access)
  - **playwright** (E2E + visual regression)
  - **supabase** (later: schema, auth, db ops)
  - **pro image generator** (asset generation when needed)
  - **context7** (docs/knowledge)
  - **nano bananas** (if this is part of the client’s MCP toolchain)
  - **syntax** (lint/AST helper, if applicable)

⚠️ **Important:** MCP server config formats vary by environment. Use the client’s existing standard (from their Claude Code setup). If unknown, create the `mcp/` folder + docs + an example config with clear placeholders and TODOs rather than guessing a broken format.

Also add npm scripts:
- `mcp:setup` (prints instructions / validates config presence)
- `test:e2e` and `test:e2e:ui` using Playwright

### Required project docs
Use the provided templates to generate these in-repo:
- `CLAUDE.md` (project-specific) using `/mnt/data/project-claude-md.template.md`
- `project-ops/status/current-sprint.md`
- `project-ops/status/blockers.md`
- `project-ops/status/decisions-log.md` using `/mnt/data/decisions-template.md`
- `docs/YYYY-MM-DD-intake.md` using `/mnt/data/intake-form.md`

Fill placeholders with best-known values:
- Client: **Heart Forward Foundation**
- Project: **HFF New Site**
- Phase: **Build**
- Stack: Next.js App Router + TS + Tailwind

---

## Step 2 — Implement the design system (tokens first)
Create:
1) `tokens/tokens.json` (DTCG-ish structure)
2) `src/styles/globals.css` (CSS variables, light + dark)
3) Tailwind config mapping tokens to theme.

### Token extraction requirements
Extract from the homepage mock:
- Background: dark vignette + bokeh/blur effect
- Surface: glass/soft cards with gradient fills
- Primary brand red accent used in CTA / button
- Typography scale: big serif headline + smaller sans
- Radii (large rounded cards)
- Shadow style (soft, elevated)

Add:
- Focus ring token
- Motion tokens with `prefers-reduced-motion` handling

---

## Step 3 — Route map + pages
Implement the sitemap from the scaffold doc (no CMS). Create these routes (even if some are MVP placeholders):
- `/` (homepage — must match mock EXACTLY)
- `/about`
- `/programs` + children
- `/impact`
- `/resources`
- `/events`
- `/get-involved` + children
- `/contact`
- `/faq`
- `/verified-homes`
- Scholarship funnel routes (`/scholarships/...`)
- Legal: `/privacy`, `/terms`, `/accessibility`, `/cookies` (if needed)
- Partner landing: `/p/[partnerSlug]`

Each page must use:
- Shared `SiteHeader` + `SiteFooter`
- Shared spacing + typographic rhythm from tokens

Populate page copy using the copy draft doc (verbatim unless it conflicts with the mock; if conflict, follow mock for homepage and note in decisions log).

---

## Step 4 — Homepage build (pixel-faithful)
### Goal
Recreate `/mnt/data/v2-mock-up-HF.jpeg` as a responsive, accessible, interactive homepage.

### Required homepage elements
- Top header with:
  - Heart Forward logo (left)
  - nav: About, Programs, Events, Contact
  - top-right pill button labeled **Help Now ATX**
- Hero:
  - H1: “You’re not alone. And you can help someone feel safe again.” (serif, large)
  - supportive subhead line
- Two large feature cards (glass, gradient):
  - Left: **I Need Support** with icon + CTA button “Find Help Now”
  - Right: **I Want to Give** (or “Get Involved” if matching copy doc; homepage text should match the mock first)
- Card interactions:
  - Click/tap opens modal or flips to reveal options list (use scaffold doc ordering)
  - Respect reduced motion (no 3D flip required; use fade/expand)
- Help Now ATX chat widget (bottom-right) as a non-blocking component (static UI; no real chat integration yet)

### Implementation notes
- Use `next/image` for all imagery.
- Ensure buttons have real actions (open modal, navigate, show toast).
- Keyboard:
  - cards focusable
  - Enter/Space activates
  - focus trapped in modal

---

## Step 5 — Partner badges & logo lockups
From `/mnt/data/ea3c67b5-3a6d-4267-a3d8-658b574b23ba.jpeg`, reproduce the following as reusable components:
- `PartnerLockupInline` (horizontal: Help Now ATX | Heart Forward + “Community Partner”)
- `PartnerLockupStacked` (vertical, “In Partnership”)
- `PartnerBadgeCircle`
- `PartnerBadgePill`

Provide both light and dark variants, using assets from `HFF/` where possible. If an asset is missing, create an SVG approximation and log it in decisions.

---

## Step 6 — Data + interactions (MVP, frontend-first)
### Forms (phase 1)
- Build all forms UX-complete (validation, errors, success states):
  - Contact
  - Volunteer
  - Partner/Community partner interest
  - Scholarship eligibility + application
- **Submission handling (phase 1):**
  - Implement a `POST /api/forms/<formName>` route (or server action) that **emails submissions** (stub using Resend/Nodemailer) and writes a dev copy to `/data/submissions/*.json`.
  - Add a `FORM_DELIVERY_MODE=email|supabase` env flag so switching later is trivial.

### Supabase scaffolding (phase 1, non-blocking)
- Add `/src/lib/supabase/` with:
  - `client.ts` (browser client)
  - `server.ts` (server client placeholder)
  - `types.ts` (generated types placeholder + TODO)
- Add `.env.example` entries for Supabase URL/anon key/service role.
- Do **not** block frontend on Supabase—everything must run without it.

### Auth/admin (phase 1 UI)
- Create routes:
  - `/admin/login`
  - `/admin` (protected shell)
- Implement a `useAuth()` hook with a **mock provider** first.
- Add TODOs to replace with Supabase Auth (phase 2).

### UTM capture + persistence
- store UTMs in cookie/localStorage
- append to outbound Help Now ATX links

### Analytics (scaffold only)
- add a tiny `track(eventName, payload)` utility that logs to console in dev
- wire key events listed in scaffold doc

---

## Step 7 — Quality gates
Before considering homepage “done”:
- ✅ Visual parity with mock at 375px, 768px, 1280px
- ✅ Lighthouse-friendly: no layout shift, optimized images, minimal client JS
- ✅ WCAG basics: landmarks, headings, contrast, focus ring, reduced motion

---

## Deliverables you must output in your final Claude response
1) **File tree** (new/changed)
2) **Run instructions**
3) **Key screenshots checklist** (what to visually verify)
4) **Notes + Decisions** (log significant deviations)
5) **Project docs added/updated:**
   - `README.md` (setup, scripts, env vars, MCP, deployment notes)
   - `docs/PROJECT_SCOPE.md`
   - `docs/PDR.md` (Product/Project Design Requirements)

---

## Build order (do not skip)
1) Scaffold + tokens + layout shell
2) Homepage pixel replica
3) Partner badges components
4) Other pages matching the homepage design system
5) Funnels (eligibility + application + donate stubs)

---

## If you get stuck
- Prefer shipping a faithful MVP with clear TODOs rather than inventing integrations.
- Log unresolved items in `project-ops/status/blockers.md` and `decisions-log.md`.

---

## Command to begin
Start by listing the current repo contents and the `HFF/` assets contents, then scaffold and build per the steps above.

