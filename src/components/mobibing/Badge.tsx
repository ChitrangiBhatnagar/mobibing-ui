import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "green" | "orange" | "neutral" | "glass";

export function Badge({
  children,
  tone = "green",
  className,
  icon,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  icon?: ReactNode;
}) {
  const tones: Record<BadgeTone, string> = {
    green: "bg-primary-soft text-primary-dark border-primary/20",
    orange: "bg-accent-soft text-accent border-accent/25",
    neutral: "bg-muted text-muted-foreground border-border",
    glass: "glass-card text-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
