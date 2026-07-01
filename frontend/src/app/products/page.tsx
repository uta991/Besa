import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import {
  ProductsBrowser,
  type CategoryLink,
} from "@/components/products/products-browser";
import { CATALOG } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "პროდუქცია",
  description: "ბესას სრული პროდუქცია — საკეტები, სეიფები, ჭკვიანი საკეტები და სხვა.",
};

const HREF: Record<string, string> = {
  "cat.locks": "/locks",
  "cat.safes": "/safes",
  "cat.gunSafes": "/safes?cat=gun",
  "cat.smartLocks": "/smart-locks",
  "cat.closers": "/closers",
};
const ORDER = [
  "cat.locks",
  "cat.safes",
  "cat.gunSafes",
  "cat.smartLocks",
  "cat.closers",
];

const counts: Record<string, number> = {};
for (const it of CATALOG) counts[it.categoryKey] = (counts[it.categoryKey] ?? 0) + 1;

const categories: CategoryLink[] = ORDER.filter((k) => counts[k]).map((k) => ({
  nameKey: k,
  count: counts[k],
  href: HREF[k] ?? "#",
}));

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="nav.products" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <ProductsBrowser items={CATALOG} categories={categories} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
