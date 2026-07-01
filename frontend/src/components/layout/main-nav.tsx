"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Lock,
  DoorOpen,
  Vault,
  ScanFace,
  Puzzle,
  KeyRound,
  Key,
  Target,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const NAV = [
  { key: "nav.brands", href: "/#brands" },
  { key: "nav.about", href: "/#why" },
  { key: "nav.news", href: "/#news" },
  { key: "nav.contact", href: "/contact" },
];

const CATEGORIES: { key: string; href: string; icon: LucideIcon }[] = [
  { key: "cat.locks", href: "/locks", icon: Lock },
  { key: "cat.handles", href: "/#categories", icon: DoorOpen },
  { key: "cat.safes", href: "/safes", icon: Vault },
  { key: "cat.smartLocks", href: "/smart-locks", icon: ScanFace },
  { key: "cat.accessories", href: "/#categories", icon: Puzzle },
  { key: "cat.closers", href: "/closers", icon: KeyRound },
  { key: "cat.cylinders", href: "/#categories", icon: Key },
  { key: "cat.gunSafes", href: "/safes?cat=gun", icon: Target },
];

const linkBase =
  "relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-brand-accent after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100";

export function MainNav() {
  const pathname = usePathname();
  const t = useT();

  return (
    <nav className="hidden items-center gap-7 lg:flex">
      {/* products: clickable (→ all products) + hover dropdown */}
      <div className="group relative">
        <Link
          href="/products"
          className={cn(
            linkBase,
            "flex items-center gap-1",
            pathname === "/products"
              ? "text-white after:scale-x-100"
              : "text-white/80",
          )}
        >
          {t("nav.products")}
          <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
        </Link>
        {/* pt bridge keeps hover while moving down to the panel */}
        <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
          <div className="w-64 overflow-hidden rounded-xl border bg-white p-1.5 text-foreground shadow-xl">
            {CATEGORIES.map(({ key, href, icon: Icon }) => (
              <Link
                key={key}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
              >
                <span className="flex size-8 items-center justify-center rounded-md bg-brand-accent/10 text-brand-accent">
                  <Icon className="size-4" />
                </span>
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {NAV.map((item) => {
        const active = !item.href.startsWith("/#") && pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              linkBase,
              active ? "text-white after:scale-x-100" : "text-white/80",
            )}
          >
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}
