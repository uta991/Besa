"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Vault } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT, useLocale, tValue } from "@/lib/i18n";
import { ZoomImage } from "@/components/safes/zoom-image";
import type { Safe } from "@/lib/safes";

export function SafeDetail({ safe }: { safe: Safe }) {
  const t = useT();
  const { locale } = useLocale();

  const specs: { label: string; value: string }[] = [
    { label: t("spec.brand"), value: safe.brand },
    { label: t("spec.model"), value: safe.model },
    { label: t("spec.spec"), value: tValue(safe.spec, locale) },
    { label: t("spec.outer"), value: tValue(safe.outerSize, locale) },
    { label: t("spec.inner"), value: tValue(safe.innerSize, locale) },
    { label: t("spec.volume"), value: tValue(safe.volume, locale) },
    { label: t("spec.wall"), value: tValue(safe.wallThickness, locale) },
    { label: t("spec.door"), value: tValue(safe.doorThickness, locale) },
    { label: t("spec.features"), value: tValue(safe.features, locale) },
    { label: t("spec.weight"), value: tValue(safe.weight, locale) },
    { label: t("spec.country"), value: tValue(safe.country, locale) },
  ].filter((s) => s.value);

  return (
    <>
      <Link
        href="/safes"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brand-accent"
      >
        <ArrowLeft className="size-4" />
        {t("detail.backSafes")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="group relative aspect-square overflow-hidden rounded-2xl border bg-card shadow-sm">
          {safe.image ? (
            <ZoomImage src={safe.image} alt={safe.model} />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand/10 via-muted to-brand-accent/10">
              <Vault className="size-24 text-brand/20" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {safe.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand">
            {safe.model}
          </h1>
          {safe.fireproof && (
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f4534d]/10 px-3 py-1 text-xs font-medium text-[#f4534d]">
              <Flame className="size-3.5" />
              {t("feat.fireproof")}
              {safe.fireMinutes ? ` · ${safe.fireMinutes} ${t("unit.min")}` : ""}
            </span>
          )}
          <p className="mt-4 text-3xl font-bold text-foreground">
            {safe.price == null
              ? t("list.priceOnRequest")
              : `₾${safe.price.toLocaleString("en-US")}`}
          </p>

          <dl className="mt-6 divide-y rounded-xl border bg-card shadow-sm">
            {specs.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-[140px_1fr] gap-4 px-5 py-3 text-sm"
              >
                <dt className="font-medium text-muted-foreground">{s.label}</dt>
                <dd
                  className={cn(
                    "text-foreground",
                    /ცეცხლგამძ|Fireproof|Огнестойк/.test(s.value) &&
                      "font-medium text-[#f4534d]",
                  )}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/contact"
            className="mt-6 inline-flex w-fit items-center justify-center rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-accent/90"
          >
            {t("detail.order")}
          </Link>
        </div>
      </div>
    </>
  );
}
