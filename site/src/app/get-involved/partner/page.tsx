"use client";

import { useState, FormEvent } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PARTNERSHIP_INTERESTS } from "@/lib/forms";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

interface FormErrors {
  [key: string]: string;
}

export default function PartnerPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  // Form fields
  const [organizationName, setOrganizationName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [partnershipInterest, setPartnershipInterest] = useState("");
  const [notes, setNotes] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!organizationName.trim()) newErrors.organizationName = "Organization name is required";
    if (!contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!partnershipInterest) newErrors.partnershipInterest = "Please select a partnership interest";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState("loading");
    setErrors({});

    try {
      const response = await fetch("/api/forms/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: organizationName.trim(),
          contactName: contactName.trim(),
          email: email.trim(),
          partnershipInterest,
          notes: notes.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormState("success");
        setServerMessage(data.message);
        // Reset form
        setOrganizationName("");
        setContactName("");
        setEmail("");
        setPartnershipInterest("");
        setNotes("");
      } else {
        setFormState("error");
        setServerMessage(data.message || "Something went wrong");
        if (data.errors) {
          const fieldErrors: FormErrors = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
        }
      }
    } catch {
      setFormState("error");
      setServerMessage("Failed to submit. Please try again.");
    }
  };

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 transition-colors ${
      errors[fieldName]
        ? "border-red-500 focus:ring-red-500"
        : "border-[var(--hf-glass-border)] focus:ring-[var(--hf-accent)]"
    }`;

  const partnershipLabels: Record<string, string> = {
    sponsorship: "Sponsorship",
    "in-kind": "In-kind",
    referral: "Referral partner",
    other: "Other",
  };

  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Partner with Heart Forward
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Partnerships help sustain recovery living scholarships and community education. If you&apos;re looking for an aligned, dignity-centered mission, we&apos;d love to connect.
            </p>
          </div>
        </section>

        {/* Partner Options */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Community Partner",
                  description: "Support events, resources, and outreach.",
                },
                {
                  title: "Scholarship Supporter",
                  description: "Help fund recovery living scholarship support.",
                },
                {
                  title: "In-kind Partner",
                  description: "Offer services, space, supplies, or expertise.",
                },
              ].map((option) => (
                <div
                  key={option.title}
                  className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-[var(--hf-text-secondary)]">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Inquiry Form */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              {formState === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-2">
                    Inquiry Received
                  </h2>
                  <p className="text-[var(--hf-text-secondary)] mb-6">
                    {serverMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="px-6 py-2 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] hover:bg-white/5 transition-colors"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-xl text-[var(--hf-text-primary)] mb-6 text-center">
                    Partnership Inquiry
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formState === "error" && serverMessage && (
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-sm text-red-400">{serverMessage}</p>
                      </div>
                    )}

                    {/* Organization Name */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Organization name
                      </label>
                      <input
                        type="text"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        placeholder="Organization or group name"
                        className={inputClasses("organizationName")}
                        disabled={formState === "loading"}
                      />
                      {errors.organizationName && (
                        <p className="mt-1 text-sm text-red-400">{errors.organizationName}</p>
                      )}
                    </div>

                    {/* Contact Name */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Contact name
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        className={inputClasses("contactName")}
                        disabled={formState === "loading"}
                      />
                      {errors.contactName && (
                        <p className="mt-1 text-sm text-red-400">{errors.contactName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@email.com"
                        className={inputClasses("email")}
                        disabled={formState === "loading"}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Partnership Interest */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Partnership interest
                      </label>
                      <select
                        value={partnershipInterest}
                        onChange={(e) => setPartnershipInterest(e.target.value)}
                        className={inputClasses("partnershipInterest")}
                        disabled={formState === "loading"}
                      >
                        <option value="">Select interest</option>
                        {PARTNERSHIP_INTERESTS.map((interest) => (
                          <option key={interest} value={interest}>
                            {partnershipLabels[interest] || interest}
                          </option>
                        ))}
                      </select>
                      {errors.partnershipInterest && (
                        <p className="mt-1 text-sm text-red-400">{errors.partnershipInterest}</p>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Notes <span className="text-[var(--hf-text-muted)]">(Optional)</span>
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="What are you hoping to support? Any goals or timelines?"
                        rows={4}
                        className={`${inputClasses("notes")} resize-none`}
                        disabled={formState === "loading"}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="w-full px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Partnership Inquiry"
                      )}
                    </button>

                    {/* Microcopy */}
                    <p className="text-xs text-[var(--hf-text-muted)] text-center">
                      We&apos;ll respond with clarity and care—no hard sell.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
