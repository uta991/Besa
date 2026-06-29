import data from "@/data/safes.json";

export type Safe = {
  slug: string;
  code: string;
  brand: string;
  model: string;
  spec: string;
  fireproof: boolean;
  fireMinutes: number | null;
  outerSize: string;
  innerSize: string;
  volume: string;
  features: string;
  weight: string;
  country: string;
  price: number | null;
  image: string | null;
  imgWide: boolean;
};

export const SAFES = data as Safe[];

export function getSafe(slug: string): Safe | undefined {
  return SAFES.find((s) => s.slug === slug);
}

export const SAFE_BRANDS = [...new Set(SAFES.map((s) => s.brand))];

export const SAFE_PRICE_MIN = Math.min(
  ...SAFES.map((s) => s.price ?? Infinity),
);
export const SAFE_PRICE_MAX = Math.max(...SAFES.map((s) => s.price ?? 0));
