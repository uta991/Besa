import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import { HandlesCatalog } from "@/components/handles/handles-catalog";
import { HANDLES } from "@/lib/handles";

export const metadata: Metadata = {
  title: "კარის სახელურები",
  description: "კარის სახელურები — Doganlar.",
};

export default function HandlesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading titleKey="cat.handles" />

        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <HandlesCatalog products={HANDLES} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
