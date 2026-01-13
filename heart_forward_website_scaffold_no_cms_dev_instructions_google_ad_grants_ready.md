# Heart Forward Website Scaffold (No CMS) — Dev Instructions + Google Ad Grants Ready

> Purpose: Build-ready scaffolding instructions for a Next.js + TypeScript + Tailwind + React site (implementation choices left to developer). Content will be updated manually by the webmaster (no headless CMS).

---

## 1) North Star goals

### Primary funnels
1) **Support Journey (Scholarships / Support)**
- Visitor → chooses “I Need Support” → **Eligibility pre-check** → application start → application complete → confirmation + share → follow-up loop

2) **Get Involved Journey (Donate / Volunteer / Partner)**
- Visitor → chooses “Get Involved” → select action → complete action (donation, volunteer inquiry, partner inquiry) → confirmation + share → retention loop

### Safety + scope routing
- People needing help **outside Heart Forward scope** are routed to **Help Now ATX** as the **last option** inside each flip-card journey, and optionally via a consistent footer link.

### Program scope to reflect everywhere
- **Recovery living scholarships** for people in early recovery
- **Harm reduction** information/resources
- **Events/education**
- Scholarships connect to **verified and qualifying recovery homes**

---

## 2) Sitemap + routes (scaffold)

### Global
- `/` Home (two doors + partner badge + trust/proof)
- `/about`
- `/programs`
  - `/programs/scholarships`
  - `/programs/harm-reduction`
  - `/programs/events`
- `/impact`
- `/resources`
- `/events`
- `/get-involved`
  - `/get-involved/donate`
  - `/get-involved/volunteer`
  - `/get-involved/partner`
- `/contact`
- `/faq`
- `/verified-homes` ✅ (trust differentiator)

### Scholarship funnel
- `/scholarships` (overview + CTA)
- `/scholarships/eligibility` ✅ (pre-check)
- `/scholarships/apply` (multi-step wrapper)
  - `/scholarships/apply/start`
  - `/scholarships/apply/about-you`
  - `/scholarships/apply/recovery`
  - `/scholarships/apply/housing-needs`
  - `/scholarships/apply/review`
  - `/scholarships/apply/submit`
- `/scholarships/thanks` ✅ (share moment)

### Donation funnel
- `/donate` (alias to `/get-involved/donate`)
- `/donate/thanks` ✅ (share moment)

### Partner landing pages (for campaigns / referrals / tracking)
- `/p/[partnerSlug]` ✅ (templated partner landing)

### Legal + trust
- `/privacy`
- `/terms`
- `/accessibility`
- `/cookies` (only if needed for consent)

### Outbound
- Help Now ATX external links (UTM-tagged)

---

## 3) Homepage spec (two-door flip cards)

### Above-the-fold requirements
- Header: Heart Forward logo + nav (About, Programs, Events, Contact)
- **Partner badge** (Heart Forward × Help Now ATX)
- Hero: comforting + clear scope line (scholarships + harm reduction + events)
- Two primary doors as **flip cards**:
  - Left: **I Need Support**
  - Right: **Get Involved** (updated from “I Want to Give”)

### Flip card interaction requirements
- Mobile-first: **tap to flip** (no hover dependency)
- Include close/back action
- Respect reduced-motion preference (no flipping; use expand/fade)
- Each choice is a 44px+ touch target

### Flip options (order matters)

**Door A — I Need Support**
1. Recovery Living Scholarships → `/scholarships`
2. Check Eligibility → `/scholarships/eligibility`
3. Harm Reduction Resources → `/resources` (optional anchor/filter)
4. Events & Education → `/events`
5. **Help Now ATX (Last option)** → outbound (UTM)

**Door B — Get Involved**
1. Donate → `/get-involved/donate`
2. Volunteer → `/get-involved/volunteer`
3. Partner / Sponsor → `/get-involved/partner`
4. Share / Host an Event → `/events` (or section on `/get-involved`)
5. **Help Now ATX (Last option)** → outbound (UTM)

### Below-the-fold modules (recommended)
- “What we do” (3 tiles)
- “How scholarships work” (3 steps)
- “Verified homes” trust module linking to `/verified-homes`
- Impact snapshot (stats + short story)
- Footer with contact + legal + Help Now ATX link

---

## 4) Scholarship funnel (Support Journey)

### Enhancement #1 — Eligibility pre-check (required)
Route: `/scholarships/eligibility`

**Requirements**
- 2–6 questions max
- Compassionate copy and privacy-first language
- 3 outcomes:
  - **Eligible** → CTA “Start Application”
  - **Possibly eligible** → CTA “Talk to us / Contact”
  - **Not eligible** → show resources + events + **Help Now ATX last**

**Data capture (minimum)**
- High-level recovery timeline (broad)
- Location / ability to relocate (optional)
- Housing need timing (optional)
- Preferred contact method (optional)

### Application flow
Routes: `/scholarships/apply/*`

**Requirements**
- Multi-step with progress indicator
- Validation + gentle error messages
- Clear “what happens next” on submit
- Store submissions securely (implementation decision: email + storage, database, or form service)

### Post-submit thank-you + share
Route: `/scholarships/thanks` ✅
- Confirmation
- Next-steps timeline
- Share panel (ethical virality)

---

## 5) Get involved funnel

### Donation (Stripe Checkout)
- Use **Stripe Checkout** (fast, secure, mobile-friendly)
- Support **one-time + monthly** (monthly default can be tested later)
- Offer Apple Pay / Google Pay where supported by Stripe
- Suggested amounts mapped to outcomes (copy-level)

Routes
- `/get-involved/donate` → creates Stripe Checkout session
- `/donate/thanks` ✅

### Volunteer
- `/get-involved/volunteer`
- Simple intake form + confirmation message
- Optional role categories + availability

### Partner / sponsor
- `/get-involved/partner`
- Tiered sponsor options (optional) + inquiry form
- Optional calendar link (implementation choice)

---

## 6) Enhancement #2 — Verified Homes trust page

Route: `/verified-homes`

**Modules**
- What “verified” means (criteria)
- How verification works (process steps)
- What Heart Forward does / does not do (scope clarity)
- Partnering information for homes
- CTAs: Check Eligibility, Donate, Partner

---

## 7) Enhancement #3 — Sticky mobile CTA (conversion)

Component: `StickyMobileCTA`

**Rules**
- Enable on key pages:
  - Scholarships pages: “Check Eligibility” / “Apply”
  - Donate pages: “Donate”
  - Events pages: “RSVP”
- Must not cover system UI or chat widget
- Respect safe areas on iOS

---

## 8) Enhancement #4 — Partner landing pages (for campaigns + attribution)

Route template: `/p/[partnerSlug]`

**Purpose**
- Campaign-ready landing pages for partner referrals and Google Ads traffic

**Requirements**
- Partner badge + “In partnership with ___”
- Two doors (same behavior)
- Partner-specific hero text (hardcoded file or config object; no CMS)
- Persist UTMs into donations and forms

**Partner config (no CMS)**
- Store partner definitions in a simple config file (e.g., JSON/TS object)
  - slug, partner name, optional logo, hero headline/subhead, default emphasis (support vs involved)

---

## 9) Enhancement #5 — Post-action share moments (ethical virality)

Implement share panels on:
- `/scholarships/thanks`
- `/donate/thanks`
- Event RSVP confirmation (if used)

**Share panel requirements**
- Native share on mobile where possible
- Copy variants:
  - Resource-sharing (“If you or someone you love needs…”)
  - Support-sharing (“I just helped fund…”)
- Ensure each key page has strong OpenGraph/Twitter metadata for share previews

---

## 10) Analytics + tracking (Google Analytics first)

### Google Analytics (GA4)
- Add GA4 via preferred method (developer decision)
- Track key events (below)

### Core event list (minimum)
- `home_door_opened` (support|involved)
- `home_option_clicked` (option name)
- `eligibility_started`
- `eligibility_completed` (eligible|maybe|not)
- `application_started`
- `application_submitted`
- `donation_started`
- `donation_completed` (amount, recurring)
- `partner_landing_viewed` (partnerSlug)
- `share_clicked` (channel)
- `outbound_helpnowatx_clicked` (origin)

### UTM handling
- Persist UTMs (cookie/localStorage) for a set window (dev decision)
- Append UTMs to outbound Help Now ATX links
- Attach UTMs to donation session metadata and form submissions where possible

---

## 11) Google Ad Grants readiness (bake-in requirements)

> Goal: ensure the site is structurally ready for Google Ad Grants and high-quality ad landing pages.

### Website trust/compliance essentials
- HTTPS
- Clear navigation and mission clarity
- Robust contact info (email + form)
- **Privacy policy** and **terms** published
- Accessibility statement
- No broken links, no “under construction” sections

### Landing page quality essentials (for ads)
- Each ad group should have a dedicated landing page (use templates):
  - Scholarships landing: `/scholarships`
  - Eligibility landing: `/scholarships/eligibility`
  - Donate landing: `/get-involved/donate`
  - Events landing: `/events`
  - Resources landing: `/resources`
  - Partner landing: `/p/[partnerSlug]`
- Fast performance, mobile-first, clear CTA above the fold
- Strong relevance between keyword → ad copy → landing content

### Conversion tracking essentials
- Define primary conversions in GA4:
  - scholarship application submit
  - donation complete
  - volunteer inquiry submit
  - partner inquiry submit
- Ensure confirmation pages exist and are trackable (`/thanks` pages)

### SEO + metadata essentials
- Unique titles/meta descriptions per page
- OG + Twitter cards for shareability
- Structured content hierarchy (H1/H2)
- Clean URLs (already covered)

---

## 12) Component inventory (dev-ready)

### Core components
- `Header`, `Footer`
- `PartnerBadge`
- `FlipDoorCard` (reduced motion support)
- `StickyMobileCTA` ✅
- `EligibilityChecker` ✅
- `Stepper` (application)
- `FormField` (inputs, validation, errors)
- `SharePanel` ✅
- `TrustBar` (verification cues)
- `ImpactStats`
- `FAQAccordion`
- `ResourceList` (simple categories)

### Required states
- default / focus / pressed / disabled
- loading / empty / error / success

---

## 13) MVP backlog (what to build first)

### Epic A — Foundation
- Routes + layout + styling baseline
- Legal pages scaffold

### Epic B — Homepage two-door experience
- Flip cards + Help Now ATX last option
- Partner badge integration

### Epic C — Scholarships funnel
- `/scholarships` + `/scholarships/eligibility` + `/scholarships/apply/*` + `/scholarships/thanks`

### Epic D — Get involved funnel
- Donate page + Stripe Checkout + thank-you page
- Volunteer + Partner inquiry forms

### Epic E — Verified homes trust layer
- `/verified-homes` + cross-link CTAs

### Epic F — Events + resources
- `/events` listing + `/resources` hub

### Epic G — Analytics + ad readiness
- GA4 integration, events, UTMs, OG tags
- Landing page template readiness for Ad Grants

---

## 14) Launch checklist
- Two doors functional + tracked
- Eligibility pre-check live
- Application submission works end-to-end
- Stripe donation live + thank-you tracking
- Verified homes trust page live
- Partner landing template works with at least 1 partner configured
- Share moments live + OG previews validated
- Accessibility basics + reduced motion
- Performance pass (fast LCP, optimized images)

