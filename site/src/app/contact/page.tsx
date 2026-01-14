"use client";

import { useState, FormEvent } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { EXTERNAL } from "@/lib/links";
import { CONTACT_TOPICS } from "@/lib/forms";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

interface FormErrors {
  [key: string]: string;
}

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!topic) newErrors.topic = "Please select a topic";
    if (!message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState("loading");
    setErrors({});

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          topic,
          message: message.trim(),
          newsletterOptIn,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormState("success");
        setServerMessage(data.message);
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setTopic("");
        setMessage("");
        setNewsletterOptIn(false);
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
              Contact Heart Forward
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              If you&apos;re unsure where to start, that&apos;s okay. Tell us what you need, and we&apos;ll respond with options.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              {formState === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-2">
                    Message Sent
                  </h2>
                  <p className="text-[var(--hf-text-secondary)] mb-6">
                    {serverMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="px-6 py-2 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] hover:bg-white/5 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formState === "error" && serverMessage && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <p className="text-sm text-red-400">{serverMessage}</p>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={inputClasses("name")}
                      disabled={formState === "loading"}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
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

                  {/* Topic */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                      I&apos;m reaching out about
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className={inputClasses("topic")}
                      disabled={formState === "loading"}
                    >
                      <option value="">Select a topic</option>
                      {CONTACT_TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                    {errors.topic && (
                      <p className="mt-1 text-sm text-red-400">{errors.topic}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's going on? What would support look like?"
                      rows={4}
                      className={`${inputClasses("message")} resize-none`}
                      disabled={formState === "loading"}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Newsletter Opt-in */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={newsletterOptIn}
                      onChange={(e) => setNewsletterOptIn(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-[var(--hf-glass-border)] text-[var(--hf-accent)]"
                      disabled={formState === "loading"}
                    />
                    <label htmlFor="newsletter" className="text-sm text-[var(--hf-text-secondary)]">
                      It&apos;s okay to email me about resources and updates.
                    </label>
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
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Safety Note */}
        <section className="py-8 bg-[var(--hf-bg-base)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-[var(--hf-text-secondary)] mb-3">
                Heart Forward doesn&apos;t provide crisis services or medical advice.
              </p>
              <a
                href={EXTERNAL.helpNowATX}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Help Now ATX
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
