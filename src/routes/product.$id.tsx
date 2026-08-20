import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  Heart,
  PackageCheck,
  RefreshCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Navbar } from "@/components/mobibing/Navbar";
import { Footer } from "@/components/mobibing/Footer";
import { Badge } from "@/components/mobibing/Badge";
import { ProductCard } from "@/components/mobibing/ProductCard";
import { TradeInWidget } from "@/components/mobibing/TradeInWidget";
import {
  formatINR,
  getProduct,
  productDiscount,
  products,
} from "@/data/products";
import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Device unavailable — MobiBing" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Certified refurbished | MobiBing`;
    const description = `Buy ${product.name} in ${product.condition} condition for ${formatINR(
      product.price,
    )} with ${product.warranty}, free delivery and 7-day replacement on MobiBing.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-5 pt-40 pb-28 text-center">
        <h1 className="text-3xl font-bold">We couldn&apos;t find that device</h1>
        <p className="mt-3 text-muted-foreground">
          It may have already been picked up by another buyer.
        </p>
        <Link
          to="/marketplace"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Browse the marketplace
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { has, toggle } = useWishlist();
  const liked = has(product.id);
  const off = productDiscount(product);
  const saving = product.originalPrice - product.price;

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Storage", value: product.storage },
    { label: "Condition", value: product.condition },
    { label: "Warranty", value: product.warranty },
    { label: "Seller", value: product.seller },
  ];

  const assurances = [
    {
      icon: <ShieldCheck className="size-5" strokeWidth={1.75} />,
      title: product.warranty,
      copy: "Covered by MobiBing service partners across 40+ cities.",
    },
    {
      icon: <RefreshCcw className="size-5" strokeWidth={1.75} />,
      title: "7-day replacement",
      copy: "Not in love with it? Swap or return, no questions asked.",
    },
    {
      icon: <Truck className="size-5" strokeWidth={1.75} />,
      title: "Free 2-day delivery",
      copy: "Insured, plastic-free packaging with live tracking.",
    },
    {
      icon: <PackageCheck className="size-5" strokeWidth={1.75} />,
      title: "48-point inspection",
      copy: "Battery health above 85% and full diagnostics report included.",
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28">
        <section className="mx-auto max-w-7xl px-5 lg:px-8">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
            Back to marketplace
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="surface-card relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-muted/50 p-10"
            >
              <div className="halo-glow pointer-events-none absolute inset-10" />
              <Badge tone="glass" className="absolute left-6 top-6">
                {product.condition}
              </Badge>
              <img
                src={product.image}
                alt={product.name}
                width={768}
                height={768}
                className="relative h-72 w-auto object-contain sm:h-96"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge tone="accent">{off}% below retail</Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
                  {product.rating}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <BadgeCheck
                    className="size-4 text-primary-dark"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {product.seller}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-bold">
                  {formatINR(product.price)}
                </span>
                <span className="text-base text-muted-foreground line-through">
                  {formatINR(product.originalPrice)}
                </span>
                <span className="text-sm font-semibold text-accent">
                  You save {formatINR(saving)}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Inclusive of all taxes · EMI from{" "}
                {formatINR(Math.round(product.price / 12))}/mo
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  onClick={() => toggle(product.id)}
                  aria-pressed={liked}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors",
                    liked
                      ? "border-accent/30 bg-accent-soft text-accent"
                      : "hover:border-accent/40 hover:text-accent",
                  )}
                >
                  <Heart
                    className={cn("size-4", liked && "fill-accent")}
                    strokeWidth={1.75}
                  />
                  {liked ? "Saved" : "Save"}
                </button>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="mt-0.5 font-semibold">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <TradeInWidget devicePrice={product.price} />
            <div className="surface-card rounded-3xl bg-primary-soft/50 p-6">
              <h2 className="text-lg font-semibold">How exchange works</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>1. Pick your old device and condition to see instant credit.</li>
                <li>2. We verify the device at free doorstep pickup.</li>
                <li>3. Credit is adjusted on this order — pay only the balance.</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Every MobiBing device ships with
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="surface-card rounded-3xl p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
                  {item.icon}
                </span>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {related.length > 0 ? (
          <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Similar {product.category.toLowerCase()}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
