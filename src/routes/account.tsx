import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  Smartphone,
  Truck,
  User,
} from "lucide-react";

import { PageShell } from "@/components/mobibing/PageShell";
import { Badge } from "@/components/mobibing/Badge";
import { formatINR } from "@/data/products";
import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — Orders, Trade-ins & Addresses | MobiBing" },
      {
        name: "description",
        content:
          "Track refurbished device orders, follow trade-in payouts, manage delivery addresses and notification preferences in one place.",
      },
      {
        property: "og:title",
        content: "Your Account — Orders, Trade-ins & Addresses | MobiBing",
      },
      {
        property: "og:description",
        content:
          "Orders, trade-in payouts, addresses and preferences for your MobiBing account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "trade-ins", label: "Trade-ins", icon: Smartphone },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const orders = [
  {
    id: "MB-48120",
    item: "Apple iPhone 14 · 128GB",
    price: 42999,
    status: "Out for delivery",
    tone: "green" as const,
    date: "18 Aug 2026",
  },
  {
    id: "MB-47755",
    item: "iPad Air 5th Gen · Wi-Fi",
    price: 39999,
    status: "Delivered",
    tone: "neutral" as const,
    date: "02 Aug 2026",
  },
  {
    id: "MB-46310",
    item: "Google Pixel 7a · 128GB",
    price: 21999,
    status: "Delivered",
    tone: "neutral" as const,
    date: "11 Jul 2026",
  },
];

const tradeIns = [
  {
    id: "TQ-9921",
    item: "OnePlus 11 · 128GB",
    quote: 21400,
    status: "Payout sent",
    tone: "green" as const,
  },
  {
    id: "TQ-9987",
    item: "Galaxy S22 · 128GB",
    quote: 17800,
    status: "Pickup scheduled",
    tone: "orange" as const,
  },
];

const addresses = [
  {
    label: "Home",
    line: "142, 4th Cross, Indiranagar, Bengaluru 560038",
    phone: "+91 98••• ••210",
    primary: true,
  },
  {
    label: "Office",
    line: "WeWork Galaxy, Residency Road, Bengaluru 560025",
    phone: "+91 98••• ••210",
    primary: false,
  },
];

function AccountPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("orders");
  const [prefs, setPrefs] = useState({
    priceDrops: true,
    orderUpdates: true,
    newsletter: false,
  });
  const { ids } = useWishlist();

  return (
    <PageShell
      eyebrow="Account"
      title="Hello, Chitrangi —"
      highlight="here is your hub"
      description="Orders, trade-in payouts, saved addresses and alerts for your MobiBing account."
      aside={
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      }
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="surface-card h-fit rounded-3xl p-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <User className="size-6" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-semibold">Chitrangi Bhatnagar</p>
                <p className="text-xs text-muted-foreground">
                  chitrangi@example.com
                </p>
              </div>
            </div>

            <Badge tone="green" className="mt-4" icon={<ShieldCheck className="size-3.5" />}>
              Verified buyer since 2023
            </Badge>

            <nav className="mt-6 flex flex-col gap-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  aria-current={tab === id}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    tab === id
                      ? "bg-primary-soft text-primary-dark"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {label}
                </button>
              ))}
              <Link
                to="/wishlist"
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Heart className="size-4" strokeWidth={1.75} />
                Wishlist
                <span className="ml-auto rounded-full bg-accent-soft px-2 py-0.5 text-xs font-bold text-accent">
                  {ids.length}
                </span>
              </Link>
            </nav>
          </aside>

          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Orders placed", value: "7" },
                { label: "Devices traded in", value: "3" },
                { label: "Total saved", value: formatINR(84200) },
              ].map((stat) => (
                <div key={stat.label} className="surface-card rounded-3xl p-5">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {tab === "orders" ? (
              <div className="surface-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold">Recent orders</h2>
                <div className="mt-5 flex flex-col divide-y divide-border">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="font-semibold">{o.item}</p>
                        <p className="text-xs text-muted-foreground">
                          #{o.id} · {o.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          {formatINR(o.price)}
                        </span>
                        <Badge tone={o.tone} icon={<Truck className="size-3.5" />}>
                          {o.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {tab === "trade-ins" ? (
              <div className="surface-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold">Trade-in requests</h2>
                <div className="mt-5 flex flex-col divide-y divide-border">
                  {tradeIns.map((t) => (
                    <div
                      key={t.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="font-semibold">{t.item}</p>
                        <p className="text-xs text-muted-foreground">#{t.id}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-primary-dark">
                          {formatINR(t.quote)}
                        </span>
                        <Badge tone={t.tone}>{t.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/sell"
                  className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
                >
                  Get a new quote
                </Link>
              </div>
            ) : null}

            {tab === "addresses" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {addresses.map((a) => (
                  <div key={a.label} className="surface-card rounded-3xl p-6">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{a.label}</p>
                      {a.primary ? <Badge tone="green">Default</Badge> : null}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{a.line}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{a.phone}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {tab === "settings" ? (
              <div className="surface-card rounded-3xl p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Bell className="size-4" strokeWidth={1.75} />
                  Notifications
                </h2>
                <div className="mt-5 flex flex-col gap-4">
                  {(
                    [
                      ["priceDrops", "Price drop alerts on wishlist devices"],
                      ["orderUpdates", "Order and delivery updates"],
                      ["newsletter", "Monthly sustainability newsletter"],
                    ] as const
                  ).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex cursor-pointer items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={prefs[key]}
                        onClick={() =>
                          setPrefs((p) => ({ ...p, [key]: !p[key] }))
                        }
                        className={cn(
                          "relative h-6 w-11 rounded-full transition-colors",
                          prefs[key] ? "bg-primary" : "bg-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 size-5 rounded-full bg-background transition-all",
                            prefs[key] ? "left-[22px]" : "left-0.5",
                          )}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
