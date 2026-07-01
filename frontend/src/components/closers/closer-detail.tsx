"use client";

import Link from "next/link";
import { ArrowLeft, DoorClosed } from "lucide-react";
import { useT, useLocale, tValue } from "@/lib/i18n";
import { ZoomImage } from "@/components/safes/zoom-image";
import type { Closer } from "@/lib/closers";

export function CloserDetail({ item }: { item: Closer }) {
  const t = useT();
  const { locale } = useLocale();

  const specs: { label: string; value: string }[] = [
    { label: t("spec.brand"), value: item.brand },
    { label: t("spec.model"), value: item.model },
    { label: t("spec.spec"), value: tValue(item.spec, locale) },
    { label: t("spec.doorWeight"), value: tValue(item.doorWeight, locale) },
    { label: t("spec.doorSize"), value: tValue(item.doorSize, locale) },
    { label: t("spec.color"), value: tValue(item.color, locale) },
    { label: t("spec.features"), value: tValue(item.features, locale) },
    { label: t("spec.country"), value: tValue(item.country, locale) },
  ].filter((s) => s.value);

  return (
    <>
      <Link
        href="/closers"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brand-accent"
      >
        <ArrowLeft className="size-4" />
        {t("detail.backClosers")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="group relative aspect-square overflow-hidden rounded-2xl border bg-card shadow-sm">
          {item.image ? (
            <ZoomImage src={item.image} alt={item.model} />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand/10 via-muted to-brand-accent/10">
              <DoorClosed className="size-24 text-brand/20" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {item.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand">
            {item.model}
            {item.color ? (
              <span className="text-xl font-normal text-muted-foreground">
                {" "}
                · {tValue(item.color, locale)}
              </span>
            ) : null}
          </h1>
          <p className="mt-4 text-3xl font-bold text-foreground">
            {item.price == null
              ? t("list.priceOnRequest")
              : `₾${item.price.toLocaleString("en-US")}`}
          </p>

          <dl className="mt-6 divide-y rounded-xl border bg-card shadow-sm">
            {specs.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-[140px_1fr] gap-4 px-5 py-3 text-sm"
              >
                <dt className="font-medium text-muted-foreground">{s.label}</dt>
                <dd className="text-foreground">{s.value}</dd>
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
