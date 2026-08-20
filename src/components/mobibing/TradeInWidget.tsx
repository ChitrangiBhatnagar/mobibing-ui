import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Repeat2 } from "lucide-react";
import { Badge } from "./Badge";
import { formatINR } from "@/data/products";
import { calculateQuote, conditionOptions, quoteModels } from "@/data/quote";
import { cn } from "@/lib/utils";

export function TradeInWidget({ devicePrice }: { devicePrice: number }) {
  const [modelId, setModelId] = useState(quoteModels[0]!.id);
  const [conditionId, setConditionId] = useState<string>(
    conditionOptions[1]!.id,
  );

  const model = quoteModels.find((m) => m.id === modelId)!;
  const [storage, setStorage] = useState(model.storages[0]!.label);

  const activeStorage =
    model.storages.find((s) => s.label === storage)?.label ??
    model.storages[0]!.label;

  const credit = useMemo(
    () =>
      calculateQuote({
        modelId,
        storage: activeStorage,
        conditionId,
        ageId: "12-24",
        issues: [],
        extras: ["box", "charger"],
      }).value,
    [modelId, activeStorage, conditionId],
  );

  const payable = Math.max(0, devicePrice - credit);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="surface-card rounded-3xl p-6"
      aria-label="Trade-in estimator"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-semibold">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Repeat2 className="size-5" strokeWidth={1.75} />
          </span>
          Trade in & pay less
        </span>
        <Badge tone="accent">Instant estimate</Badge>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Exchange your current device and we&apos;ll deduct the credit from this
        order at checkout.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block font-medium">Your device</span>
          <select
            value={modelId}
            onChange={(e) => {
              const next = quoteModels.find((m) => m.id === e.target.value)!;
              setModelId(next.id);
              setStorage(next.storages[0]!.label);
            }}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
          >
            {quoteModels.map((m) => (
              <option key={m.id} value={m.id}>
                {m.brand} {m.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1.5 block font-medium">Storage</span>
          <select
            value={activeStorage}
            onChange={(e) => setStorage(e.target.value)}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none"
          >
            {model.storages.map((s) => (
              <option key={s.label} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4">
        <span className="mb-2 block text-sm font-medium">Condition</span>
        <div className="flex flex-wrap gap-2">
          {conditionOptions.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setConditionId(c.id)}
              aria-pressed={conditionId === c.id}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                conditionId === c.id
                  ? "border-primary bg-primary-soft text-primary-dark"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Device price</dt>
          <dd className="font-semibold">{formatINR(devicePrice)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Trade-in credit</dt>
          <dd className="font-semibold text-accent">− {formatINR(credit)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <dt className="font-semibold">You pay</dt>
          <motion.dd
            key={payable}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-2xl font-bold"
          >
            {formatINR(payable)}
          </motion.dd>
        </div>
      </dl>

      <Link
        to="/sell"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Get an exact quote
        <ArrowRight className="size-4" strokeWidth={2} />
      </Link>
    </motion.aside>
  );
}
