import { motion } from "motion/react";
import { CalendarClock, IndianRupee, Smartphone } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Select Device",
    copy: "Pick your model, storage, and condition in under a minute.",
  },
  {
    icon: IndianRupee,
    title: "Get Instant Quote",
    copy: "See a transparent, locked-in price backed by live market data.",
  },
  {
    icon: CalendarClock,
    title: "Schedule Pickup",
    copy: "Free doorstep pickup and same-day payment after inspection.",
  },
];

export function SellFlow() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-[12%] right-[12%] top-9 hidden h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20 md:block"
      />
      <div className="relative grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="text-center"
          >
            <span className="relative mx-auto flex size-18 items-center justify-center rounded-full bg-background shadow-[var(--shadow-soft)] ring-1 ring-border">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
                <step.icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {step.copy}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
