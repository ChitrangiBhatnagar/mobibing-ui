import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { PageShell } from "@/components/mobibing/PageShell";
import { ProductCard } from "@/components/mobibing/ProductCard";
import {
  brands,
  categories,
  conditions,
  formatINR,
  products,
  type ProductCategory,
  type ProductCondition,
} from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Certified Pre-Owned Phones | MobiBing" },
      {
        name: "description",
        content:
          "Browse certified refurbished phones, laptops and tablets. Filter by brand, condition, storage and price with verified warranty on every listing.",
      },
      {
        property: "og:title",
        content: "Marketplace — Certified Pre-Owned Phones | MobiBing",
      },
      {
        property: "og:description",
        content:
          "Filter certified refurbished devices by brand, condition and price. Warranty and verified sellers included.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketplacePage,
});

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "discount", label: "Biggest discount" },
  { id: "rating", label: "Top rated" },
] as const;

const MAX_PRICE = 90000;

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-5">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "border-primary bg-primary-soft text-primary-dark"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<ProductCategory[]>(
    [],
  );
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [activeConditions, setActiveConditions] = useState<ProductCondition[]>(
    [],
  );
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const reset = () => {
    setQuery("");
    setActiveCategories([]);
    setActiveBrands([]);
    setActiveConditions([]);
    setMaxPrice(MAX_PRICE);
    setSort("featured");
  };

  const activeCount =
    activeCategories.length +
    activeBrands.length +
    activeConditions.length +
    (maxPrice < MAX_PRICE ? 1 : 0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (q && !`${p.name} ${p.brand}`.toLowerCase().includes(q)) return false;
      if (activeCategories.length && !activeCategories.includes(p.category))
        return false;
      if (activeBrands.length && !activeBrands.includes(p.brand)) return false;
      if (activeConditions.length && !activeConditions.includes(p.condition))
        return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "discount")
      sorted.sort(
        (a, b) =>
          (b.originalPrice - b.price) / b.originalPrice -
          (a.originalPrice - a.price) / a.originalPrice,
      );
    return sorted;
  }, [query, activeCategories, activeBrands, activeConditions, maxPrice, sort]);

  const filters = (
    <div className="flex flex-col gap-5">
      <FilterGroup title="Category">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip
              key={c}
              active={activeCategories.includes(c)}
              onClick={() => toggle(activeCategories, c, setActiveCategories)}
            >
              {c}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Brand">
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <Chip
              key={b}
              active={activeBrands.includes(b)}
              onClick={() => toggle(activeBrands, b, setActiveBrands)}
            >
              {b}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Condition">
        <div className="flex flex-wrap gap-2">
          {conditions.map((c) => (
            <Chip
              key={c}
              active={activeConditions.includes(c)}
              onClick={() => toggle(activeConditions, c, setActiveConditions)}
            >
              {c}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Max price">
        <input
          type="range"
          min={10000}
          max={MAX_PRICE}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
          className="w-full accent-[var(--primary)]"
        />
        <p className="mt-2 text-sm font-semibold">
          Up to {formatINR(maxPrice)}
        </p>
      </FilterGroup>

      <button
        type="button"
        onClick={reset}
        className="self-start text-sm font-semibold text-primary-dark hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <PageShell
      eyebrow="Marketplace"
      title="Every device"
      highlight="tested and warranted"
      description="12 live listings from verified sellers. Filter by brand, condition, storage and budget — prices update instantly."
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="surface-card mb-8 flex flex-col gap-3 rounded-3xl p-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-muted/70 px-4 py-3">
            <Search
              className="size-5 text-muted-foreground"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search iPhone, Pixel, MacBook…"
              aria-label="Search devices"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>

          <label className="sr-only" htmlFor="sort">
            Sort listings
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium outline-none"
          >
            {sorts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="surface-card sticky top-28 rounded-3xl p-6">
              {filters}
            </div>
          </aside>

          {filtersOpen ? (
            <div className="surface-card rounded-3xl p-6 lg:hidden">
              {filters}
            </div>
          ) : null}

          <div>
            <p className="mb-5 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{results.length}</span>{" "}
              of {products.length} listings
            </p>

            {results.length ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="surface-card rounded-3xl p-12 text-center">
                <h2 className="text-lg font-semibold">No devices match</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try widening your budget or clearing a few filters.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
