import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export function CategoryCard({
  icon: Icon,
  title,
  count,
  index = 0,
}: {
  icon: LucideIcon;
  title: string;
  count: string;
  index?: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -8 }}
      className="group surface-card flex flex-col items-start gap-4 rounded-3xl p-6 text-left transition-shadow hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark transition-transform duration-300 group-hover:scale-110">
        <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-base font-semibold">{title}</span>
        <span className="mt-0.5 block text-sm text-muted-foreground">
          {count}
        </span>
      </span>
    </motion.button>
  );
}
