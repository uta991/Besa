"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT, useLocale, tValue } from "@/lib/i18n";
import { SmartLockGallery } from "@/components/smart-locks/smart-lock-gallery";
import type { Accessory } from "@/lib/accessories";

export function AccessoryDetail({ item }: { item: Accessory }) {
  const t = useT();
  const { locale } = useLocale();

  const specs = [
    { label: t("spec.brand"), value: item.brand },
    { label: t("spec.model"), value: item.baseModel || item.model },
    { label: t("spec.accessoryType"), value: tValue(item.accessoryType, locale) },
    { label: t("spec.spec"), value: tValue(item.spec, locale) },
    { label: t("spec.color"), value: tValue(item.color, locale) },
    { label: t("spec.lockType"), value: tValue(item.lockType, locale) },
    { label: t("spec.keyCount"), value: tValue(item.keyCount, locale) },
    { label: t("spec.country"), value: tValue(item.country, locale) },
  ].filter((s) => s.value);

  return (
    <>
      <Link
        href="/accessories"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brand-accent"
      >
        <ArrowLeft className="size-4" />
        {t("detail.backAccessories")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <SmartLockGallery images={item.images} alt={item.model} />

        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {item.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand">
            {item.baseModel || item.model}
          </h1>

          <dl className="mt-6 divide-y rounded-xl border bg-card shadow-sm">
            {specs.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-[150px_1fr] gap-4 px-5 py-3 text-sm"
              >
                <dt className="font-medium text-muted-foreground">{s.label}</dt>
                <dd className="text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/contact"
            className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-accent/90"
          >
            {t("detail.order")}
          </Link>
        </div>
      </div>
    </>
  );
}
