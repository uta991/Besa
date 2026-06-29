"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export function CatalogHeading({ titleKey }: { titleKey: string }) {
  const t = useT();
  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand">
          {t(titleKey)}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-brand-accent">
            {t("cat.home")}
          </Link>{" "}
          / <span className="text-brand-accent">{t(titleKey)}</span>
        </p>
      </div>
    </div>
  );
}
