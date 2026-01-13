"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHomesFunnel } from "@/components/funnel/HomesFunnelProvider";
import { SavedIndicator } from "@/components/funnel/SavedIndicator";
import { HomesLocationData, GENDER_OPTIONS } from "@/types/homes-funnel";

export default function HomesLocationPage() {
  const router = useRouter();
  const { data, setStepData, isDirty, markStepComplete } = useHomesFunnel();
  const formData = data.location;

  const updateField = <K extends keyof HomesLocationData>(
    field: K,
    value: HomesLocationData[K]
  ) => {
    setStepData("location", { ...formData, [field]: value });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    markStepComplete(3);
    router.push("/homes/apply/policies");
  };

  const isValid =
    formData.streetAddress.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state !== "" &&
    formData.zip.trim() !== "" &&
    formData.totalCapacity !== "" &&
    formData.genderServed !== "";

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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--hf-text-muted)]">
                <span className="text-[var(--hf-accent)] font-medium">Step 3 of 5:</span>
                <span>Location &amp; capacity</span>
              </div>
              <SavedIndicator isDirty={isDirty} />
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-[60%] bg-[var(--hf-accent)] rounded-full transition-all duration-300" />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <form onSubmit={handleContinue} className="space-y-6">
                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Street address <span className="text-[var(--hf-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => updateField("streetAddress", e.target.value)}
                    placeholder="123 Main St"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                    required
                  />
                  <p className="text-xs text-[var(--hf-text-muted)] mt-1">
                    We keep addresses private. Used only for verification purposes.
                  </p>
                </div>

                {/* City / State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                      City <span className="text-[var(--hf-accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Austin"
                      className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                      State <span className="text-[var(--hf-accent)]">*</span>
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                      required
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
                    ZIP code <span className="text-[var(--hf-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => updateField("zip", e.target.value)}
                    placeholder="78701"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                    required
                  />
                </div>

                {/* Total Capacity */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Total resident capacity <span className="text-[var(--hf-accent)]">*</span>
                  </label>
                  <p className="text-sm text-[var(--hf-text-muted)] mb-2">
                    How many residents can your home accommodate at full capacity?
                  </p>
                  <input
                    type="number"
                    value={formData.totalCapacity}
                    onChange={(e) => updateField("totalCapacity", e.target.value)}
                    min="2"
                    placeholder="e.g., 8"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                    required
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
                    value={formData.currentOpenings}
                    onChange={(e) => updateField("currentOpenings", e.target.value)}
                    min="0"
                    placeholder="e.g., 2"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Gender-Specific */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Who does your home serve? <span className="text-[var(--hf-accent)]">*</span>
                  </label>
                  <div className="space-y-2">
                    {GENDER_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option.value}
                          checked={formData.genderServed === option.value}
                          onChange={(e) =>
                            updateField(
                              "genderServed",
                              e.target.value as HomesLocationData["genderServed"]
                            )
                          }
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
                      value={formData.monthlyCost}
                      onChange={(e) => updateField("monthlyCost", e.target.value)}
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
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`flex-1 px-6 py-3 rounded-full font-medium text-center transition-colors ${
                      isValid
                        ? "bg-[var(--hf-accent)] text-white hover:bg-[var(--hf-accent-hover)]"
                        : "bg-[var(--hf-glass)] text-[var(--hf-text-muted)] cursor-not-allowed"
                    }`}
                  >
                    Continue
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
