"use client";

import { useState, FormEvent } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CONTACT_METHODS, VOLUNTEER_INTERESTS } from "@/lib/forms";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

interface FormErrors {
  [key: string]: string;
}

export default function VolunteerPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [notes, setNotes] = useState("");
  const [consentAcknowledged, setConsentAcknowledged] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!availability.trim()) newErrors.availability = "Availability is required";
    if (!consentAcknowledged) newErrors.consentAcknowledged = "You must acknowledge the consent to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, interest]);
    } else {
      setInterests(interests.filter((i) => i !== interest));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState("loading");
    setErrors({});

    try {
      const response = await fetch("/api/forms/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          preferredContactMethod,
          interests,
          availability: availability.trim(),
          notes: notes.trim(),
          consentAcknowledged,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormState("success");
        setServerMessage(data.message);
        // Reset form
        setFullName("");
        setEmail("");
        setPhone("");
        setPreferredContactMethod(null);
        setInterests([]);
        setAvailability("");
        setNotes("");
        setConsentAcknowledged(false);
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

  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Volunteer with Heart Forward
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              We welcome volunteers who value dignity, choice, and non-judgment. Tell us what you&apos;re available for—we&apos;ll follow up with next steps.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              {formState === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-2">
                    Thank You!
                  </h2>
                  <p className="text-[var(--hf-text-secondary)] mb-6">
                    {serverMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="px-6 py-2 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] hover:bg-white/5 transition-colors"
                  >
                    Submit another form
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-xl text-[var(--hf-text-primary)] mb-6 text-center">
                    Volunteer Interest
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formState === "error" && serverMessage && (
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-sm text-red-400">{serverMessage}</p>
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        className={inputClasses("fullName")}
                        disabled={formState === "loading"}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
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

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Phone <span className="text-[var(--hf-text-muted)]">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(###) ###-####"
                        className={inputClasses("phone")}
                        disabled={formState === "loading"}
                      />
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Preferred contact method
                      </label>
                      <div className="flex gap-4">
                        {CONTACT_METHODS.map((method) => (
                          <label
                            key={method}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="contactMethod"
                              value={method}
                              checked={preferredContactMethod === method}
                              onChange={(e) => setPreferredContactMethod(e.target.value)}
                              className="w-4 h-4 text-[var(--hf-accent)]"
                              disabled={formState === "loading"}
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)] capitalize">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Interests
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {VOLUNTEER_INTERESTS.map((interest) => (
                          <label
                            key={interest}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={interest}
                              checked={interests.includes(interest)}
                              onChange={(e) => handleInterestChange(interest, e.target.checked)}
                              className="w-4 h-4 rounded border-[var(--hf-glass-border)] text-[var(--hf-accent)]"
                              disabled={formState === "loading"}
                            />
                            <span className="text-sm text-[var(--hf-text-secondary)] capitalize">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                        Availability
                      </label>
                      <input
                        type="text"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        placeholder="Weekdays, evenings, weekends…"
                        className={inputClasses("availability")}
                        disabled={formState === "loading"}
                      />
                      {errors.availability && (
                        <p className="mt-1 text-sm text-red-400">{errors.availability}</p>
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
                        placeholder="Anything you'd like us to know—needs, boundaries, preferences."
                        rows={3}
                        className={`${inputClasses("notes")} resize-none`}
                        disabled={formState === "loading"}
                      />
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={consentAcknowledged}
                        onChange={(e) => setConsentAcknowledged(e.target.checked)}
                        className={`w-4 h-4 mt-0.5 rounded text-[var(--hf-accent)] ${
                          errors.consentAcknowledged ? "border-red-500" : "border-[var(--hf-glass-border)]"
                        }`}
                        disabled={formState === "loading"}
                      />
                      <label htmlFor="consent" className="text-sm text-[var(--hf-text-secondary)]">
                        I understand Heart Forward may contact me about volunteering.
                      </label>
                    </div>
                    {errors.consentAcknowledged && (
                      <p className="mt-1 text-sm text-red-400">{errors.consentAcknowledged}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="w-full px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Volunteer Interest"
                      )}
                    </button>
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
