"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHomesFunnel } from "@/components/funnel/HomesFunnelProvider";
import { SavedIndicator } from "@/components/funnel/SavedIndicator";
import {
  HomesPoliciesData,
  HOUSE_RULES_OPTIONS,
  CERTIFICATION_OPTIONS,
} from "@/types/homes-funnel";

export default function HomesPoliciesPage() {
  const router = useRouter();
  const { data, setStepData, isDirty, markStepComplete } = useHomesFunnel();
  const formData = data.policies;

  const updateField = <K extends keyof HomesPoliciesData>(
    field: K,
    value: HomesPoliciesData[K]
  ) => {
    setStepData("policies", { ...formData, [field]: value });
  };

  const toggleArrayItem = (
    field: "houseRules" | "certifications",
    item: string
  ) => {
    const currentArray = formData[field];
    if (currentArray.includes(item)) {
      updateField(
        field,
        currentArray.filter((i) => i !== item)
      );
    } else {
      updateField(field, [...currentArray, item]);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    markStepComplete(4);
    router.push("/homes/apply/review");
  };

  // Validation - at minimum need recovery program and staffing answered
  const isValid =
    formData.recoveryProgramRequired !== "" && formData.staffingLevel !== "";

  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              Policies &amp; practices
            </h1>
            <p className="text-[var(--hf-text-secondary)]">
              Your approach to recovery support, house rules, and resident
              safety.
            </p>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-4 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--hf-text-muted)]">
                <span className="text-[var(--hf-accent)] font-medium">
                  Step 4 of 5:
                </span>
                <span>Policies &amp; practices</span>
              </div>
              <SavedIndicator isDirty={isDirty} />
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-[var(--hf-accent)] rounded-full transition-all duration-300" />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <form onSubmit={handleContinue} className="space-y-8">
                {/* Recovery Requirements */}
                <div>
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-4">
                    Recovery requirements
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Do you require residents to be actively working a
                        recovery program?{" "}
                        <span className="text-[var(--hf-accent)]">*</span>
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {(
                          [
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                            {
                              value: "encouraged but not required",
                              label: "Encouraged but not required",
                            },
                          ] as const
                        ).map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="recoveryProgram"
                              value={option.value}
                              checked={
                                formData.recoveryProgramRequired === option.value
                              }
                              onChange={(e) =>
                                updateField(
                                  "recoveryProgramRequired",
                                  e.target
                                    .value as HomesPoliciesData["recoveryProgramRequired"]
                                )
                              }
                              className="w-4 h-4 text-[var(--hf-accent)]"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Do you allow MAT (Medication-Assisted Treatment)?
                      </label>
                      <p className="text-xs text-[var(--hf-text-muted)] mb-2">
                        Heart Forward supports harm reduction approaches
                        including MAT.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {(
                          [
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                            { value: "case by case", label: "Case by case" },
                          ] as const
                        ).map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="mat"
                              value={option.value}
                              checked={formData.matAllowed === option.value}
                              onChange={(e) =>
                                updateField(
                                  "matAllowed",
                                  e.target
                                    .value as HomesPoliciesData["matAllowed"]
                                )
                              }
                              className="w-4 h-4 text-[var(--hf-accent)]"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* House Rules */}
                <div>
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-4">
                    House rules
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Which of these are part of your house rules?
                      </label>
                      <p className="text-xs text-[var(--hf-text-muted)] mb-3">
                        Select all that apply.
                      </p>
                      <div className="space-y-2">
                        {HOUSE_RULES_OPTIONS.map((rule) => (
                          <label
                            key={rule}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.houseRules.includes(rule)}
                              onChange={() => toggleArrayItem("houseRules", rule)}
                              className="w-4 h-4 text-[var(--hf-accent)] rounded"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">
                              {rule}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safety & Support */}
                <div>
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-4">
                    Safety &amp; support
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Is there staff or a house manager on-site?{" "}
                        <span className="text-[var(--hf-accent)]">*</span>
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {(
                          [
                            { value: "24/7", label: "24/7" },
                            { value: "part-time", label: "Part-time" },
                            { value: "on-call", label: "On-call" },
                            { value: "no", label: "No" },
                          ] as const
                        ).map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="staffing"
                              value={option.value}
                              checked={formData.staffingLevel === option.value}
                              onChange={(e) =>
                                updateField(
                                  "staffingLevel",
                                  e.target
                                    .value as HomesPoliciesData["staffingLevel"]
                                )
                              }
                              className="w-4 h-4 text-[var(--hf-accent)]"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        What happens if a resident relapses?
                      </label>
                      <textarea
                        value={formData.relapseApproach}
                        onChange={(e) =>
                          updateField("relapseApproach", e.target.value)
                        }
                        rows={3}
                        placeholder="Describe your approach to relapse..."
                        className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] resize-none"
                      />
                      <p className="text-xs text-[var(--hf-text-muted)] mt-1">
                        We value homes that approach relapse with compassion
                        while maintaining safety.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-4">
                    Certifications &amp; affiliations
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Do you have any certifications or affiliations?
                      </label>
                      <p className="text-xs text-[var(--hf-text-muted)] mb-3">
                        Select all that apply. These are not required for
                        verification.
                      </p>
                      <div className="space-y-2">
                        {CERTIFICATION_OPTIONS.map((cert) => (
                          <label
                            key={cert}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.certifications.includes(cert)}
                              onChange={() =>
                                toggleArrayItem("certifications", cert)
                              }
                              className="w-4 h-4 text-[var(--hf-accent)] rounded"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">
                              {cert}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Anything else we should know?
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      updateField("additionalNotes", e.target.value)
                    }
                    rows={3}
                    placeholder="Optional: Share any additional context about your home's approach..."
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] resize-none"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  <Link
                    href="/homes/apply/location"
                    className="flex-1 px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium text-center hover:bg-white/5 transition-colors"
                  >
                    Back
                  </Link>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`flex-1 px-6 py-3 rounded-full font-medium text-center transition-colors ${
                      isValid
                        ? "bg-[var(--hf-accent)] text-white hover:bg-[var(--hf-accent-hover)]"
                        : "bg-[var(--hf-glass)] text-[var(--hf-text-muted)] cursor-not-allowed"
                    }`}
                  >
                    Review Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
