import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import { ClosersCatalog } from "@/components/closers/closers-catalog";
import { CLOSERS } from "@/lib/closers";

export const metadata: Metadata = {
  title: "შვეიცრები",
  description: "კარის დამხურავები (შვეიცრები) — Cisa, Dormakaba, King, Meggo.",
};

export default function ClosersPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="cat.closers" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <ClosersCatalog products={CLOSERS} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
