import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  BadgeCheck,
  Battery,
  CreditCard,
  Cpu,
  Gamepad2,
  Headphones,
  Laptop,
  Leaf,
  Recycle,
  RefreshCcw,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Tablet,
  Truck,
  Watch,
} from "lucide-react";

import sustainabilityArt from "@/assets/sustainability.png";
import { Navbar } from "@/components/mobibing/Navbar";
import { Hero } from "@/components/mobibing/Hero";
import { SearchBar } from "@/components/mobibing/SearchBar";
import { CategoryCard } from "@/components/mobibing/CategoryCard";
import { FeatureCard } from "@/components/mobibing/FeatureCard";
import { ProductCarousel } from "@/components/mobibing/ProductCarousel";
import { SellFlow } from "@/components/mobibing/SellFlow";
import {
  TestimonialCard,
  type Testimonial,
} from "@/components/mobibing/TestimonialCard";
import { Counter } from "@/components/mobibing/Counter";
import { Footer } from "@/components/mobibing/Footer";
import { Badge } from "@/components/mobibing/Badge";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "MobiBing — Certified Pre-Owned Phones, Laptops & Tablets",
      },
      {
        name: "description",
        content:
          "Buy, sell, and exchange certified pre-owned smartphones, laptops and tablets. 32+ quality checks, up to 12-month warranty, up to 70% savings.",
      },
      {
        property: "og:title",
        content: "MobiBing — Smart Phones. Smarter Choice. Better Planet.",
      },
      {
        property: "og:description",
        content:
          "India's premium marketplace for certified pre-owned electronics — tested, verified, warranted, and better for the planet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const heroFeatures = [
  { icon: ScanSearch, title: "32+ Quality Checks", description: "Every device, every time." },
  { icon: BadgeCheck, title: "Certified Devices", description: "Graded by trained engineers." },
  { icon: CreditCard, title: "Secure Payments", description: "Escrow-backed checkout." },
  { icon: Leaf, title: "Eco-Friendly Marketplace", description: "Circular by design." },
];

const categories = [
  { icon: Smartphone, title: "Smartphones", count: "4,200+ devices" },
  { icon: Laptop, title: "Laptops", count: "1,850+ devices" },
  { icon: Tablet, title: "Tablets", count: "960+ devices" },
  { icon: Watch, title: "Smartwatches", count: "640+ devices" },
  { icon: Gamepad2, title: "Gaming", count: "410+ devices" },
  { icon: Headphones, title: "Accessories", count: "2,300+ items" },
];

const whyFeatures = [
  { icon: BadgeCheck, title: "Certified Quality", description: "Graded on a transparent scale from Good to Like New." },
  { icon: Cpu, title: "Expert Testing", description: "Battery health, display, camera, and network diagnostics." },
  { icon: Leaf, title: "Sustainable Shopping", description: "Each purchase keeps a working device out of landfill." },
  { icon: RefreshCcw, title: "Instant Exchange", description: "Trade in your old device and pay only the difference." },
  { icon: ShieldCheck, title: "Secure Payments", description: "Protected transactions with easy 7-day returns." },
  { icon: Truck, title: "Nationwide Delivery", description: "Insured shipping to 19,000+ pin codes across India." },
];

const testimonials: Testimonial[] = [
  {
    name: "Ananya Rao",
    city: "Bengaluru",
    initials: "AR",
    rating: 5,
    purchase: "Bought iPhone 14",
    quote:
      "Battery health was exactly as listed and the box felt brand new. Saved almost ₹27,000 without any compromise.",
  },
  {
    name: "Rahul Mehta",
    city: "Pune",
    initials: "RM",
    rating: 5,
    purchase: "Sold Galaxy S22",
    quote:
      "The quote held after inspection, pickup was next morning, and money hit my account the same day.",
  },
  {
    name: "Sneha Kulkarni",
    city: "Hyderabad",
    initials: "SK",
    rating: 4,
    purchase: "Exchanged OnePlus 9",
    quote:
      "Exchange took five minutes online. Loved that the warranty carried over to my upgraded device.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}
    >
      <Badge tone="accent">{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {copy}
        </p>
      ) : null}
    </motion.div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />

        {/* Floating feature bar */}
        <section className="mx-auto -mt-2 max-w-7xl px-5 lg:px-8">
          <div className="glass-card grid gap-4 rounded-4xl p-6 sm:grid-cols-2 lg:grid-cols-4">
            {heroFeatures.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </section>

        {/* Search */}
        <section className="px-5 py-20 lg:px-8">
          <SearchBar />
        </section>

        {/* Categories */}
        <section id="categories" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <SectionHeading
            eyebrow="Shop by category"
            title={
              <>
                Certified tech, <span className="text-primary-dark">every category</span>
              </>
            }
            copy="From flagship phones to pro laptops — all professionally refurbished and warranty-backed."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <CategoryCard key={category.title} {...category} index={i} />
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section id="featured" className="bg-muted/40 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              align="left"
              eyebrow="Featured deals"
              title={
                <>
                  Handpicked devices, <span className="text-accent">up to 70% off</span>
                </>
              }
              copy="Each listing shows real condition grades, warranty length, and verified seller ratings."
            />
            <div className="mt-10">
              <ProductCarousel products={products} />
            </div>
          </div>
        </section>

        {/* Why MobiBing — staggered layout */}
        <section id="why" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Why MobiBing"
            title={
              <>
                Trust built into <span className="text-primary-dark">every step</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyFeatures.map((feature, i) => (
              <div key={feature.title} className={i % 2 === 1 ? "lg:mt-10" : ""}>
                <FeatureCard {...feature} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* Sell your phone */}
        <section id="sell" className="bg-muted/40 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Sell in 3 steps"
              title={
                <>
                  Turn your old phone into <span className="text-accent">instant cash</span>
                </>
              }
              copy="No haggling, no listing fees. Get a locked price and free doorstep pickup."
            />
            <div className="mt-14">
              <SellFlow />
            </div>
            <div className="mt-12 text-center">
              <motion.a
                href="#top"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-[var(--shadow-soft)]"
              >
                Get My Instant Quote
              </motion.a>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Customer stories"
            title={
              <>
                50,000+ customers, <span className="text-primary-dark">4.8 average rating</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Sustainability */}
        <section className="relative overflow-hidden bg-primary-soft/70 py-24">
          <div
            aria-hidden="true"
            className="halo-glow pointer-events-none absolute -left-20 top-0 size-[420px] rounded-full"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Our mission"
                title={
                  <>
                    A circular market for <span className="text-primary-dark">premium technology</span>
                  </>
                }
                copy="Every refurbished phone reduces electronic waste and extends the life of premium technology."
              />
              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  { icon: Leaf, value: <Counter to={4820} suffix=" T" />, label: "CO₂ saved" },
                  { icon: Recycle, value: <Counter to={1260} suffix=" T" />, label: "E-waste reduced" },
                  { icon: Battery, value: <Counter to={312000} />, label: "Devices recirculated" },
                ].map((stat) => (
                  <div key={stat.label} className="surface-card rounded-3xl p-5">
                    <stat.icon
                      className="size-5 text-primary-dark"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <dd className="mt-3 text-2xl font-bold">{stat.value}</dd>
                    <dt className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <motion.img
              src={sustainabilityArt}
              alt="Illustration of a plant growing from a recycled smartphone surrounded by circular arrows"
              loading="lazy"
              width={1024}
              height={1024}
              className="mx-auto w-full max-w-md"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
