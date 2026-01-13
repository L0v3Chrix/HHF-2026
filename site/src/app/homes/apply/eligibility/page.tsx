"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomesEligibilityPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    isRecoveryHome: "",
    hasCapacity: "",
    acceptsReferrals: "",
    hasHouseRules: "",
  });
  const [showIneligible, setShowIneligible] = useState(false);

  const allAnswered = Object.values(answers).every((v) => v !== "");
  const isEligible = Object.values(answers).every((v) => v === "yes");

  const handleContinue = () => {
    if (isEligible) {
      router.push("/homes/apply/about");
    } else {
      setShowIneligible(true);
    }
  };

  const questions = [
    {
      key: "isRecoveryHome",
      question: "Is your home specifically for people in recovery from substance use?",
      helpText: "We verify homes that provide recovery-focused living environments.",
    },
    {
      key: "hasCapacity",
      question: "Do you have capacity for at least 2 residents?",
      helpText: "This helps us understand your home's scope.",
    },
    {
      key: "acceptsReferrals",
      question: "Are you willing to accept referrals from Heart Forward?",
      helpText: "Verification allows us to refer residents seeking safe housing.",
    },
    {
      key: "hasHouseRules",
      question: "Do you have written house rules or expectations for residents?",
      helpText: "Clear guidelines help create a stable environment.",
    },
  ];

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
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--hf-text-muted)]">
              <span className="text-[var(--hf-accent)] font-medium">Step 1 of 5:</span>
              <span>Eligibility</span>
            </div>
            <div className="mt-4 h-1 bg-[var(--hf-glass-border)] rounded-full overflow-hidden">
              <div className="h-full w-[20%] bg-[var(--hf-accent)] rounded-full" />
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="py-12 sm:py-16 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
                          answers[q.key as keyof typeof answers] === option.toLowerCase()
                            ? "border-[var(--hf-accent)] bg-[var(--hf-accent)]/10 text-[var(--hf-accent)]"
                            : "border-[var(--hf-glass-border)] text-[var(--hf-text-secondary)] hover:border-[var(--hf-accent)]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.key}
                          value={option.toLowerCase()}
                          checked={answers[q.key as keyof typeof answers] === option.toLowerCase()}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [q.key]: e.target.value,
                            }))
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
                disabled={!allAnswered}
                className={`w-full px-6 py-3 rounded-full font-medium text-center transition-colors ${
                  allAnswered
                    ? "bg-[var(--hf-accent)] text-white hover:bg-[var(--hf-accent-hover)]"
                    : "bg-[var(--hf-glass)] text-[var(--hf-text-muted)] cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
