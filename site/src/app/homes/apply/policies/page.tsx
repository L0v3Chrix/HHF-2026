"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export default function HomesPoliciesPage() {
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
              Your approach to recovery support, house rules, and resident safety.
            </p>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-4 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--hf-text-muted)]">
              <span className="text-[var(--hf-accent)] font-medium">Step 4 of 5:</span>
              <span>Policies &amp; practices</span>
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-[var(--hf-accent)] rounded-full" />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <form className="space-y-8">
                {/* Recovery Requirements */}
                <div>
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-4">
                    Recovery requirements
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Do you require residents to be actively working a recovery program?
                      </label>
                      <div className="flex gap-4">
                        {["Yes", "No", "Encouraged but not required"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="recoveryProgram"
                              value={option.toLowerCase()}
                              className="w-4 h-4 text-[var(--hf-accent)]"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Do you allow MAT (Medication-Assisted Treatment)?
                      </label>
                      <p className="text-xs text-[var(--hf-text-muted)] mb-2">
                        Heart Forward supports harm reduction approaches including MAT.
                      </p>
                      <div className="flex gap-4">
                        {["Yes", "No", "Case by case"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="mat"
                              value={option.toLowerCase()}
                              className="w-4 h-4 text-[var(--hf-accent)]"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">{option}</span>
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
                        {[
                          "No alcohol or drugs on premises",
                          "Curfew hours",
                          "Mandatory house meetings",
                          "Chores or shared responsibilities",
                          "Guest policies",
                          "Random or scheduled drug testing",
                          "Employment or volunteer requirements",
                        ].map((rule) => (
                          <label
                            key={rule}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={rule}
                              className="w-4 h-4 text-[var(--hf-accent)] rounded"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">{rule}</span>
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
                        Is there staff or a house manager on-site?
                      </label>
                      <div className="flex gap-4">
                        {["24/7", "Part-time", "On-call", "No"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="staffing"
                              value={option.toLowerCase()}
                              className="w-4 h-4 text-[var(--hf-accent)]"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        What happens if a resident relapses?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe your approach to relapse..."
                        className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] resize-none"
                      />
                      <p className="text-xs text-[var(--hf-text-muted)] mt-1">
                        We value homes that approach relapse with compassion while maintaining safety.
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
                        Select all that apply. These are not required for verification.
                      </p>
                      <div className="space-y-2">
                        {[
                          "NARR (National Alliance for Recovery Residences)",
                          "TARR (Texas Alliance of Recovery Residences)",
                          "Oxford House affiliation",
                          "State licensing or certification",
                          "Other certification",
                          "None currently",
                        ].map((cert) => (
                          <label
                            key={cert}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={cert}
                              className="w-4 h-4 text-[var(--hf-accent)] rounded"
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)]">{cert}</span>
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
                  <Link
                    href="/homes/apply/review"
                    className="flex-1 px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium text-center hover:bg-[var(--hf-accent-hover)] transition-colors"
                  >
                    Review Application
                  </Link>
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
