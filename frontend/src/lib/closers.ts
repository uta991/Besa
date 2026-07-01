import data from "@/data/closers.json";

export type Closer = {
  slug: string;
  code: string;
  brand: string;
  model: string;
  color: string;
  spec: string;
  doorWeight: string;
  doorSize: string;
  features: string;
  country: string;
  price: number | null;
  image: string | null;
  imgWide: boolean;
};

export const CLOSERS = data as Closer[];

export function getCloser(slug: string): Closer | undefined {
  return CLOSERS.find((c) => c.slug === slug);
}

export const CLOSER_BRANDS = [...new Set(CLOSERS.map((c) => c.brand))];

export const CLOSER_PRICE_MIN = Math.min(
  ...CLOSERS.map((c) => c.price ?? Infinity),
);
export const CLOSER_PRICE_MAX = Math.max(...CLOSERS.map((c) => c.price ?? 0));
