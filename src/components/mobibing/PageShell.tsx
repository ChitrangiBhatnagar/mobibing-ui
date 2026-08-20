import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Badge } from "./Badge";

export function PageShell({
  eyebrow,
  title,
  highlight,
  description,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28">
        <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Badge tone="orange">{eyebrow}</Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                {title}{" "}
                {highlight ? (
                  <span className="text-gradient-green">{highlight}</span>
                ) : null}
              </h1>
              {description ? (
                <p className="mt-4 text-base text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>
            {aside}
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}
