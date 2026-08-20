import { useEffect, useState } from "react";
import { Heart, Menu, Search, Smartphone, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Buy Phones", href: "#featured" },
  { label: "Sell Phone", href: "#sell" },
  { label: "Exchange", href: "#why" },
  { label: "Deals", href: "#categories" },
  { label: "Support", href: "#footer" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Smartphone className="size-5" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Mobi<span className="text-primary-dark">Bing</span>
          </span>
        </a>

        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          {[
            { icon: Search, label: "Search" },
            { icon: Heart, label: "Wishlist" },
            { icon: User, label: "Account" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="hidden size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
            >
              <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          ))}
          <a
            href="#sell"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-105 sm:inline-flex"
          >
            Sell Your Phone
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex size-10 items-center justify-center rounded-full text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background px-5 pb-5 pt-2 lg:hidden"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#sell"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
          >
            Sell Your Phone
          </a>
        </nav>
      ) : null}
    </header>
  );
}
