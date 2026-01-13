"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export default function HomesReviewPage() {
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
              Please review your information before submitting. You can go back to make changes.
            </p>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-4 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--hf-text-muted)]">
              <span className="text-[var(--hf-accent)] font-medium">Step 5 of 5:</span>
              <span>Review &amp; submit</span>
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-full bg-[var(--hf-accent)] rounded-full" />
            </div>
          </div>
        </section>

        {/* Review Sections */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
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
                    <span className="text-[var(--hf-text-muted)]">Home name</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Contact</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Email</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Phone</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Operating</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
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
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Capacity</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Current openings</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Serves</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Monthly cost</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
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
                    <span className="text-[var(--hf-text-muted)]">Recovery program required</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">MAT allowed</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Staffing</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--hf-text-muted)]">Certifications</span>
                    <span className="text-[var(--hf-text-secondary)]">—</span>
                  </div>
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
                      className="w-5 h-5 mt-0.5 text-[var(--hf-accent)] rounded"
                    />
                    <span className="text-sm text-[var(--hf-text-secondary)]">
                      I confirm that the information provided is accurate to the best of my knowledge.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-0.5 text-[var(--hf-accent)] rounded"
                    />
                    <span className="text-sm text-[var(--hf-text-secondary)]">
                      I understand that Heart Forward may contact me for additional information or a site visit as part of the verification process.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-0.5 text-[var(--hf-accent)] rounded"
                    />
                    <span className="text-sm text-[var(--hf-text-secondary)]">
                      I agree to notify Heart Forward of any significant changes to my home&apos;s policies or capacity.
                    </span>
                  </label>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                <Link
                  href="/homes/apply/policies"
                  className="flex-1 px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium text-center hover:bg-white/5 transition-colors"
                >
                  Back
                </Link>
                <Link
                  href="/homes/apply/thanks"
                  className="flex-1 px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium text-center hover:bg-[var(--hf-accent-hover)] transition-colors"
                >
                  Submit Application
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
