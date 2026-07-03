import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import { CylindersCatalog } from "@/components/cylinders/cylinders-catalog";
import { CYLINDERS } from "@/lib/cylinders";

export const metadata: Metadata = {
  title: "ცილინდრული გულარა",
  description: "ცილინდრული გულარები — Cisa, Mottura, Securemme.",
};

export default function CylindersPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="cat.cylinders" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <CylindersCatalog products={CYLINDERS} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
