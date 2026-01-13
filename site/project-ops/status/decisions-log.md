# Decisions Log — HFF New Site

**Project:** Heart Forward Foundation New Site
**Started:** 2025-01-12

---

## Active Decisions

### 2025-01-12 — Package Manager
**Decision:** Use pnpm
**Rationale:** Client preference, disk-efficient, modern
**Alternatives Considered:** npm, yarn
**Status:** Implemented

---

### 2025-01-12 — Form Delivery Mode
**Decision:** Email delivery (Resend) as MVP, Supabase scaffolded
**Rationale:** Faster to launch, no database setup required initially
**Alternatives Considered:** Google Sheets, Supabase from start
**Status:** Pending implementation

---

### 2025-01-12 — Stripe Integration
**Decision:** Placeholder UI only, no live products
**Rationale:** Stripe account and products not yet configured
**Alternatives Considered:** Full integration now
**Status:** Pending Stripe setup

---

### 2025-01-12 — Dark Mode
**Decision:** Not needed (site has dark aesthetic by design)
**Rationale:** Homepage mockup shows dark theme as primary
**Alternatives Considered:** Light/dark toggle
**Status:** Confirmed

---

### 2025-01-12 — Typography
**Decision:** Playfair Display (headings) + Inter (body)
**Rationale:** Matches mockup aesthetic — serif elegance + clean readability
**Alternatives Considered:** System fonts, other pairings
**Status:** Implemented via next/font

---

## Pending Decisions

| Item | Context | Deadline |
|------|---------|----------|
| Partner badge SVG recreation | Original assets may need SVG versions | Before launch |
| Help Now ATX integration | Chat widget vs. link-only | TBD |
| Analytics events | Finalize event naming convention | Before launch |

---

## Decision Template

```markdown
### YYYY-MM-DD — [Decision Title]
**Decision:** [What was decided]
**Rationale:** [Why this choice]
**Alternatives Considered:** [Other options]
**Status:** [Implemented / Pending / Revisiting]
```
