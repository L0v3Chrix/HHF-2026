"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-[var(--hf-bg-base)]/90 backdrop-blur-md" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top row: Logo centered, Help Now ATX right */}
        <div className="flex h-16 items-center justify-between">
          {/* Spacer for balance */}
          <div className="w-32 hidden md:block" />

          {/* Centered Logo */}
          <Link href="/" className="relative flex items-center">
            <Image
              src="/brand/logos/Header-Heart-Forward-Logo.png"
              alt="Heart Forward Foundation"
              width={440}
              height={131}
              priority={true}
              className="h-10 w-auto sm:h-12 object-contain"
            />
          </Link>

          {/* Help Now ATX Button */}
          <div className="flex items-center gap-4">
            <Link
              href={process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                "bg-[var(--hf-maroon)]/80 border border-[var(--hf-maroon-light)]/30",
                "text-[var(--hf-cream)] hover:bg-[var(--hf-maroon)] transition-colors"
              )}
            >
              <HelpNowIcon className="h-4 w-4" />
              Help Now ATX
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--hf-text-secondary)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Divider line */}
        <div className="hidden md:block border-t border-[var(--hf-glass-border)]" />

        {/* Desktop Navigation - below logo */}
        <nav className="hidden md:flex md:items-center md:justify-center md:gap-10 py-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-[var(--hf-text-secondary)] hover:text-[var(--hf-text-primary)] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-1 pb-4 pt-2 border-t border-[var(--hf-glass-border)]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-[var(--hf-text-secondary)] hover:text-[var(--hf-text-primary)] hover:bg-[var(--hf-glass)] rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-base font-medium text-[var(--hf-text-primary)] bg-[var(--hf-helpnow-bg)] rounded-lg mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HelpNowIcon className="h-4 w-4" />
              Help Now ATX
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Simple Help Now ATX icon (stylized waves/chat bubble)
function HelpNowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </svg>
  );
}

export default SiteHeader;
