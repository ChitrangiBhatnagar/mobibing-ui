import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

export function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * (track.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-2">
        {[
          { dir: -1 as const, Icon: ChevronLeft, label: "Previous products" },
          { dir: 1 as const, Icon: ChevronRight, label: "Next products" },
        ].map(({ dir, Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => scrollBy(dir)}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary-dark"
          >
            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
          >
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
