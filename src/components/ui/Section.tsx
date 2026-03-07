import { type ReactNode } from "react";

type SectionVariant = "default" | "muted" | "gradient";

interface SectionProps {
  children: ReactNode;
  variant?: SectionVariant;
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

export function Section({
  children,
  variant = "default",
  label,
  title,
  subtitle,
  className = "",
  id,
  wide = false,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${variantStyles[variant]} ${className}`}>
      {variant === "gradient" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--forge-gradient-hero)" }}
          aria-hidden
        />
      )}
      <div className={`relative ${wide ? "max-w-6xl" : "max-w-5xl"} mx-auto px-6`}>
        {(label || title || subtitle) && (
          <div className="mb-14 max-w-2xl">
            {label && (
              <p className="text-xs font-mono text-forge-primary tracking-[0.2em] uppercase mb-3">
                {label}
              </p>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-forge-text-muted leading-relaxed">
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
