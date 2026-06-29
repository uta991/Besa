"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useT, useLocale, tToken } from "@/lib/i18n";
import { SmartLockGallery } from "@/components/smart-locks/smart-lock-gallery";
import { SMART_LOCK_DESC_I18N } from "@/data/smart-locks-i18n";
import type { SmartLock } from "@/lib/smart-locks";

export function SmartLockDetail({ item }: { item: SmartLock }) {
  const t = useT();
  const { locale } = useLocale();

  const tr = SMART_LOCK_DESC_I18N[item.slug];
  const description =
    locale === "en" && tr?.en
      ? tr.en
      : locale === "ru" && tr?.ru
        ? tr.ru
        : item.description;

  return (
    <>
      <Link
        href="/smart-locks"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brand-accent"
      >
        <ArrowLeft className="size-4" />
        {t("detail.backSmart")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <SmartLockGallery images={item.images} alt={item.model} />

        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {item.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand">
            {item.model}
          </h1>
          <p className="mt-4 text-3xl font-bold text-foreground">
            {item.price == null
              ? t("list.priceOnRequest")
              : `₾${item.price.toLocaleString("en-US")}`}
          </p>

          {item.methods.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 text-sm font-semibold text-brand">
                {t("detail.methods")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {item.methods.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent"
                  >
                    <Check className="size-3.5" />
                    {tToken(m, locale)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {description.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold text-brand">
                {t("detail.description")}
              </h2>
              <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                {description.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          )}

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
