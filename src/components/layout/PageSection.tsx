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
    <div className={className}>
      {label && (
        <p className="text-xs font-mono text-forge-primary tracking-[0.2em] uppercase mb-3">
          {label}
        </p>
      )}
      <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-tight text-foreground mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base text-forge-text-muted max-w-2xl mb-8">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
