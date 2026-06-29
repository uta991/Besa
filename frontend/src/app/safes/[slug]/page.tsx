import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SafeDetail } from "@/components/safes/safe-detail";
import { SAFES, getSafe } from "@/lib/safes";

export function generateStaticParams() {
  return SAFES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const safe = getSafe(slug);
  return {
    title: safe ? `${safe.model} — ${safe.brand}` : "სეიფი",
  };
}

export default async function SafeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const safe = getSafe(slug);
  if (!safe) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SafeDetail safe={safe} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
