"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export default function HomesAboutPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              About your home
            </h1>
            <p className="text-[var(--hf-text-secondary)]">
              Basic information about your recovery home and how we can reach you.
            </p>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-4 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--hf-text-muted)]">
              <span className="text-[var(--hf-accent)] font-medium">Step 2 of 5:</span>
              <span>About your home</span>
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-[40%] bg-[var(--hf-accent)] rounded-full" />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <form className="space-y-6">
                {/* Home Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Home name
                  </label>
                  <input
                    type="text"
                    placeholder="What is your recovery home called?"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Contact Person Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Primary contact name
                  </label>
                  <input
                    type="text"
                    placeholder="Who should we contact about verification?"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="contact@yourhome.com"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="(###) ###-####"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Website <span className="text-[var(--hf-text-muted)]">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourhome.com"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* How Long Operating */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    How long has your home been operating?
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  >
                    <option value="">Select...</option>
                    <option value="less-than-1">Less than 1 year</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-plus">5+ years</option>
                  </select>
                </div>

                {/* Brief Description */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Tell us about your home
                  </label>
                  <p className="text-sm text-[var(--hf-text-muted)] mb-2">
                    What makes your recovery home special? What&apos;s your approach?
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Share a brief description..."
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] resize-none"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  <Link
                    href="/homes/apply/eligibility"
                    className="flex-1 px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium text-center hover:bg-white/5 transition-colors"
                  >
                    Back
                  </Link>
                  <Link
                    href="/homes/apply/location"
                    className="flex-1 px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium text-center hover:bg-[var(--hf-accent-hover)] transition-colors"
                  >
                    Continue
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
