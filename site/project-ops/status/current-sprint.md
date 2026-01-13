# Current Sprint — HFF New Site

**Sprint:** Foundation + Design System + Homepage
**Started:** 2025-01-12
**Goal:** Complete project scaffolding, design tokens, and homepage

---

## In Progress

- [ ] Create partner badge components (PartnerLockupInline, PartnerLockupStacked, etc.)
- [ ] Scaffold remaining 25+ routes

---

## Completed

- [x] Scaffold Next.js 14+ with App Router
- [x] Configure TypeScript, Tailwind, shadcn/ui
- [x] Organize brand assets into /public/brand/
- [x] Create project documentation structure
- [x] Set up CLAUDE.md with project context
- [x] Extract design tokens from homepage mockup
- [x] Create tokens/tokens.json with color, typography, spacing
- [x] Configure globals.css with CSS variables and utilities
- [x] Build SiteHeader component (glass effect, mobile menu, Help Now ATX)
- [x] Build SiteFooter component (navigation, legal, safety disclaimer)
- [x] Build FlipDoorCard component (flip animation, reduced motion, a11y)
- [x] Build homepage hero section with bokeh background
- [x] Add "What we do" tiles section
- [x] Add trust module and impact snapshot section

---

## Next Up

- [ ] Build partner badge components (Phase 4)
- [ ] Scaffold all 25+ routes with placeholder pages (Phase 5)
- [ ] Build scholarship funnel (eligibility, multi-step application)
- [ ] Build get-involved funnel (donate, volunteer, partner)

---

## Blockers

None currently.

---

## Notes

- Homepage mockup is at `/public/brand/mockup-reference.jpeg`
- All copy is in `heart_forward_website_copy_*.md`
- Forms will use email delivery initially (Resend)
- Stripe donations are placeholder only
- Build verified successful - all components compile correctly
