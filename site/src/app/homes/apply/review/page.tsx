"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHomesFunnel } from "@/components/funnel/HomesFunnelProvider";
import { SavedIndicator } from "@/components/funnel/SavedIndicator";
import {
  OPERATING_LENGTH_OPTIONS,
  GENDER_OPTIONS,
} from "@/types/homes-funnel";

export default function HomesReviewPage() {
  const router = useRouter();
  const { data, setStepData, isDirty, clearData } = useHomesFunnel();
  const { about, location, policies, consent } = data;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Helper function to display value or dash
  const displayValue = (value: string | undefined | null) => {
    if (!value || value.trim() === "") return "—";
    return value;
  };

  // Get label for operating length
  const getOperatingLengthLabel = (value: string) => {
    const option = OPERATING_LENGTH_OPTIONS.find((o) => o.value === value);
    return option ? option.label : "—";
  };

  // Get label for gender served
  const getGenderServedLabel = (value: string) => {
    const option = GENDER_OPTIONS.find((o) => o.value === value);
    return option ? option.label : "—";
  };

  // Format address
  const formatAddress = () => {
    const parts = [
      location.streetAddress,
      location.city,
      location.state,
      location.zip,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "—";
  };

  // Format certifications
  const formatCertifications = () => {
    if (policies.certifications.length === 0) return "—";
    if (policies.certifications.includes("None currently")) return "None";
    return policies.certifications.join(", ");
  };

  // Check if all consent boxes are checked
  const allConsentsChecked =
    consent.confirmAccurate && consent.allowContact && consent.notifyChanges;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allConsentsChecked) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/homes/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit application");
      }

      // Clear the funnel data on successful submission
      clearData();

      // Navigate to thanks page
      router.push("/homes/apply/thanks");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              Review your application
            </h1>
            <p className="text-[var(--hf-text-secondary)]">
              Please review your information before submitting. You can go back
              to make changes.
            </p>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-4 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--hf-text-muted)]">
                <span className="text-[var(--hf-accent)] font-medium">
                  Step 5 of 5:
                </span>
                <span>Review &amp; submit</span>
              </div>
              <SavedIndicator isDirty={isDirty} />
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-full bg-[var(--hf-accent)] rounded-full" />
            </div>
          </div>
        </section>

        {/* Review Sections */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* About Your Home */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)]">
                    About your home
                  </h3>
                  <Link
                    href="/homes/apply/about"
                    className="text-sm text-[var(--hf-accent)] hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      Home name
                    </span>
                    <span className="text-[var(--hf-text-secondary)] text-right max-w-[60%]">
                      {displayValue(about.homeName)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Contact</span>
                    <span className="text-[var(--hf-text-secondary)] text-right max-w-[60%]">
                      {displayValue(about.contactName)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Email</span>
                    <span className="text-[var(--hf-text-secondary)] text-right max-w-[60%]">
                      {displayValue(about.email)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Phone</span>
                    <span className="text-[var(--hf-text-secondary)] text-right max-w-[60%]">
                      {displayValue(about.phone)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      Operating
                    </span>
                    <span className="text-[var(--hf-text-secondary)] text-right max-w-[60%]">
                      {about.operatingLength
                        ? getOperatingLengthLabel(about.operatingLength)
                        : "—"}
                    </span>
                  </div>
                  {about.website && (
                    <div className="flex justify-between">
                      <span className="text-[var(--hf-text-muted)]">
                        Website
                      </span>
                      <span className="text-[var(--hf-text-secondary)] text-right max-w-[60%] truncate">
                        {about.website}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Capacity */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)]">
                    Location &amp; capacity
                  </h3>
                  <Link
                    href="/homes/apply/location"
                    className="text-sm text-[var(--hf-accent)] hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Address</span>
                    <span className="text-[var(--hf-text-secondary)] text-right max-w-[60%]">
                      {formatAddress()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      Capacity
                    </span>
                    <span className="text-[var(--hf-text-secondary)]">
                      {location.totalCapacity
                        ? `${location.totalCapacity} residents`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      Current openings
                    </span>
                    <span className="text-[var(--hf-text-secondary)]">
                      {location.currentOpenings
                        ? `${location.currentOpenings} beds`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Serves</span>
                    <span className="text-[var(--hf-text-secondary)]">
                      {location.genderServed
                        ? getGenderServedLabel(location.genderServed)
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      Monthly cost
                    </span>
                    <span className="text-[var(--hf-text-secondary)]">
                      {location.monthlyCost
                        ? `$${location.monthlyCost}/month`
                        : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Policies & Practices */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)]">
                    Policies &amp; practices
                  </h3>
                  <Link
                    href="/homes/apply/policies"
                    className="text-sm text-[var(--hf-accent)] hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      Recovery program required
                    </span>
                    <span className="text-[var(--hf-text-secondary)] capitalize">
                      {displayValue(policies.recoveryProgramRequired)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      MAT allowed
                    </span>
                    <span className="text-[var(--hf-text-secondary)] capitalize">
                      {displayValue(policies.matAllowed)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      Staffing
                    </span>
                    <span className="text-[var(--hf-text-secondary)] capitalize">
                      {displayValue(policies.staffingLevel)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">
                      Certifications
                    </span>
                    <span className="text-[var(--hf-text-secondary)] text-right max-w-[60%]">
                      {formatCertifications()}
                    </span>
                  </div>
                  {policies.houseRules.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[var(--hf-text-muted)] block mb-2">
                        House rules:
                      </span>
                      <ul className="list-disc list-inside text-[var(--hf-text-secondary)] space-y-1">
                        {policies.houseRules.map((rule) => (
                          <li key={rule}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Agreement */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-4">
                  Before you submit
                </h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.confirmAccurate}
                      onChange={(e) =>
                        setStepData("consent", {
                          ...consent,
                          confirmAccurate: e.target.checked,
                        })
                      }
                      className="w-5 h-5 mt-0.5 text-[var(--hf-accent)] rounded"
                    />
                    <span className="text-sm text-[var(--hf-text-secondary)]">
                      I confirm that the information provided is accurate to the
                      best of my knowledge.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.allowContact}
                      onChange={(e) =>
                        setStepData("consent", {
                          ...consent,
                          allowContact: e.target.checked,
                        })
                      }
                      className="w-5 h-5 mt-0.5 text-[var(--hf-accent)] rounded"
                    />
                    <span className="text-sm text-[var(--hf-text-secondary)]">
                      I understand that Heart Forward may contact me for
                      additional information or a site visit as part of the
                      verification process.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.notifyChanges}
                      onChange={(e) =>
                        setStepData("consent", {
                          ...consent,
                          notifyChanges: e.target.checked,
                        })
                      }
                      className="w-5 h-5 mt-0.5 text-[var(--hf-accent)] rounded"
                    />
                    <span className="text-sm text-[var(--hf-text-secondary)]">
                      I agree to notify Heart Forward of any significant changes
                      to my home&apos;s policies or capacity.
                    </span>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {submitError}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                <Link
                  href="/homes/apply/policies"
                  className="flex-1 px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium text-center hover:bg-white/5 transition-colors"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  disabled={!allConsentsChecked || isSubmitting}
                  className={`flex-1 px-6 py-3 rounded-full font-medium text-center transition-colors ${
                    allConsentsChecked && !isSubmitting
                      ? "bg-[var(--hf-accent)] text-white hover:bg-[var(--hf-accent-hover)]"
                      : "bg-[var(--hf-glass)] text-[var(--hf-text-muted)] cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
