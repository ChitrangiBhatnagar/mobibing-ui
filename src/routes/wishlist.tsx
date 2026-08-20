import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Trash2 } from "lucide-react";

import { PageShell } from "@/components/mobibing/PageShell";
import { ProductCard } from "@/components/mobibing/ProductCard";
import { formatINR, getProduct, productDiscount } from "@/data/products";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Saved Devices | MobiBing" },
      {
        name: "description",
        content:
          "Keep track of the certified refurbished phones, laptops and tablets you are watching, with live prices and savings totals.",
      },
      { property: "og:title", content: "Your Wishlist — Saved Devices | MobiBing" },
      {
        property: "og:description",
        content: "Saved devices with live prices, warranty details and total savings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids, remove, clear, ready } = useWishlist();
  const saved = ids.map(getProduct).filter((p) => p !== undefined);

  const total = saved.reduce((sum, p) => sum + p.price, 0);
  const savings = saved.reduce((sum, p) => sum + (p.originalPrice - p.price), 0);

  return (
    <PageShell
      eyebrow="Wishlist"
      title="Devices you are"
      highlight="watching"
      description="Saved locally on this device. Tap the heart on any listing to add or remove it."
      aside={
        saved.length ? (
          <button
            type="button"
            onClick={clear}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <Trash2 className="size-4" />
            Clear wishlist
          </button>
        ) : undefined
      }
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        {!ready ? (
          <div className="surface-card h-64 animate-pulse rounded-3xl" />
        ) : saved.length === 0 ? (
          <div className="surface-card rounded-3xl px-8 py-16 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
              <Heart className="size-6" strokeWidth={1.75} />
            </span>
            <h2 className="mt-5 text-xl font-semibold">Nothing saved yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Browse the marketplace and tap the heart on any device to keep an
              eye on its price.
            </p>
            <Link
              to="/marketplace"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Browse marketplace
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-6 sm:grid-cols-2">
              {saved.map((p, i) => (
                <div key={p.id} className="relative">
                  <ProductCard product={p} index={i} />
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Trash2 className="size-4" />
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <aside className="surface-card h-fit rounded-3xl p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">Wishlist summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Devices saved</dt>
                  <dd className="font-semibold">{saved.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total value</dt>
                  <dd className="font-semibold">{formatINR(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">You save</dt>
                  <dd className="font-semibold text-primary-dark">
                    {formatINR(savings)}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
                {saved.map((p) => (
                  <div key={p.id} className="flex justify-between gap-3">
                    <span className="truncate text-muted-foreground">
                      {p.name}
                    </span>
                    <span className="whitespace-nowrap font-semibold text-accent">
                      {productDiscount(p)}% off
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 flex items-start gap-2 rounded-2xl bg-primary-soft p-4 text-xs text-primary-dark">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                Every saved device includes warranty, 7-day returns and free
                insured delivery.
              </p>
            </aside>
          </div>
        )}
      </section>
    </PageShell>
  );
}
