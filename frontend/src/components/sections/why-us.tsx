"use client";

import {
  BadgeCheck,
  Boxes,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/lib/i18n";

const ITEMS: { tKey: string; dKey: string; icon: LucideIcon }[] = [
  { tKey: "why.brands.t", dKey: "why.brands.d", icon: BadgeCheck },
  { tKey: "why.choice.t", dKey: "why.choice.d", icon: Boxes },
  { tKey: "why.consult.t", dKey: "why.consult.d", icon: Users },
  { tKey: "why.install.t", dKey: "why.install.d", icon: Wrench },
];

export function WhyUs() {
  const t = useT();
  return (
    <section id="why" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-brand sm:text-3xl">
          {t("sec.why")}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ tKey, dKey, icon: Icon }) => (
            <div key={tKey} className="flex flex-col gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                <Icon className="size-6" />
              </span>
              <h3 className="font-semibold text-foreground">{t(tKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(dKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
