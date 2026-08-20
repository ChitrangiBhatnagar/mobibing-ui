import type { ReactNode } from "react";

export function TrustIndicator({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
        {icon}
      </span>
      {label}
    </div>
  );
}
