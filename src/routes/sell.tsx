import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  IndianRupee,
  Truck,
  Wallet,
} from "lucide-react";

import { PageShell } from "@/components/mobibing/PageShell";
import { Badge } from "@/components/mobibing/Badge";
import { formatINR } from "@/data/products";
import {
  ageOptions,
  calculateQuote,
  conditionOptions,
  extrasOptions,
  issueOptions,
  quoteModels,
} from "@/data/quote";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Phone — Instant Quote Calculator | MobiBing" },
      {
        name: "description",
        content:
          "Get an instant price for your phone, laptop or tablet. Pick model, storage, condition and issues to see a live payout estimate with free doorstep pickup.",
      },
      {
        property: "og:title",
        content: "Sell Your Phone — Instant Quote Calculator | MobiBing",
      },
      {
        property: "og:description",
        content:
          "Live payout estimate in seconds: model, storage, condition and accessories. Free pickup and same-day payment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SellPage,
});

function SectionCard({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card rounded-3xl p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-dark">
          {step}
        </span>
        <div>
          <h2 className="font-semibold">{title}</h2>
          {hint ? (
            <p className="text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Option({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-primary bg-primary-soft shadow-[var(--shadow-soft)]"
          : "border-border hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "block text-sm font-semibold",
          active && "text-primary-dark",
        )}
      >
        {title}
      </span>
      {hint ? (
        <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </button>
  );
}

function SellPage() {
  const [modelId, setModelId] = useState(quoteModels[0].id);
  const model = quoteModels.find((m) => m.id === modelId)!;
  const [storage, setStorage] = useState(model.storages[0].label);
  const [conditionId, setConditionId] = useState<string>(
    conditionOptions[0].id,
  );
  const [ageId, setAgeId] = useState<string>(ageOptions[0].id);
  const [issues, setIssues] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>(["box", "charger"]);
  const [submitted, setSubmitted] = useState(false);

  const quote = useMemo(
    () =>
      calculateQuote({ modelId, storage, conditionId, ageId, issues, extras }),
    [modelId, storage, conditionId, ageId, issues, extras],
  );

  const selectModel = (id: string) => {
    const next = quoteModels.find((m) => m.id === id)!;
    setModelId(id);
    setStorage(next.storages[0].label);
    setSubmitted(false);
  };

  const toggleIn = (
    list: string[],
    value: string,
    set: (v: string[]) => void,
  ) => {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
    setSubmitted(false);
  };

  return (
    <PageShell
      eyebrow="Instant quote"
      title="Know what your device is"
      highlight="really worth"
      description="Answer four quick questions. The payout updates live — no sign-up, no waiting for a callback."
    >
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-5">
            <SectionCard step={1} title="Pick your device">
              <div className="grid gap-3 sm:grid-cols-2">
                {quoteModels.map((m) => (
                  <Option
                    key={m.id}
                    active={m.id === modelId}
                    onClick={() => selectModel(m.id)}
                    title={`${m.brand} ${m.name}`}
                    hint={`From ${formatINR(Math.round(m.base * 0.58))}`}
                  />
                ))}
              </div>
            </SectionCard>

            <SectionCard step={2} title="Storage and age">
              <div className="flex flex-wrap gap-2">
                {model.storages.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      setStorage(s.label);
                      setSubmitted(false);
                    }}
                    aria-pressed={storage === s.label}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                      storage === s.label
                        ? "border-primary bg-primary-soft text-primary-dark"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {ageOptions.map((a) => (
                  <Option
                    key={a.id}
                    active={a.id === ageId}
                    onClick={() => {
                      setAgeId(a.id);
                      setSubmitted(false);
                    }}
                    title={a.label}
                  />
                ))}
              </div>
            </SectionCard>

            <SectionCard
              step={3}
              title="Overall condition"
              hint="Be honest — our inspection confirms it at pickup."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {conditionOptions.map((c) => (
                  <Option
                    key={c.id}
                    active={c.id === conditionId}
                    onClick={() => {
                      setConditionId(c.id);
                      setSubmitted(false);
                    }}
                    title={c.label}
                    hint={c.hint}
                  />
                ))}
              </div>
            </SectionCard>

            <SectionCard step={4} title="Issues and accessories">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Any issues?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {issueOptions.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => toggleIn(issues, i.id, setIssues)}
                    aria-pressed={issues.includes(i.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      issues.includes(i.id)
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {i.label}
                  </button>
                ))}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                What do you still have?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {extrasOptions.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => toggleIn(extras, e.id, setExtras)}
                    aria-pressed={extras.includes(e.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      extras.includes(e.id)
                        ? "border-primary bg-primary-soft text-primary-dark"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {extras.includes(e.id) ? (
                      <CheckCircle2 className="size-4" />
                    ) : null}
                    {e.label}
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>

          <aside className="h-fit lg:sticky lg:top-28">
            <div className="surface-card overflow-hidden rounded-3xl">
              <div className="bg-primary-soft p-6">
                <Badge tone="green" icon={<BadgeCheck className="size-3.5" />}>
                  Live estimate
                </Badge>
                <p className="mt-4 text-sm text-muted-foreground">
                  {model.brand} {model.name} · {storage}
                </p>
                <motion.p
                  key={quote.value}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-1 flex items-center text-4xl font-bold tracking-tight"
                >
                  <IndianRupee className="mr-1 size-7" strokeWidth={2.5} />
                  {quote.value.toLocaleString("en-IN")}
                </motion.p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Final price confirmed after a free 10-minute inspection.
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-sm font-semibold">Price breakdown</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  {quote.breakdown.map((b, i) => (
                    <div key={`${b.label}-${i}`} className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">{b.label}</dt>
                      <dd
                        className={cn(
                          "whitespace-nowrap font-semibold",
                          i === 0
                            ? ""
                            : b.delta < 0
                              ? "text-accent"
                              : "text-primary-dark",
                        )}
                      >
                        {i === 0 ? "" : b.delta < 0 ? "−" : "+"}
                        {formatINR(Math.abs(Math.round(b.delta)))}
                      </dd>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
                >
                  Book free pickup
                  <ArrowRight className="size-4" />
                </button>

                {submitted ? (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start gap-2 rounded-2xl bg-primary-soft p-4 text-xs text-primary-dark"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                    Pickup request noted for {formatINR(quote.value)}. Our agent
                    will confirm a slot within 30 minutes.
                  </motion.p>
                ) : null}

                <ul className="mt-5 space-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Truck className="size-4 text-primary-dark" />
                    Free doorstep pickup in 19,000+ pin codes
                  </li>
                  <li className="flex items-center gap-2">
                    <Wallet className="size-4 text-primary-dark" />
                    Money in your account the same day
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="size-4 text-primary-dark" />
                    Certified data wipe with a written report
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
