"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import type { SmartLock } from "@/lib/smart-locks";

export function SmartLockCard({ product: p }: { product: SmartLock }) {
  const t = useT();
  const priceLabel = (price: number | null) =>
    price == null ? t("list.priceOnRequest") : `₾${price.toLocaleString("en-US")}`;
  const [idx, setIdx] = useState(0);

  // auto-cycle through the photos (every 5s) when there are several
  useEffect(() => {
    if (p.images.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % p.images.length),
      5000,
    );
    return () => clearInterval(id);
  }, [p.images.length]);

  return (
    <Link
      href={`/smart-locks/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {p.images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={p.model}
            className={cn(
              "absolute inset-0 size-full transition-opacity duration-700 ease-in-out",
              p.imgFit[i] === "contain" ? "object-contain p-2" : "object-cover",
              i === idx ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {p.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {p.images.map((src, i) => (
              <span
                key={src}
                className={cn(
                  "size-1.5 rounded-full transition-all",
                  i === idx ? "w-4 bg-white" : "bg-white/50",
                )}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {p.brand}
        </p>
        <p className="font-semibold leading-tight text-foreground">{p.model}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-brand">
            {priceLabel(p.price)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent">
            {t("list.seeMore")}
            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
