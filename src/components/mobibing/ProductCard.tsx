import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Star } from "lucide-react";
import { Badge } from "./Badge";
import { formatINR, productDiscount, type Product } from "@/data/products";
import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { has, toggle } = useWishlist();
  const liked = has(product.id);
  const off = productDiscount(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -8 }}
      className="group surface-card flex h-full flex-col overflow-hidden rounded-3xl transition-shadow hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative flex items-center justify-center bg-muted/60 p-6">
        <div className="halo-glow pointer-events-none absolute inset-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Badge tone="glass" className="absolute left-4 top-4 z-[2]">
          {product.condition}
        </Badge>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute right-4 top-4 z-[2] flex size-9 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-[var(--shadow-soft)] transition-colors hover:text-accent"
        >
          <Heart
            className={cn("size-4", liked && "fill-accent text-accent")}
            strokeWidth={1.75}
          />
        </button>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-[1]"
        />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="relative h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-base font-semibold leading-snug">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="transition-colors hover:text-primary-dark"
          >
            {product.name}
          </Link>
        </h3>

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-bold">{formatINR(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">
            {formatINR(product.originalPrice)}
          </span>
          <span className="text-sm font-semibold text-accent">{off}% off</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <ShieldCheck
            className="size-4 text-primary-dark"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {product.warranty}
        </div>

        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="mt-2 inline-flex w-fit items-center rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-accent/40 hover:text-accent"
        >
          View details
        </Link>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="text-muted-foreground">{product.seller}</span>
          <span className="flex items-center gap-1 font-semibold">
            <Star
              className="size-3.5 fill-accent text-accent"
              aria-hidden="true"
            />
            {product.rating}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
