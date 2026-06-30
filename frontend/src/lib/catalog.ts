import { SAFES } from "./safes";
import { SMART_LOCKS } from "./smart-locks";

export type CatalogItem = {
  name: string;
  brand: string;
  brandSlug: string;
  categoryKey: string;
  price: number | null;
  image: string | null;
  imgFit: string;
  href: string;
};

export function brandSlug(b: string): string {
  return b
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const CATALOG: CatalogItem[] = [
  ...SAFES.map((s) => ({
    name: s.model,
    brand: s.brand,
    brandSlug: brandSlug(s.brand),
    categoryKey: "cat.safes",
    price: s.price,
    image: s.image,
    imgFit: s.imgWide ? "contain" : "cover",
    href: `/safes/${s.slug}`,
  })),
  ...SMART_LOCKS.map((s) => ({
    name: s.model,
    brand: s.brand,
    brandSlug: brandSlug(s.brand),
    categoryKey: "cat.smartLocks",
    price: s.price,
    image: s.images[0] ?? null,
    imgFit: s.imgFit[0] ?? "cover",
    href: `/smart-locks/${s.slug}`,
  })),
];

export function catalogByBrand(slug: string): CatalogItem[] {
  return CATALOG.filter((i) => i.brandSlug === slug);
}
