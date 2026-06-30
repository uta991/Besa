"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Flame, Target, ArrowRight, Vault, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import {
  type Safe,
  SAFE_BRANDS,
  SAFE_PRICE_MIN,
  SAFE_PRICE_MAX,
} from "@/lib/safes";

const STORAGE_KEY = "safes-filters";

export function SafesCatalog({ products }: { products: Safe[] }) {
  const t = useT();
  const priceLabel = (p: number | null) =>
    p == null ? t("list.priceOnRequest") : `₾${p.toLocaleString("en-US")}`;
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [fireproofOnly, setFireproofOnly] = useState(false);
  const [gunSafeOnly, setGunSafeOnly] = useState(false);
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
        if (typeof s.fireproofOnly === "boolean")
          setFireproofOnly(s.fireproofOnly);
        if (typeof s.gunSafeOnly === "boolean") setGunSafeOnly(s.gunSafeOnly);
        if (typeof s.maxPrice === "number") setMaxPrice(s.maxPrice);
      }
    } catch {
      /* ignore */
    }
    // the landing "gun safe" category links here with ?cat=gun
    try {
      if (new URLSearchParams(window.location.search).get("cat") === "gun")
        setGunSafeOnly(true);
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
          fireproofOnly,
          gunSafeOnly,
          maxPrice,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [brands, fireproofOnly, gunSafeOnly, maxPrice, restored]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (brands.size > 0 && !brands.has(p.brand)) return false;
      if (fireproofOnly && !p.fireproof) return false;
      if (gunSafeOnly && !p.gunSafe) return false;
      if (p.price != null && p.price > maxPrice) return false;
      return true;
    });
  }, [products, brands, fireproofOnly, gunSafeOnly, maxPrice]);

  function toggleBrand(b: string) {
    setBrands((prev) => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b);
      else next.add(b);
      return next;
    });
  }

  function reset() {
    setBrands(new Set());
    setFireproofOnly(false);
    setGunSafeOnly(false);
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
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={fireproofOnly}
              onChange={(e) => setFireproofOnly(e.target.checked)}
              className="size-4 accent-brand-accent"
            />
            <Flame className="size-4 text-brand-accent" />
            {t("feat.fireproof")}
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={gunSafeOnly}
              onChange={(e) => setGunSafeOnly(e.target.checked)}
              className="size-4 accent-brand-accent"
            />
            <Target className="size-4 text-brand-accent" />
            {t("cat.gunSafes")}
          </label>
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
        <div className="sticky top-24 rounded-xl border bg-card p-5 shadow-sm">
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
                  {p.fireproof && (
                    <span className="inline-flex w-fit items-center gap-1 rounded-md bg-[#f4534d]/10 px-2 py-0.5 text-[11px] font-medium text-[#f4534d]">
                      <Flame className="size-3" />
                      {t("feat.fireproof")}
                      {p.fireMinutes
                        ? ` · ${p.fireMinutes} ${t("unit.min")}`
                        : ""}
                    </span>
                  )}
                  {p.gunSafe && (
                    <span className="inline-flex w-fit items-center gap-1 rounded-md bg-brand-accent/10 px-2 py-0.5 text-[11px] font-medium text-brand-accent">
                      <Target className="size-3" />
                      {t("cat.gunSafes")}
                    </span>
                  )}
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
