import { type ReactNode } from "react";

type SectionVariant = "default" | "muted" | "gradient";
type SectionDensity = "default" | "dense" | "loose";

interface SectionProps {
  children: ReactNode;
  variant?: SectionVariant;
  density?: SectionDensity;
  label?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
  wide?: boolean;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "",
  muted: "bg-forge-bg-elevated",
  gradient: "relative",
};

const densityStyles: Record<SectionDensity, string> = {
  loose: "py-20 md:py-28",
  default: "py-14 md:py-20",
  dense: "py-10 md:py-14",
};

export function Section({
  children,
  variant = "default",
  density = "default",
  label,
  title,
  subtitle,
  className = "",
  id,
  wide = false,
}: SectionProps) {
  return (
    <section id={id} className={`${densityStyles[density]} ${variantStyles[variant]} ${className}`}>
      {variant === "gradient" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--forge-gradient-hero)" }}
          aria-hidden
        />
      )}
      <div className={`relative ${wide ? "max-w-6xl" : "max-w-5xl"} mx-auto px-6`}>
        {(label || title || subtitle) && (
          <div className="mb-10 max-w-2xl">
            {label && (
              <p className="text-xs font-mono text-forge-primary tracking-[0.2em] uppercase mb-3">
                {label}
              </p>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-tight text-foreground mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base text-forge-text-muted leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
