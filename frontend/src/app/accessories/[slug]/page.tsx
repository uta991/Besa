import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AccessoryDetail } from "@/components/accessories/accessory-detail";
import { ACCESSORIES, getAccessory } from "@/lib/accessories";

export function generateStaticParams() {
  return ACCESSORIES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getAccessory(slug);
  return { title: item ? `${item.model} — ${item.brand}` : "აქსესუარი" };
}

export default async function AccessoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getAccessory(slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <AccessoryDetail item={item} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
