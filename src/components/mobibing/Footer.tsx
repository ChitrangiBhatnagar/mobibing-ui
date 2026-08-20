import {
  Instagram,
  Linkedin,
  Smartphone,
  Twitter,
  Youtube,
} from "lucide-react";

const columns = [
  {
    title: "Marketplace",
    links: ["Buy Phones", "Laptops", "Tablets", "Deals of the Week"],
  },
  {
    title: "Sell",
    links: ["Sell a Phone", "Instant Quote", "Exchange Offers", "Bulk Selling"],
  },
  {
    title: "Support",
    links: ["Track Order", "Warranty Claims", "Returns", "Help Center"],
  },
  {
    title: "Company",
    links: ["About MobiBing", "Sustainability", "Careers", "Press"],
  },
  {
    title: "Legal",
    links: ["Terms of Use", "Privacy Policy", "Refund Policy", "Cookies"],
  },
];

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <span className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Smartphone className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Mobi<span className="text-primary-dark">Bing</span>
              </span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Certified pre-owned electronics from Bengaluru since 2015. Tested,
              verified, warranted — and better for the planet.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary-dark"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MobiBing. All rights reserved.
          </p>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#top"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
