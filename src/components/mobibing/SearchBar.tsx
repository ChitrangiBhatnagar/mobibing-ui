import { useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";

const chips = ["iPhone", "Samsung", "Pixel", "MacBook", "OnePlus"];

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-3xl text-center"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="surface-card flex items-center gap-3 rounded-full p-2 pl-5 focus-within:border-primary/50"
      >
        <Search
          className="size-5 shrink-0 text-muted-foreground"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <label htmlFor="marketplace-search" className="sr-only">
          Search devices
        </label>
        <input
          id="marketplace-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search iPhone, Samsung, Pixel, OnePlus..."
          className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          Search
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setQuery(chip)}
            className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent/60 hover:bg-accent-soft hover:text-accent"
          >
            {chip}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
