import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import { LocksCatalog } from "@/components/locks/locks-catalog";
import { LOCKS } from "@/lib/locks";

export const metadata: Metadata = {
  title: "საკეტები",
  description: "საკეტები — Guardian. სახელურიანი, დამატებითი, ბურთულიანი.",
};

export default function LocksPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="cat.locks" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <LocksCatalog products={LOCKS} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
