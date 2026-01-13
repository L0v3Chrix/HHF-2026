/**
 * Intake Form Validators
 *
 * Zod schemas for the dynamic /api/intake/[type] endpoint.
 * Re-exports existing validators and adds type mapping.
 */

import { z } from "zod";
import {
  contactFormSchema,
  volunteerFormSchema,
  partnerFormSchema,
  homesFunnelSchema,
  type ContactFormData,
  type VolunteerFormData,
  type PartnerFormData,
  type HomesFunnelFormData,
} from "@/lib/forms/validators";

// ============================================================================
// INTAKE TYPE DEFINITIONS
// ============================================================================

export const INTAKE_TYPES = [
  "contact",
  "volunteer",
  "partner",
  "homes-verification",
] as const;

export type IntakeType = (typeof INTAKE_TYPES)[number];

/**
 * Type guard to check if a string is a valid intake type
 */
export function isValidIntakeType(type: string): type is IntakeType {
  return INTAKE_TYPES.includes(type as IntakeType);
}

// ============================================================================
// SCHEMA MAPPING
// ============================================================================

/**
 * Map of intake types to their Zod schemas
 */
export const intakeSchemas: Record<IntakeType, z.ZodSchema> = {
  contact: contactFormSchema,
  volunteer: volunteerFormSchema,
  partner: partnerFormSchema,
  "homes-verification": homesFunnelSchema,
};

/**
 * Get the schema for an intake type
 */
export function getIntakeSchema(type: IntakeType): z.ZodSchema {
  return intakeSchemas[type];
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type IntakeDataMap = {
  contact: ContactFormData;
  volunteer: VolunteerFormData;
  partner: PartnerFormData;
  "homes-verification": HomesFunnelFormData;
};

// ============================================================================
// VALIDATION HELPER
// ============================================================================

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * Validate intake form data against the appropriate schema
 */
export function validateIntake<T extends IntakeType>(
  type: T,
  data: unknown
): ValidationResult<IntakeDataMap[T]> {
  const schema = intakeSchemas[type];
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data as IntakeDataMap[T],
    };
  }

  return {
    success: false,
    errors: result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    })),
  };
}
