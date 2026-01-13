/**
 * Centralized Route Definitions
 *
 * All internal routes defined as named constants to:
 * - Prevent URL drift
 * - Enable route auditing
 * - Provide single source of truth
 *
 * Usage:
 *   import { ROUTES, EXTERNAL } from '@/lib/links';
 *   <Link href={ROUTES.scholarships.eligibility}>Check Eligibility</Link>
 */

export const ROUTES = {
  home: "/",

  // About / Info pages
  about: "/about",
  impact: "/impact",
  faq: "/faq",
  contact: "/contact",

  // Legal
  privacy: "/privacy",
  terms: "/terms",
  accessibility: "/accessibility",

  // Programs hub
  programs: {
    hub: "/programs",
    scholarships: "/programs/scholarships",
    harmReduction: "/programs/harm-reduction",
    events: "/programs/events",
  },

  // Scholarships funnel
  scholarships: {
    overview: "/scholarships",
    eligibility: "/scholarships/eligibility",
    apply: "/scholarships/apply",
    applyStart: "/scholarships/apply/start",
    applyAboutYou: "/scholarships/apply/about-you",
    applyRecovery: "/scholarships/apply/recovery",
    applyHousingNeeds: "/scholarships/apply/housing-needs",
    applyReview: "/scholarships/apply/review",
    applySubmit: "/scholarships/apply/submit",
    thanks: "/scholarships/thanks",
  },

  // Recovery homes
  homes: {
    hub: "/homes",
    verified: "/verified-homes",
    apply: "/homes/apply",
    applyEligibility: "/homes/apply/eligibility",
    applyAbout: "/homes/apply/about",
    applyLocation: "/homes/apply/location",
    applyPolicies: "/homes/apply/policies",
    applyReview: "/homes/apply/review",
    thanks: "/homes/apply/thanks",
  },

  // Get involved
  getInvolved: {
    hub: "/get-involved",
    donate: "/get-involved/donate",
    volunteer: "/get-involved/volunteer",
    partner: "/get-involved/partner",
  },

  // Donation
  donate: {
    main: "/donate",
    thanks: "/donate/thanks",
  },

  // Resources
  resources: "/resources",
  events: "/events",

  // Partner landing pages (dynamic)
  partnerLanding: (slug: string) => `/p/${slug}`,
} as const;

/**
 * External URLs
 *
 * Centralized external links with environment variable fallbacks
 */
export const EXTERNAL = {
  helpNowATX:
    process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org",
} as const;

/**
 * Route type helpers for TypeScript
 */
export type RouteKey = keyof typeof ROUTES;
export type ScholarshipRoute = keyof typeof ROUTES.scholarships;
export type HomesRoute = keyof typeof ROUTES.homes;
export type GetInvolvedRoute = keyof typeof ROUTES.getInvolved;
