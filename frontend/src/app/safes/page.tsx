import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import { SafesCatalog } from "@/components/safes/safes-catalog";
import { SAFES } from "@/lib/safes";

export const metadata: Metadata = {
  title: "სეიფები",
  description:
    "ცეცხლგამძლე სეიფები — BOOIL და EAGLE. სახლისა და ბიზნესისთვის.",
};

export default function SafesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="cat.safes" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SafesCatalog products={SAFES} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
