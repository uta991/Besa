"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Flame,
  Target,
  Building2,
  KeyRound,
  BedDouble,
  ArrowRight,
  Vault,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import {
  type Safe,
  SAFE_BRANDS,
  SAFE_PRICE_MIN,
  SAFE_PRICE_MAX,
} from "@/lib/safes";

const STORAGE_KEY = "safes-filters";

const SAFE_CATEGORIES: {
  key: string;
  icon: LucideIcon;
  match: (p: Safe) => boolean;
}[] = [
  { key: "feat.fireproof", icon: Flame, match: (p) => p.fireproof },
  { key: "cat.gunSafes", icon: Target, match: (p) => p.gunSafe },
  {
    key: "safeType.wall",
    icon: Building2,
    match: (p) => /კედელში/.test(p.spec),
  },
  {
    key: "safeType.key",
    icon: KeyRound,
    match: (p) => /გასაღების შესან/.test(p.spec),
  },
  {
    key: "safeType.hotel",
    icon: BedDouble,
    match: (p) => /სასტუმრო/.test(p.spec),
  },
];

export function SafesCatalog({ products }: { products: Safe[] }) {
  const t = useT();
  const priceLabel = (p: number | null) =>
    p == null ? t("list.priceOnRequest") : `₾${p.toLocaleString("en-US")}`;
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState(SAFE_PRICE_MAX);
  const [openFilters, setOpenFilters] = useState(false);
  const [restored, setRestored] = useState(false);

  // restore previously selected filters (kept while navigating to a product and back)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (Array.isArray(s.brands)) setBrands(new Set(s.brands));
        if (Array.isArray(s.categories)) setCategories(new Set(s.categories));
        if (typeof s.maxPrice === "number") setMaxPrice(s.maxPrice);
      }
    } catch {
      /* ignore */
    }
    // the landing "gun safe" category links here with ?cat=gun
    try {
      if (new URLSearchParams(window.location.search).get("cat") === "gun")
        setCategories((prev) => new Set(prev).add("cat.gunSafes"));
    } catch {
      /* ignore */
    }
    setRestored(true);
  }, []);

  // persist filters
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          brands: [...brands],
          categories: [...categories],
          maxPrice,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [brands, categories, maxPrice, restored]);

  const filtered = useMemo(() => {
    const selected = SAFE_CATEGORIES.filter((c) => categories.has(c.key));
    return products.filter((p) => {
      if (brands.size > 0 && !brands.has(p.brand)) return false;
      if (selected.length > 0 && !selected.some((c) => c.match(p))) return false;
      if (p.price != null && p.price > maxPrice) return false;
      return true;
    });
  }, [products, brands, categories, maxPrice]);

  function toggleBrand(b: string) {
    setBrands((prev) => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b);
      else next.add(b);
      return next;
    });
  }

  function toggleCategory(k: string) {
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  function reset() {
    setBrands(new Set());
    setCategories(new Set());
    setMaxPrice(SAFE_PRICE_MAX);
  }

  const sidebar = (
    <div className="flex flex-col gap-7">
      {/* brands */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-brand">
          {t("filter.brands")}
        </h3>
        <ul className="flex flex-col gap-2">
          {SAFE_BRANDS.map((b) => (
            <li key={b}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={brands.has(b)}
                  onChange={() => toggleBrand(b)}
                  className="size-4 accent-brand-accent"
                />
                {b}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* price range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-brand">
          {t("filter.price")}
        </h3>
        <input
          type="range"
          min={SAFE_PRICE_MIN}
          max={SAFE_PRICE_MAX}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-accent"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>₾{SAFE_PRICE_MIN.toLocaleString("en-US")}</span>
          <span className="font-medium text-foreground">
            ≤ ₾{maxPrice.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      {/* category */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-brand">
          {t("filter.category")}
        </h3>
        <div className="flex flex-col gap-2">
          {SAFE_CATEGORIES.map(({ key, icon: Icon }) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <input
                type="checkbox"
                checked={categories.has(key)}
                onChange={() => toggleCategory(key)}
                className="size-4 accent-brand-accent"
              />
              <Icon className="size-4 text-brand-accent" />
              {t(key)}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="self-start text-xs font-medium text-brand-accent hover:underline"
      >
        {t("filter.clear")}
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border bg-card p-5 shadow-sm">
          {sidebar}
        </div>
      </aside>

      <div>
        {/* mobile filter toggle + count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t("list.showing")}{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            / {products.length} {t("list.products")}
          </p>
          <button
            type="button"
            onClick={() => setOpenFilters((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            {t("filter.filter")}
          </button>
        </div>

        {openFilters && (
          <div className="mb-6 rounded-xl border bg-card p-5 shadow-sm lg:hidden">
            {sidebar}
          </div>
        )}

        {/* product grid */}
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            {t("list.none")}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`/safes/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.model}
                      className={cn(
                        "size-full transition duration-300 group-hover:scale-105",
                        p.imgWide ? "object-contain p-2" : "object-cover",
                      )}
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand/10 via-muted to-brand-accent/10">
                      <Vault className="size-12 text-brand/25" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {p.brand}
                  </p>
                  <p className="font-semibold leading-tight text-foreground">
                    {p.model}
                  </p>
                  {(() => {
                    const cat = SAFE_CATEGORIES.find((c) => c.match(p));
                    if (!cat) return null;
                    const Icon = cat.icon;
                    const isFire = cat.key === "feat.fireproof";
                    return (
                      <span
                        className={cn(
                          "inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium",
                          isFire
                            ? "bg-[#f4534d]/10 text-[#f4534d]"
                            : "bg-brand-accent/10 text-brand-accent",
                        )}
                      >
                        <Icon className="size-3" />
                        {t(cat.key)}
                        {isFire && p.fireMinutes
                          ? ` · ${p.fireMinutes} ${t("unit.min")}`
                          : ""}
                      </span>
                    );
                  })()}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
