import data from "@/data/locks.json";

export type LockSpec = { k: string; v: string };

export type Lock = {
  slug: string;
  code: string;
  brand: string;
  model: string;
  lockType: string;
  specs: LockSpec[];
  price: number | null;
  images: string[];
  imgWide: boolean;
};

export const LOCKS = data as Lock[];

export function getLock(slug: string): Lock | undefined {
  return LOCKS.find((l) => l.slug === slug);
}

export const LOCK_BRANDS = [...new Set(LOCKS.map((l) => l.brand))];

export const LOCK_TYPES = [
  "locktype.handle",
  "locktype.additional",
  "locktype.knob",
].filter((t) => LOCKS.some((l) => l.lockType === t));
