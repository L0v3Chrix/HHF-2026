/**
 * Semantic CTA Components
 *
 * Three distinct patterns enforced by component usage:
 * - PrimaryButton: Main CTAs (filled pill)
 * - SecondaryButton: Alternative actions (outline/ghost)
 * - TextLink: Inline navigation (underline on hover)
 *
 * Rules:
 * - Navigation = Link (internal) or <a> (external)
 * - Actions = <button type="button"> or <button type="submit">
 * - No clickable <div> elements
 */

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Base styles
const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] focus:ring-offset-2 focus:ring-offset-[var(--hf-bg-base)] disabled:opacity-50 disabled:pointer-events-none";

const primaryStyles = cn(
  baseStyles,
  "px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white hover:bg-[var(--hf-accent-hover)]"
);

const secondaryStyles = cn(
  baseStyles,
  "px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] hover:bg-white/5"
);

const textLinkStyles = "text-[var(--hf-accent)] hover:text-[var(--hf-accent-hover)] hover:underline transition-colors inline-flex items-center gap-1";

// Type definitions
type ButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  external?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * PrimaryButton - Main CTA (filled pill)
 *
 * @example
 * // As navigation link
 * <PrimaryButton href="/scholarships/eligibility">Check Eligibility</PrimaryButton>
 *
 * // As external link
 * <PrimaryButton href="https://helpnowatx.org" external>Help Now ATX</PrimaryButton>
 *
 * // As action button
 * <PrimaryButton onClick={handleSubmit}>Submit Application</PrimaryButton>
 *
 * // As form submit
 * <PrimaryButton type="submit">Send Message</PrimaryButton>
 */
export const PrimaryButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(({ children, className, ...props }, ref) => {
  const combinedClassName = cn(primaryStyles, className);

  // External link
  if ("href" in props && props.href && props.external) {
    const { href, external, ...anchorProps } = props;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  // Internal navigation link
  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={combinedClassName}
        {...(linkProps as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
      >
        {children}
      </Link>
    );
  }

  // Button
  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type || "button"}
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
});
PrimaryButton.displayName = "PrimaryButton";

/**
 * SecondaryButton - Alternative action (outline/ghost)
 *
 * @example
 * // As navigation link
 * <SecondaryButton href="/contact">Contact Our Team</SecondaryButton>
 *
 * // As action button
 * <SecondaryButton onClick={handleBack}>Back</SecondaryButton>
 */
export const SecondaryButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(({ children, className, ...props }, ref) => {
  const combinedClassName = cn(secondaryStyles, className);

  // External link
  if ("href" in props && props.href && props.external) {
    const { href, external, ...anchorProps } = props;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  // Internal navigation link
  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={combinedClassName}
        {...(linkProps as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
      >
        {children}
      </Link>
    );
  }

  // Button
  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type || "button"}
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
});
SecondaryButton.displayName = "SecondaryButton";

/**
 * TextLink - Inline navigation (underline on hover)
 *
 * @example
 * // As navigation link
 * <TextLink href="/impact">See Our Impact</TextLink>
 *
 * // With arrow icon
 * <TextLink href="/impact" withArrow>See Our Impact</TextLink>
 *
 * // As external link
 * <TextLink href="https://helpnowatx.org" external>Help Now ATX</TextLink>
 */
type TextLinkProps = ButtonBaseProps & {
  href: string;
  external?: boolean;
  withArrow?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ children, className, external, withArrow, href, ...props }, ref) => {
    const combinedClassName = cn(textLinkStyles, className);

    const content = (
      <>
        {children}
        {withArrow && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </>
    );

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link ref={ref} href={href} className={combinedClassName} {...props}>
        {content}
      </Link>
    );
  }
);
TextLink.displayName = "TextLink";

// Export convenience types
export type { ButtonProps, TextLinkProps };
