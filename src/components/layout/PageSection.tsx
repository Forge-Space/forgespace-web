import { type ReactNode } from "react";

interface PageSectionProps {
  label?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function PageSection({
  label,
  title,
  subtitle,
  children,
  className = "",
}: PageSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        {label && (
          <p className="text-sm font-mono text-forge-primary tracking-wider uppercase mb-4">
            {label}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-forge-text-muted max-w-2xl mb-12">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
