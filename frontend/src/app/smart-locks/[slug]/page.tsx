import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmartLockDetail } from "@/components/smart-locks/smart-lock-detail";
import { SMART_LOCKS, getSmartLock } from "@/lib/smart-locks";

export function generateStaticParams() {
  return SMART_LOCKS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getSmartLock(slug);
  return { title: item ? `${item.model} — ${item.brand}` : "ჭკვიანი საკეტი" };
}

export default async function SmartLockDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getSmartLock(slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SmartLockDetail item={item} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
