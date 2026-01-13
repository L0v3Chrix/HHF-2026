"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHomesFunnel } from "@/components/funnel/HomesFunnelProvider";
import { SavedIndicator } from "@/components/funnel/SavedIndicator";
import { HomesEligibilityData } from "@/types/homes-funnel";

export default function HomesEligibilityPage() {
  const router = useRouter();
  const { data, setStepData, isDirty, isLoaded, markStepComplete } = useHomesFunnel();
  const answers = data.eligibility;

  const setAnswers = (update: Partial<HomesEligibilityData>) => {
    setStepData("eligibility", { ...answers, ...update });
  };

  const allAnswered = Object.values(answers).every((v) => v !== "");
  const isEligible = Object.values(answers).every((v) => v === "yes");

  const handleContinue = () => {
    if (isEligible) {
      markStepComplete(1);
      router.push("/homes/apply/about");
    }
  };

  const questions = [
    {
      key: "isRecoveryHome" as const,
      question: "Is your home specifically for people in recovery from substance use?",
      helpText: "We verify homes that provide recovery-focused living environments.",
    },
    {
      key: "hasCapacity" as const,
      question: "Do you have capacity for at least 2 residents?",
      helpText: "This helps us understand your home's scope.",
    },
    {
      key: "acceptsReferrals" as const,
      question: "Are you willing to accept referrals from Heart Forward?",
      helpText: "Verification allows us to refer residents seeking safe housing.",
    },
    {
      key: "hasHouseRules" as const,
      question: "Do you have written house rules or expectations for residents?",
      helpText: "Clear guidelines help create a stable environment.",
    },
  ];

  // Show ineligible message if they answered "no" to anything
  const showIneligible = allAnswered && !isEligible;

  if (showIneligible) {
    return (
      <div className="min-h-screen bg-[var(--hf-bg-base)]">
        <SiteHeader />

        <main className="pt-24 sm:pt-28">
          <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-6">
                Thank you for your interest
              </h1>
              <div className="glass rounded-2xl p-8 text-left mb-8">
                <p className="text-[var(--hf-text-secondary)] mb-4">
                  Based on your responses, your home may not be a fit for our verification process at this time. This doesn&apos;t mean you&apos;re not doing good work—just that our criteria may not align with your current setup.
                </p>
                <p className="text-[var(--hf-text-secondary)] mb-4">
                  If you think we may have misunderstood something, or if your situation changes, we&apos;d be happy to talk.
                </p>
                <p className="text-[var(--hf-text-muted)] text-sm">
                  Common reasons for ineligibility:
                </p>
                <ul className="text-[var(--hf-text-muted)] text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Home is not specifically for people in recovery</li>
                  <li>Not currently accepting new residents</li>
                  <li>No established house rules or policies</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/verified-homes"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
                >
                  Learn About Verification
                </Link>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              Quick eligibility check
            </h1>
            <p className="text-[var(--hf-text-secondary)]">
              A few questions to make sure verification is a good fit for your home.
            </p>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-4 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--hf-text-muted)]">
                <span className="text-[var(--hf-accent)] font-medium">Step 1 of 5:</span>
                <span>Eligibility</span>
              </div>
              <SavedIndicator isDirty={isDirty} />
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-[20%] bg-[var(--hf-accent)] rounded-full transition-all duration-300" />
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Privacy note */}
            <div className="mb-6 p-4 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)]">
              <p className="text-sm text-[var(--hf-text-muted)]">
                Your information stays private. We&apos;ll only use it to support your verification application.
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.key} className="glass rounded-2xl p-6">
                  <p className="text-[var(--hf-text-primary)] font-medium mb-2">
                    {q.question}
                  </p>
                  <p className="text-sm text-[var(--hf-text-muted)] mb-4">
                    {q.helpText}
                  </p>
                  <div className="flex gap-4">
                    {["Yes", "No"].map((option) => (
                      <label
                        key={option}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                          answers[q.key] === option.toLowerCase()
                            ? "border-[var(--hf-accent)] bg-[var(--hf-accent)]/10 text-[var(--hf-accent)]"
                            : "border-[var(--hf-glass-border)] text-[var(--hf-text-secondary)] hover:border-[var(--hf-accent)]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.key}
                          value={option.toLowerCase()}
                          checked={answers[q.key] === option.toLowerCase()}
                          onChange={(e) =>
                            setAnswers({ [q.key]: e.target.value as "yes" | "no" })
                          }
                          className="sr-only"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div className="mt-8">
              <button
                onClick={handleContinue}
                disabled={!allAnswered || !isEligible}
                className={`w-full px-6 py-3 rounded-full font-medium text-center transition-colors ${
                  allAnswered && isEligible
                    ? "bg-[var(--hf-accent)] text-white hover:bg-[var(--hf-accent-hover)]"
                    : "bg-[var(--hf-glass)] text-[var(--hf-text-muted)] cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>

            {/* Loading state placeholder */}
            {!isLoaded && (
              <div className="mt-4 text-center text-sm text-[var(--hf-text-muted)]">
                Loading your progress...
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
