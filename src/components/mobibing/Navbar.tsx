import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, Smartphone, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";

const links = [
  { label: "Buy Phones", to: "/marketplace" as const },
  { label: "Sell Phone", to: "/sell" as const },
  { label: "Exchange", to: "/sell" as const },
  { label: "Deals", to: "/marketplace" as const },
  { label: "Account", to: "/account" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { ids } = useWishlist();

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
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Smartphone className="size-5" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Mobi<span className="text-primary-dark">Bing</span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <Link
            to="/marketplace"
            aria-label="Search"
            className="hidden size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
          >
            <Search className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </Link>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative hidden size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
          >
            <Heart className="size-5" strokeWidth={1.75} aria-hidden="true" />
            {ids.length > 0 ? (
              <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {ids.length}
              </span>
            ) : null}
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
          >
            <User className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </Link>
          <Link
            to="/sell"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-105 sm:inline-flex"
          >
            Sell Your Phone
          </Link>
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
          {[...links, { label: "Wishlist", to: "/wishlist" as const }].map(
            (link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground"
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            to="/sell"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
          >
            Sell Your Phone
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
