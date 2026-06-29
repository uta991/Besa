"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import {
  type SmartLock,
  SMART_LOCK_BRANDS,
  SMART_LOCK_PRICE_MIN,
  SMART_LOCK_PRICE_MAX,
} from "@/lib/smart-locks";
import { SmartLockCard } from "./smart-lock-card";

const STORAGE_KEY = "smart-locks-filters";

export function SmartLocksCatalog({ products }: { products: SmartLock[] }) {
  const t = useT();
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState(SMART_LOCK_PRICE_MAX);
  const [openFilters, setOpenFilters] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (Array.isArray(s.brands)) setBrands(new Set(s.brands));
        if (typeof s.maxPrice === "number") setMaxPrice(s.maxPrice);
      }
    } catch {
      /* ignore */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ brands: [...brands], maxPrice }),
      );
    } catch {
      /* ignore */
    }
  }, [brands, maxPrice, restored]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (brands.size > 0 && !brands.has(p.brand)) return false;
      if (p.price != null && p.price > maxPrice) return false;
      return true;
    });
  }, [products, brands, maxPrice]);

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
    setMaxPrice(SMART_LOCK_PRICE_MAX);
  }

  const sidebar = (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-brand">
          {t("filter.brands")}
        </h3>
        <ul className="flex flex-col gap-2">
          {SMART_LOCK_BRANDS.map((b) => (
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

      <div>
        <h3 className="mb-3 text-sm font-semibold text-brand">
          {t("filter.price")}
        </h3>
        <input
          type="range"
          min={SMART_LOCK_PRICE_MIN}
          max={SMART_LOCK_PRICE_MAX}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-accent"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>₾{SMART_LOCK_PRICE_MIN.toLocaleString("en-US")}</span>
          <span className="font-medium text-foreground">
            ≤ ₾{maxPrice.toLocaleString("en-US")}
          </span>
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
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border bg-card p-5 shadow-sm">
          {sidebar}
        </div>
      </aside>

      <div>
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

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            {t("list.none")}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <SmartLockCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
