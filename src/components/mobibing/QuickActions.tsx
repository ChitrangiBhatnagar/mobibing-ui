import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type QuickAction = {
  label: string;
  hint?: string;
  icon: ReactNode;
  onClick?: () => void;
  to?: "/marketplace" | "/sell" | "/wishlist" | "/account";
  active?: boolean;
};

export function QuickActionsBar({
  title = "Quick actions",
  actions,
}: {
  title?: string;
  actions: QuickAction[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-label={title}
      className="surface-card mb-8 rounded-3xl p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h2>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {actions.map((action) => {
          const body = (
            <>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl",
                  action.active
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary-soft text-primary-dark",
                )}
              >
                {action.icon}
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold leading-tight">
                  {action.label}
                </span>
                {action.hint ? (
                  <span className="block text-xs text-muted-foreground">
                    {action.hint}
                  </span>
                ) : null}
              </span>
            </>
          );

          const classes = cn(
            "flex min-w-[13rem] shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 transition-colors",
            action.active
              ? "border-primary bg-primary-soft/60"
              : "border-border hover:border-primary/40 hover:bg-muted/60",
          );

          if (action.to) {
            return (
              <Link key={action.label} to={action.to} className={classes}>
                {body}
              </Link>
            );
          }

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              aria-pressed={action.active}
              className={classes}
            >
              {body}
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}
