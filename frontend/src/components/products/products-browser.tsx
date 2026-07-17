"use client";

import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export type CatalogItem = {
  name: string;
  brand: string;
  price: number | null;
  image: string | null;
  imgFit: string;
  categoryKey: string;
  href: string;
};

export type CategoryLink = {
  nameKey: string;
  count: number;
  href: string;
};

export function ProductsBrowser({
  items,
  categories,
}: {
  items: CatalogItem[];
  categories: CategoryLink[];
}) {
  const t = useT();
  const priceLabel = (p: number | null) =>
    p == null ? t("list.priceOnRequest") : `₾${p.toLocaleString("en-US")}`;
  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside>
        <div className="rounded-xl border bg-card p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <h3 className="mb-3 px-3 text-sm font-semibold text-brand">
            {t("filter.categories")}
          </h3>
          <div className="flex flex-col gap-1">
            {/* current page — all products */}
            <span className="flex items-center justify-between rounded-lg bg-brand-accent/10 px-3 py-2 text-sm font-medium text-brand-accent">
              {t("list.all")}
              <span className="text-xs">{items.length}</span>
            </span>
            {/* categories — navigate to their own section */}
            {categories.map((c) => (
              <Link
                key={c.nameKey}
                href={c.href}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-muted"
              >
                {t(c.nameKey)}
                <span className="text-xs text-muted-foreground">{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <div>
        <p className="mb-5 text-sm text-muted-foreground">
          {t("list.showing")}{" "}
          <span className="font-semibold text-foreground">{items.length}</span>{" "}
          {t("list.products")}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.name}
                    className={cn(
                      "size-full transition duration-300 group-hover:scale-105",
                      p.imgFit === "contain"
                        ? "object-contain p-2"
                        : "object-cover",
                    )}
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Package className="size-12 text-brand/20" />
                  </div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-brand backdrop-blur">
                  {t(p.categoryKey)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {p.brand}
                </p>
                <p className="font-semibold leading-tight text-foreground">
                  {p.name}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-brand">
                    {priceLabel(p.price)}
                  </span>
                  <ArrowRight className="size-4 text-brand-accent transition group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
