import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import {
  ProductsBrowser,
  type CatalogItem,
  type CategoryLink,
} from "@/components/products/products-browser";
import { SAFES } from "@/lib/safes";
import { SMART_LOCKS } from "@/lib/smart-locks";

export const metadata: Metadata = {
  title: "პროდუქცია",
  description: "ბესას სრული პროდუქცია — სეიფები, ჭკვიანი საკეტები და სხვა.",
};

const items: CatalogItem[] = [
  ...SAFES.map((s) => ({
    name: s.model,
    brand: s.brand,
    price: s.price,
    image: s.image,
    imgFit: s.imgWide ? "contain" : "cover",
    categoryKey: "cat.safes",
    href: `/safes/${s.slug}`,
  })),
  ...SMART_LOCKS.map((s) => ({
    name: s.model,
    brand: s.brand,
    price: s.price,
    image: s.images[0] ?? null,
    imgFit: s.imgFit[0] ?? "cover",
    categoryKey: "cat.smartLocks",
    href: `/smart-locks/${s.slug}`,
  })),
];

const categories: CategoryLink[] = [
  { nameKey: "cat.safes", count: SAFES.length, href: "/safes" },
  { nameKey: "cat.smartLocks", count: SMART_LOCKS.length, href: "/smart-locks" },
];

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="nav.products" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <ProductsBrowser items={items} categories={categories} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
