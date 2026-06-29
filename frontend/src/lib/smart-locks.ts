import data from "@/data/smart-locks.json";

export type SmartLock = {
  slug: string;
  model: string;
  brand: string;
  methods: string[];
  description: string[];
  price: number | null;
  images: string[];
  imgFit: string[];
};

export const SMART_LOCKS = data as SmartLock[];

export function getSmartLock(slug: string): SmartLock | undefined {
  return SMART_LOCKS.find((s) => s.slug === slug);
}

export const SMART_LOCK_BRANDS = [...new Set(SMART_LOCKS.map((s) => s.brand))];

export const SMART_LOCK_PRICE_MIN = Math.min(
  ...SMART_LOCKS.map((s) => s.price ?? Infinity),
);
export const SMART_LOCK_PRICE_MAX = Math.max(
  ...SMART_LOCKS.map((s) => s.price ?? 0),
);
