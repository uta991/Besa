import { SAFES } from "./safes";
import { SMART_LOCKS } from "./smart-locks";
import { CLOSERS } from "./closers";
import { LOCKS } from "./locks";
import { CYLINDERS } from "./cylinders";
import { HANDLES } from "./handles";

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
    categoryKey: s.gunSafe ? "cat.gunSafes" : "cat.safes",
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
  ...CLOSERS.map((s) => ({
    name: [s.model, s.color].filter(Boolean).join(" · "),
    brand: s.brand,
    brandSlug: brandSlug(s.brand),
    categoryKey: "cat.closers",
    price: s.price,
    image: s.image,
    imgFit: s.imgWide ? "contain" : "cover",
    href: `/closers/${s.slug}`,
  })),
  ...LOCKS.map((s) => ({
    name: s.model,
    brand: s.brand,
    brandSlug: brandSlug(s.brand),
    categoryKey: "cat.locks",
    price: s.price,
    image: s.images[0] ?? null,
    imgFit: s.imgWide ? "contain" : "cover",
    href: `/locks/${s.slug}`,
  })),
  ...CYLINDERS.map((s) => ({
    name: s.model,
    brand: s.brand,
    brandSlug: brandSlug(s.brand),
    categoryKey: "cat.cylinders",
    price: s.price,
    image: s.images[0] ?? null,
    imgFit: s.imgWide ? "contain" : "cover",
    href: `/cylinders/${s.slug}`,
  })),
  ...HANDLES.map((s) => ({
    name: s.model,
    brand: s.brand,
    brandSlug: brandSlug(s.brand),
    categoryKey: "cat.handles",
    price: s.price,
    image: s.images[0] ?? null,
    imgFit: s.imgWide ? "contain" : "cover",
    href: `/handles/${s.slug}`,
  })),
];

export function catalogByBrand(slug: string): CatalogItem[] {
  return CATALOG.filter((i) => i.brandSlug === slug);
}
