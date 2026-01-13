/**
 * Types for the Homes Verification Funnel
 *
 * Funnel Steps:
 * 1. Eligibility - Quick yes/no questions
 * 2. About - Home name, contact info, description
 * 3. Location - Address, capacity, who served, cost
 * 4. Policies - Recovery requirements, house rules, safety, certifications
 * 5. Review - Summary and consent checkboxes
 */

// Step 1: Eligibility
export interface HomesEligibilityData {
  isRecoveryHome: "yes" | "no" | "";
  hasCapacity: "yes" | "no" | "";
  acceptsReferrals: "yes" | "no" | "";
  hasHouseRules: "yes" | "no" | "";
}

// Step 2: About Your Home
export interface HomesAboutData {
  homeName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  operatingLength: "" | "less-than-1" | "1-2" | "3-5" | "5-plus";
  description: string;
}

// Step 3: Location & Capacity
export interface HomesLocationData {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  totalCapacity: string;
  currentOpenings: string;
  genderServed: "" | "men" | "women" | "all" | "other";
  monthlyCost: string;
}

// Step 4: Policies & Practices
export interface HomesPoliciesData {
  recoveryProgramRequired: "" | "yes" | "no" | "encouraged but not required";
  matAllowed: "" | "yes" | "no" | "case by case";
  houseRules: string[];
  staffingLevel: "" | "24/7" | "part-time" | "on-call" | "no";
  relapseApproach: string;
  certifications: string[];
  additionalNotes: string;
}

// Step 5: Review & Consent
export interface HomesConsentData {
  confirmAccurate: boolean;
  allowContact: boolean;
  notifyChanges: boolean;
}

// Combined funnel data
export interface HomesFunnelData {
  eligibility: HomesEligibilityData;
  about: HomesAboutData;
  location: HomesLocationData;
  policies: HomesPoliciesData;
  consent: HomesConsentData;
}

// Initial empty state
export const initialHomesFunnelData: HomesFunnelData = {
  eligibility: {
    isRecoveryHome: "",
    hasCapacity: "",
    acceptsReferrals: "",
    hasHouseRules: "",
  },
  about: {
    homeName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    operatingLength: "",
    description: "",
  },
  location: {
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    totalCapacity: "",
    currentOpenings: "",
    genderServed: "",
    monthlyCost: "",
  },
  policies: {
    recoveryProgramRequired: "",
    matAllowed: "",
    houseRules: [],
    staffingLevel: "",
    relapseApproach: "",
    certifications: [],
    additionalNotes: "",
  },
  consent: {
    confirmAccurate: false,
    allowContact: false,
    notifyChanges: false,
  },
};

// House rules options
export const HOUSE_RULES_OPTIONS = [
  "No alcohol or drugs on premises",
  "Curfew hours",
  "Mandatory house meetings",
  "Chores or shared responsibilities",
  "Guest policies",
  "Random or scheduled drug testing",
  "Employment or volunteer requirements",
] as const;

// Certification options
export const CERTIFICATION_OPTIONS = [
  "NARR (National Alliance for Recovery Residences)",
  "TARR (Texas Alliance of Recovery Residences)",
  "Oxford House affiliation",
  "State licensing or certification",
  "Other certification",
  "None currently",
] as const;

// Gender served options
export const GENDER_OPTIONS = [
  { value: "men", label: "Men only" },
  { value: "women", label: "Women only" },
  { value: "all", label: "All genders" },
  { value: "other", label: "Other (please specify in notes)" },
] as const;

// Operating length options
export const OPERATING_LENGTH_OPTIONS = [
  { value: "less-than-1", label: "Less than 1 year" },
  { value: "1-2", label: "1-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-plus", label: "5+ years" },
] as const;

// Funnel key for localStorage
export const HOMES_FUNNEL_KEY = "homes_apply";
