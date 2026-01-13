import Link from "next/link";
import Image from "next/image";

const footerNavigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Resources", href: "/resources" },
    { name: "Events", href: "/events" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Accessibility", href: "/accessibility" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-[var(--hf-bg-elevated)] border-t border-[var(--hf-glass-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/logos/heart-forward-logo.png"
                alt="Heart Forward Foundation"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="font-heading text-xl text-cream">
                Heart Forward
                <span className="block text-sm text-muted font-body">Foundation</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--hf-text-secondary)] max-w-xs">
              You deserve support that feels safe, respectful, and real.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--hf-text-primary)] mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {footerNavigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--hf-text-secondary)] hover:text-[var(--hf-text-primary)] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Now ATX & Legal */}
          <div className="space-y-6">
            {/* Help Now ATX */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--hf-text-primary)] mb-4">
                Need Help Now?
              </h3>
              <Link
                href={process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--hf-helpnow-bg)] border border-[var(--hf-helpnow-border)] text-[var(--hf-text-primary)] hover:bg-[var(--hf-maroon)] transition-colors"
              >
                Get Help Now
              </Link>
              <p className="mt-2 text-xs text-[var(--hf-text-muted)]">
                For support needs outside Heart Forward&apos;s scope.
              </p>
            </div>

            {/* Legal links */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--hf-text-primary)] mb-4">
                Legal
              </h3>
              <ul className="flex flex-wrap gap-4">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--hf-text-muted)] hover:text-[var(--hf-text-secondary)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Safety disclaimer */}
        <div className="pt-8 border-t border-[var(--hf-glass-border)]">
          <p className="text-xs text-[var(--hf-text-muted)] max-w-3xl">
            If you&apos;re in immediate danger or need urgent medical care, call 911 (or your
            local emergency number). If you need quick, compassionate support right now,
            you can connect with{" "}
            <Link
              href={process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--hf-text-secondary)] hover:text-[var(--hf-text-primary)] underline"
            >
              Help Now ATX
            </Link>
            .
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[var(--hf-glass-border)]">
          <p className="text-xs text-[var(--hf-text-muted)] text-center">
            &copy; {new Date().getFullYear()} Heart Forward Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
