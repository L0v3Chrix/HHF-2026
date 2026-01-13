"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export default function HomesLocationPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              Location &amp; capacity
            </h1>
            <p className="text-[var(--hf-text-secondary)]">
              Where your home is located and how many residents you can support.
            </p>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-4 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--hf-text-muted)]">
              <span className="text-[var(--hf-accent)] font-medium">Step 3 of 5:</span>
              <span>Location &amp; capacity</span>
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-[60%] bg-[var(--hf-accent)] rounded-full" />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <form className="space-y-6">
                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Street address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                  <p className="text-xs text-[var(--hf-text-muted)] mt-1">
                    We keep addresses private. Used only for verification purposes.
                  </p>
                </div>

                {/* City */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Austin"
                      className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                      State
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                    >
                      <option value="">Select...</option>
                      <option value="TX">Texas</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* ZIP */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    ZIP code
                  </label>
                  <input
                    type="text"
                    placeholder="78701"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Total Capacity */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Total resident capacity
                  </label>
                  <p className="text-sm text-[var(--hf-text-muted)] mb-2">
                    How many residents can your home accommodate at full capacity?
                  </p>
                  <input
                    type="number"
                    min="2"
                    placeholder="e.g., 8"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Current Openings */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Current openings
                  </label>
                  <p className="text-sm text-[var(--hf-text-muted)] mb-2">
                    How many beds are currently available?
                  </p>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g., 2"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Gender-Specific */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Who does your home serve?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "men", label: "Men only" },
                      { value: "women", label: "Women only" },
                      { value: "all", label: "All genders" },
                      { value: "other", label: "Other (please specify in notes)" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option.value}
                          className="w-4 h-4 text-[var(--hf-accent)]"
                        />
                        <span className="text-sm text-[var(--hf-text-secondary)]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Monthly Cost */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Monthly cost per resident
                  </label>
                  <p className="text-sm text-[var(--hf-text-muted)] mb-2">
                    Approximate monthly fee residents pay (helps us match scholarships).
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--hf-text-muted)]">$</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="500"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  <Link
                    href="/homes/apply/about"
                    className="flex-1 px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium text-center hover:bg-white/5 transition-colors"
                  >
                    Back
                  </Link>
                  <Link
                    href="/homes/apply/policies"
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
