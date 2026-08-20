import { motion } from "motion/react";
import { BadgeCheck, Star } from "lucide-react";

export type Testimonial = {
  name: string;
  city: string;
  initials: string;
  rating: number;
  purchase: string;
  quote: string;
};

export function TestimonialCard({
  testimonial,
  index = 0,
}: {
  testimonial: Testimonial;
  index?: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="surface-card flex h-full flex-col gap-4 rounded-3xl p-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {testimonial.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold">
            {testimonial.name}
          </span>
          <span className="block text-xs text-muted-foreground">
            {testimonial.city}
          </span>
        </span>
        <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary-dark">
          <BadgeCheck className="size-4" strokeWidth={1.75} aria-hidden="true" />
          Verified Buyer
        </span>
      </div>

      <div
        className="flex gap-0.5"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < testimonial.rating
                ? "size-4 fill-accent text-accent"
                : "size-4 text-border"
            }
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="text-sm leading-relaxed text-muted-foreground">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-auto text-xs font-semibold uppercase tracking-wider text-accent">
        {testimonial.purchase}
      </figcaption>
    </motion.figure>
  );
}
