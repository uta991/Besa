import data from "@/data/cylinders.json";

export type Cylinder = {
  slug: string;
  code: string;
  brand: string;
  model: string;
  protectionLevel: string;
  specFeatures: string[];
  keyCount: string;
  country: string;
  price: number | null;
  images: string[];
  imgWide: boolean;
};

export const CYLINDERS = data as Cylinder[];

export function getCylinder(slug: string): Cylinder | undefined {
  return CYLINDERS.find((c) => c.slug === slug);
}

export const CYLINDER_BRANDS = [...new Set(CYLINDERS.map((c) => c.brand))];
