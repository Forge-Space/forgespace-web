"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
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

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
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
        transition={{ duration: 0.3, ease: EASE_SIZA }}
        className="absolute right-0 top-0 h-full w-72 border-l border-forge-border bg-background p-6 flex flex-col"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-display text-base font-bold text-foreground">
            Forge Space
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-forge-text-muted hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                data-fs-cta-event={FORGE_CTA_EVENTS.GITHUB}
                data-fs-cta-target="github"
                data-fs-cta-location={`nav_mobile_${link.label.toLowerCase()}`}
                className="rounded-md px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="rounded-md px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <a
            href="https://siza.forgespace.co"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            data-fs-cta-event={FORGE_CTA_EVENTS.SIZA}
            data-fs-cta-target="siza"
            data-fs-cta-location="nav_signin_mobile"
            data-fs-pass-attribution="true"
            className="rounded-md px-3 py-2.5 text-sm text-center text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
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
            Get Started
          </Button>
        </div>
      </motion.aside>
    </div>
  );
}
