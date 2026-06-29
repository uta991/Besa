import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import { SmartLocksCatalog } from "@/components/smart-locks/smart-locks-catalog";
import { SMART_LOCKS } from "@/lib/smart-locks";

export const metadata: Metadata = {
  title: "ჭკვიანი საკეტები",
  description: "ჭკვიანი საკეტები — Philips და AIXC. ანაბეჭდი, კოდი, ბარათი, აპლიკაცია.",
};

export default function SmartLocksPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="cat.smartLocks" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SmartLocksCatalog products={SMART_LOCKS} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
