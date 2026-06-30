"use client";

import {
  Lock,
  DoorOpen,
  Vault,
  ScanFace,
  Puzzle,
  KeyRound,
  Key,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useT } from "@/lib/i18n";

type Category = {
  key: string;
  slug: string;
  icon: LucideIcon;
  href: string;
};

const CATEGORIES: Category[] = [
  { key: "cat.locks", slug: "locks", icon: Lock, href: "#" },
  { key: "cat.handles", slug: "handles", icon: DoorOpen, href: "#" },
  { key: "cat.safes", slug: "safes", icon: Vault, href: "/safes" },
  {
    key: "cat.smartLocks",
    slug: "smart-locks",
    icon: ScanFace,
    href: "/smart-locks",
  },
  { key: "cat.accessories", slug: "accessories", icon: Puzzle, href: "#" },
  { key: "cat.closers", slug: "shveicari", icon: KeyRound, href: "#" },
  { key: "cat.cylinders", slug: "cylinders", icon: Key, href: "#" },
];

export function Categories() {
  const t = useT();
  return (
    <section id="categories" className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-brand sm:text-3xl">
          {t("sec.categories")}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {CATEGORIES.map(({ key, slug, icon: Icon, href }) => {
            const title = t(key);
            return (
              <Link
                key={slug}
                href={href}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/categories/${slug}.jpg`}
                    alt={title}
                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex-1 text-sm font-semibold leading-tight text-foreground">
                    {title}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-brand-accent" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
