import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LockDetail } from "@/components/locks/lock-detail";
import { LOCKS, getLock } from "@/lib/locks";

export function generateStaticParams() {
  return LOCKS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getLock(slug);
  return { title: item ? `${item.model} — ${item.brand}` : "საკეტი" };
}

export default async function LockDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getLock(slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <LockDetail item={item} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
