import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import { AccessoriesCatalog } from "@/components/accessories/accessories-catalog";
import { ACCESSORIES } from "@/lib/accessories";

export const metadata: Metadata = {
  title: "აქსესუარები",
  description: "აქსესუარები — Disec, Mottura.",
};

export default function AccessoriesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="cat.accessories" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <AccessoriesCatalog products={ACCESSORIES} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
