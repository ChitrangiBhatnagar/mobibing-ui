import { motion } from "motion/react";
import {
  BadgeCheck,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import heroPhones from "@/assets/hero-phones.png";
import { TrustIndicator } from "./TrustIndicator";

const floatingBadges = [
  { label: "Certified Pre-Owned", className: "left-0 top-8", delay: 0.2 },
  { label: "Better for the Planet", className: "right-0 top-24", delay: 0.35 },
  { label: "Up to 70% Savings", className: "left-2 bottom-28", delay: 0.5 },
  { label: "Quality Checked", className: "right-4 bottom-12", delay: 0.65 },
  {
    label: "Warranty Included",
    className: "left-1/2 -translate-x-1/2 -bottom-2",
    delay: 0.8,
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-32 lg:pt-40">
      {/* premium background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="halo-glow absolute -left-24 top-10 size-[420px] rounded-full opacity-70" />
        <div className="halo-glow absolute -right-16 bottom-0 size-[380px] rounded-full opacity-50" />
        <div className="dotted-grid absolute right-1/3 top-16 size-64 opacity-25 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        <div className="absolute right-10 top-28 size-[460px] rounded-full border border-accent/20" />
        <div className="absolute right-24 top-44 size-[300px] rounded-full border border-border" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold text-primary-dark">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Bengaluru-born certified device marketplace
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            Smart Phones.{" "}
            <span className="text-primary-dark">Smarter Choice.</span>{" "}
            <span className="text-accent">Better Planet.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Buy, sell, and exchange certified pre-owned smartphones that are
            professionally tested, verified, and backed by warranty.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="#featured"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-colors hover:bg-primary-dark"
            >
              Explore Phones
            </motion.a>
            <motion.a
              href="#sell"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border-2 border-accent bg-background px-8 py-4 text-base font-semibold text-accent transition-colors hover:bg-accent-soft"
            >
              Sell Your Phone
            </motion.a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            <TrustIndicator
              icon={<Star className="size-3.5 fill-accent text-accent" />}
              label="4.8 Rating"
            />
            <TrustIndicator
              icon={<Users className="size-3.5" />}
              label="50,000+ Happy Customers"
            />
            <TrustIndicator
              icon={<BadgeCheck className="size-3.5" />}
              label="Certified Devices"
            />
            <TrustIndicator
              icon={<ShieldCheck className="size-3.5" />}
              label="Up to 12-Month Warranty"
            />
          </div>
        </motion.div>

        {/* Right: 3D floating composition */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div
            aria-hidden="true"
            className="halo-glow absolute inset-x-6 top-10 aspect-square rounded-full"
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-4 rounded-full border-2 border-dashed border-accent/35"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-16 rounded-full border border-accent/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />

          <motion.img
            src={heroPhones}
            alt="Certified pre-owned smartphones in green, black, and silver levitating above a glowing podium"
            width={1280}
            height={1280}
            className="relative z-10 w-full drop-shadow-[0_30px_60px_rgba(17,17,17,0.16)]"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {floatingBadges.map((badge) => (
            <motion.span
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: badge.delay },
                scale: { duration: 0.5, delay: badge.delay },
                y: {
                  duration: 5 + badge.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className={`glass-card absolute z-20 hidden rounded-2xl px-4 py-2 text-xs font-semibold sm:block ${badge.className}`}
            >
              <span className="flex items-center gap-1.5">
                <Leaf
                  className="size-3.5 text-primary-dark"
                  aria-hidden="true"
                />
                {badge.label}
              </span>
            </motion.span>
          ))}

          {[
            "left-10 top-1/3",
            "right-12 top-1/2",
            "left-1/4 bottom-16",
            "right-1/3 top-10",
          ].map((pos, i) => (
            <motion.span
              key={pos}
              aria-hidden="true"
              className={`absolute size-2 rounded-full bg-primary/60 blur-[1px] ${pos}`}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -18, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
