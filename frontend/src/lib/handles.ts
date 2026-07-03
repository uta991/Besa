import data from "@/data/handles.json";

export type Handle = {
  slug: string;
  code: string;
  brand: string;
  model: string;
  baseModel: string;
  finish: string;
  color: string;
  country: string;
  price: number | null;
  images: string[];
  imgWide: boolean;
};

export const HANDLES = data as Handle[];

export function getHandle(slug: string): Handle | undefined {
  return HANDLES.find((h) => h.slug === slug);
}

export const HANDLE_BRANDS = [...new Set(HANDLES.map((h) => h.brand))];

export const HANDLE_FINISHES = [
  ...new Set(HANDLES.map((h) => h.finish).filter(Boolean)),
].sort();
