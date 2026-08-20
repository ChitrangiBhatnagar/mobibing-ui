export type QuoteModel = {
  id: string;
  brand: string;
  name: string;
  base: number;
  storages: { label: string; multiplier: number }[];
};

export const quoteModels: QuoteModel[] = [
  {
    id: "iphone-14",
    brand: "Apple",
    name: "iPhone 14",
    base: 34000,
    storages: [
      { label: "128GB", multiplier: 1 },
      { label: "256GB", multiplier: 1.12 },
      { label: "512GB", multiplier: 1.24 },
    ],
  },
  {
    id: "iphone-13",
    brand: "Apple",
    name: "iPhone 13",
    base: 27500,
    storages: [
      { label: "128GB", multiplier: 1 },
      { label: "256GB", multiplier: 1.1 },
    ],
  },
  {
    id: "galaxy-s23",
    brand: "Samsung",
    name: "Galaxy S23",
    base: 30000,
    storages: [
      { label: "128GB", multiplier: 1 },
      { label: "256GB", multiplier: 1.1 },
    ],
  },
  {
    id: "pixel-8",
    brand: "Google",
    name: "Pixel 8",
    base: 26000,
    storages: [
      { label: "128GB", multiplier: 1 },
      { label: "256GB", multiplier: 1.09 },
    ],
  },
  {
    id: "oneplus-12",
    brand: "OnePlus",
    name: "OnePlus 12",
    base: 28000,
    storages: [
      { label: "256GB", multiplier: 1 },
      { label: "512GB", multiplier: 1.13 },
    ],
  },
  {
    id: "macbook-air-m2",
    brand: "Apple",
    name: "MacBook Air M2",
    base: 52000,
    storages: [
      { label: "256GB", multiplier: 1 },
      { label: "512GB", multiplier: 1.15 },
    ],
  },
];

export const conditionOptions = [
  {
    id: "like-new",
    label: "Like New",
    hint: "Flawless screen and body, all accessories",
    multiplier: 1,
  },
  {
    id: "excellent",
    label: "Excellent",
    hint: "Minor marks, no dents or scratches on screen",
    multiplier: 0.9,
  },
  {
    id: "good",
    label: "Good",
    hint: "Visible scuffs, fully functional",
    multiplier: 0.76,
  },
  {
    id: "fair",
    label: "Fair",
    hint: "Deep scratches or dents, works fine",
    multiplier: 0.58,
  },
] as const;

export const ageOptions = [
  { id: "0-6", label: "Under 6 months", multiplier: 1 },
  { id: "6-12", label: "6–12 months", multiplier: 0.94 },
  { id: "12-24", label: "1–2 years", multiplier: 0.85 },
  { id: "24+", label: "Over 2 years", multiplier: 0.72 },
] as const;

export const issueOptions = [
  { id: "screen", label: "Cracked screen", penalty: 0.28 },
  { id: "battery", label: "Battery health below 80%", penalty: 0.1 },
  { id: "camera", label: "Camera or lens fault", penalty: 0.12 },
  { id: "face", label: "Face ID / fingerprint fault", penalty: 0.09 },
  { id: "speaker", label: "Speaker or mic issue", penalty: 0.07 },
  { id: "body", label: "Bent frame or back glass damage", penalty: 0.14 },
] as const;

export const extrasOptions = [
  { id: "box", label: "Original box", bonus: 0.03 },
  { id: "charger", label: "Original charger", bonus: 0.03 },
  { id: "bill", label: "Purchase invoice", bonus: 0.02 },
  { id: "warranty", label: "Warranty still active", bonus: 0.05 },
] as const;

export type QuoteInput = {
  modelId: string;
  storage: string;
  conditionId: string;
  ageId: string;
  issues: string[];
  extras: string[];
};

export function calculateQuote(input: QuoteInput) {
  const model = quoteModels.find((m) => m.id === input.modelId);
  if (!model) return { value: 0, breakdown: [] as { label: string; delta: number }[] };

  const storage =
    model.storages.find((s) => s.label === input.storage) ?? model.storages[0]!;
  const condition =
    conditionOptions.find((c) => c.id === input.conditionId) ??
    conditionOptions[0];
  const age = ageOptions.find((a) => a.id === input.ageId) ?? ageOptions[0];

  const start = model.base * storage.multiplier;
  const breakdown: { label: string; delta: number }[] = [
    { label: `${model.name} · ${storage.label} base value`, delta: start },
  ];

  let value = start;

  const afterCondition = value * condition.multiplier;
  breakdown.push({
    label: `Condition: ${condition.label}`,
    delta: afterCondition - value,
  });
  value = afterCondition;

  const afterAge = value * age.multiplier;
  breakdown.push({ label: `Age: ${age.label}`, delta: afterAge - value });
  value = afterAge;

  for (const id of input.issues) {
    const issue = issueOptions.find((i) => i.id === id);
    if (!issue) continue;
    const delta = -value * issue.penalty;
    breakdown.push({ label: issue.label, delta });
    value += delta;
  }

  for (const id of input.extras) {
    const extra = extrasOptions.find((e) => e.id === id);
    if (!extra) continue;
    const delta = value * extra.bonus;
    breakdown.push({ label: extra.label, delta });
    value += delta;
  }

  return { value: Math.max(500, Math.round(value / 100) * 100), breakdown };
}
