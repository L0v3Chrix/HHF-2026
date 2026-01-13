# CLAUDE.md — Heart Forward Foundation New Site

## Project Overview

**Client:** Heart Forward Foundation
**Project:** HFF New Site
**Phase:** Build
**Started:** 2025-01-12

Heart Forward Foundation is a nonprofit providing recovery living scholarships, harm reduction resources, and community education. This website features a two-door flip card homepage experience routing users to either "I Need Support" or "Get Involved" journeys.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Package Manager:** pnpm
- **Fonts:** Playfair Display (headings) + Inter (body)
- **Forms:** Email delivery via Resend (Supabase scaffolded for later)
- **Donations:** Stripe placeholder (no products yet)
- **Hosting:** Vercel

---

## Project Structure

```
/site/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (main)/             # Main layout group
│   │   ├── scholarships/       # Scholarship funnel
│   │   ├── get-involved/       # Donate/volunteer/partner
│   │   ├── p/[partnerSlug]/    # Partner landing pages
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── layout/             # SiteHeader, SiteFooter
│   │   ├── ui/                 # shadcn components
│   │   └── [feature].tsx       # Feature components
│   ├── lib/                    # Utilities, clients
│   ├── config/                 # Site configuration
│   └── hooks/                  # Custom React hooks
├── public/
│   └── brand/                  # Brand assets
│       ├── logos/
│       ├── badges/
│       ├── partners/
│       └── icons/
├── tokens/                     # Design tokens
└── docs/                       # Project documentation
```

---

## Key Design Requirements

### Non-Negotiables
1. **Homepage must match mockup exactly** — layout, spacing, typography, card styling, background treatment
2. **Help Now ATX is always the last option** in every flip card menu
3. **Mobile-first interactions** — tap to flip, no hover dependencies
4. **Accessibility first** — keyboard nav, focus states, reduced motion
5. **Recovery-centered language** — warm, non-judgmental, NVC principles

### Design Tokens (from mockup)
- **Background:** Deep charcoal/navy with bokeh blur
- **Surface:** Glass cards with gradient fills
- **Primary:** Deep red/maroon (#C42D44)
- **Accent:** Warm orange gradient
- **Typography:** Large serif headlines, clean sans body

---

## Primary User Journeys

### Door A: "I Need Support"
1. Recovery Living Scholarships → `/scholarships`
2. Check Eligibility → `/scholarships/eligibility`
3. Harm Reduction Resources → `/resources`
4. Events & Education → `/events`
5. **Help Now ATX (Last)** → external (UTM)

### Door B: "Get Involved"
1. Donate → `/get-involved/donate`
2. Volunteer → `/get-involved/volunteer`
3. Partner/Sponsor → `/get-involved/partner`
4. Share/Host Event → `/events`
5. **Help Now ATX (Last)** → external (UTM)

---

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run linter
pnpm start        # Start production server
```

---

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_SITE_URL` — Production URL
- `RESEND_API_KEY` — Email delivery
- `FORM_DELIVERY_MODE` — email | supabase
- `NEXT_PUBLIC_HELPNOWATX_URL` — Help Now ATX link

---

## Reference Documents

| File | Purpose |
|------|---------|
| `heart_forward_website_copy_one_draft_*.md` | All page copy |
| `heart_forward_website_scaffold_*.md` | Sitemap, components, analytics |
| `public/brand/mockup-reference.jpeg` | Homepage visual target |

---

## Voice & Tone

- Warm, steady, hopeful
- Harm-reduction positive
- Recovery-centered living language
- No shame, non-judgmental
- NVC principles (observations, feelings, needs, requests)

---

## Quality Standards

- [ ] Lighthouse 90+ all categories
- [ ] WCAG 2.1 AA compliance
- [ ] Mobile-first responsive
- [ ] Reduced motion support
- [ ] OG/Twitter cards configured
