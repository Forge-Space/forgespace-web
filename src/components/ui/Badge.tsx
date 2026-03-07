import { type ReactNode } from "react";

type BadgeVariant = "default" | "outline" | "solid";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "border border-forge-primary/40 bg-forge-primary/10 text-forge-primary",
  outline: "border border-forge-border text-forge-text-muted",
  solid: "bg-forge-primary text-white",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
