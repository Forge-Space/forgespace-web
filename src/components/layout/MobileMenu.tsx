"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";
import { EASE_SIZA } from "@/lib/constants";

interface MobileNavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: MobileNavLink[];
}

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = window.requestAnimationFrame(() => {
      const [first] = getFocusableElements(panelRef.current);
      first?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements(panelRef.current);
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = bodyOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const navLinks = links.filter((l) => !l.external);
  const externalLinks = links.filter((l) => l.external);

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu backdrop"
      />
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.28, ease: EASE_SIZA }}
        className="absolute right-0 top-0 h-full w-72 border-l border-forge-border bg-[#0f0f12] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-forge-border">
          <span className="font-display text-sm font-bold text-foreground tracking-tight">
            Forge Space
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-forge-text-muted hover:text-foreground hover:bg-forge-surface transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-0.5 px-3 py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-forge-primary/10 text-foreground font-medium"
                    : "text-forge-text-muted hover:text-foreground hover:bg-forge-surface"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-forge-primary shrink-0" />
                )}
              </Link>
            );
          })}

          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              data-fs-cta-event={FORGE_CTA_EVENTS.GITHUB}
              data-fs-cta-target="github"
              data-fs-cta-location={`nav_mobile_${link.label.toLowerCase()}`}
              className="rounded-lg px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface flex items-center gap-2"
            >
              {link.label}
              <span className="text-forge-text-subtle text-xs ml-auto">↗</span>
            </a>
          ))}
        </nav>

        {/* Divider + CTAs */}
        <div className="mt-auto border-t border-forge-border px-4 py-5 flex flex-col gap-2.5">
          <a
            href="https://siza.forgespace.co"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            data-fs-cta-event={FORGE_CTA_EVENTS.SIZA}
            data-fs-cta-target="siza"
            data-fs-cta-location="nav_signin_mobile"
            data-fs-pass-attribution="true"
            className="block rounded-lg px-3 py-2.5 text-sm text-center text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface border border-forge-border"
          >
            Sign in
          </a>
          <Button
            href="https://siza.forgespace.co"
            external
            onClick={onClose}
            ctaEvent={FORGE_CTA_EVENTS.SIZA}
            ctaTarget="siza"
            ctaLocation="nav_get_started_mobile"
            passAttribution
          >
            Get Started Free
          </Button>
        </div>
      </motion.aside>
    </div>
  );
}
