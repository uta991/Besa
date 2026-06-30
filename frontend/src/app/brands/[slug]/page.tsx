import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CatalogHeading } from "@/components/layout/catalog-heading";
import { BrandBrowser } from "@/components/brands/brand-browser";
import { BRANDS, getBrand } from "@/lib/brands";
import { CATALOG, catalogByBrand } from "@/lib/catalog";

export function generateStaticParams() {
  const slugs = new Set([
    ...BRANDS.map((b) => b.slug),
    ...CATALOG.map((i) => i.brandSlug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

function brandName(slug: string): string | null {
  const b = getBrand(slug);
  if (b) return b.name;
  const item = CATALOG.find((i) => i.brandSlug === slug);
  return item ? item.brand : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = brandName(slug);
  return { title: name ?? "ბრენდი" };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = brandName(slug);
  if (!name) notFound();

  const items = catalogByBrand(slug);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CatalogHeading title={name} />
        <div className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <BrandBrowser items={items} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
