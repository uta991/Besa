import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CloserDetail } from "@/components/closers/closer-detail";
import { CLOSERS, getCloser } from "@/lib/closers";

export function generateStaticParams() {
  return CLOSERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCloser(slug);
  return { title: item ? `${item.model} — ${item.brand}` : "შვეიცარი" };
}

export default async function CloserDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCloser(slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <CloserDetail item={item} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
