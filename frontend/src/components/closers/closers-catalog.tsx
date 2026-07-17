"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, DoorClosed, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import {
  type Closer,
  CLOSER_BRANDS,
  CLOSER_PRICE_MIN,
  CLOSER_PRICE_MAX,
} from "@/lib/closers";

const STORAGE_KEY = "closers-filters";

const maxKg = (s: string) => {
  const nums = (s.match(/\d+/g) || []).map(Number);
  return nums.length ? Math.max(...nums) : 0;
};

const COLOR_CATS: { key: string; match: (p: Closer) => boolean }[] = [
  { key: "color.black", match: (p) => /შავ/.test(p.color) },
  { key: "color.silver", match: (p) => /ვერცხ/.test(p.color) },
];

const WEIGHT_CATS: { key: string; match: (p: Closer) => boolean }[] = [
  { key: "weight.light", match: (p) => maxKg(p.doorWeight) > 0 && maxKg(p.doorWeight) <= 45 },
  { key: "weight.medium", match: (p) => maxKg(p.doorWeight) > 45 && maxKg(p.doorWeight) <= 85 },
  { key: "weight.heavy", match: (p) => maxKg(p.doorWeight) > 85 },
];

const FUNC_CATS: { key: string; match: (p: Closer) => boolean }[] = [
  { key: "feat.holdOpen", match: (p) => /გაჩერ|ფიქსაც/.test(p.features) },
];

export function ClosersCatalog({ products }: { products: Closer[] }) {
  const t = useT();
  const priceLabel = (p: number | null) =>
    p == null ? t("list.priceOnRequest") : `₾${p.toLocaleString("en-US")}`;
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [colors, setColors] = useState<Set<string>>(new Set());
  const [weights, setWeights] = useState<Set<string>>(new Set());
  const [funcs, setFuncs] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState(CLOSER_PRICE_MAX);
  const [openFilters, setOpenFilters] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (Array.isArray(s.brands)) setBrands(new Set(s.brands));
        if (Array.isArray(s.colors)) setColors(new Set(s.colors));
        if (Array.isArray(s.weights)) setWeights(new Set(s.weights));
        if (Array.isArray(s.funcs)) setFuncs(new Set(s.funcs));
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
        JSON.stringify({
          brands: [...brands],
          colors: [...colors],
          weights: [...weights],
          funcs: [...funcs],
          maxPrice,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [brands, colors, weights, funcs, maxPrice, restored]);

  const filtered = useMemo(() => {
    const colorSel = COLOR_CATS.filter((c) => colors.has(c.key));
    const weightSel = WEIGHT_CATS.filter((c) => weights.has(c.key));
    const funcSel = FUNC_CATS.filter((c) => funcs.has(c.key));
    return products.filter((p) => {
      if (brands.size > 0 && !brands.has(p.brand)) return false;
      if (colorSel.length > 0 && !colorSel.some((c) => c.match(p))) return false;
      if (weightSel.length > 0 && !weightSel.some((c) => c.match(p)))
        return false;
      if (funcSel.length > 0 && !funcSel.some((c) => c.match(p))) return false;
      if (p.price != null && p.price > maxPrice) return false;
      return true;
    });
  }, [products, brands, colors, weights, funcs, maxPrice]);

  const makeToggle =
    (setter: React.Dispatch<React.SetStateAction<Set<string>>>) =>
    (v: string) =>
      setter((prev) => {
        const next = new Set(prev);
        if (next.has(v)) next.delete(v);
        else next.add(v);
        return next;
      });
  const toggleBrand = makeToggle(setBrands);
  const toggleColor = makeToggle(setColors);
  const toggleWeight = makeToggle(setWeights);
  const toggleFunc = makeToggle(setFuncs);

  function reset() {
    setBrands(new Set());
    setColors(new Set());
    setWeights(new Set());
    setFuncs(new Set());
    setMaxPrice(CLOSER_PRICE_MAX);
  }

  const checkboxGroup = (
    title: string,
    items: { key: string; label: string; checked: boolean; onToggle: () => void }[],
  ) => (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-brand">{title}</h3>
      <div className="flex flex-col gap-2">
        {items.map((it) => (
          <label
            key={it.key}
            className="flex cursor-pointer items-center gap-2.5 text-sm"
          >
            <input
              type="checkbox"
              checked={it.checked}
              onChange={it.onToggle}
              className="size-4 accent-brand-accent"
            />
            {it.label}
          </label>
        ))}
      </div>
    </div>
  );

  const sidebar = (
    <div className="flex flex-col gap-7">
      {checkboxGroup(
        t("filter.brands"),
        CLOSER_BRANDS.map((b) => ({
          key: b,
          label: b,
          checked: brands.has(b),
          onToggle: () => toggleBrand(b),
        })),
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-brand">
          {t("filter.price")}
        </h3>
        <input
          type="range"
          min={CLOSER_PRICE_MIN}
          max={CLOSER_PRICE_MAX}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-accent"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>₾{CLOSER_PRICE_MIN.toLocaleString("en-US")}</span>
          <span className="font-medium text-foreground">
            ≤ ₾{maxPrice.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      {checkboxGroup(
        t("spec.color"),
        COLOR_CATS.map((c) => ({
          key: c.key,
          label: t(c.key),
          checked: colors.has(c.key),
          onToggle: () => toggleColor(c.key),
        })),
      )}

      {checkboxGroup(
        t("spec.doorWeight"),
        WEIGHT_CATS.map((c) => ({
          key: c.key,
          label: t(c.key),
          checked: weights.has(c.key),
          onToggle: () => toggleWeight(c.key),
        })),
      )}

      {checkboxGroup(
        t("filter.feature"),
        FUNC_CATS.map((c) => ({
          key: c.key,
          label: t(c.key),
          checked: funcs.has(c.key),
          onToggle: () => toggleFunc(c.key),
        })),
      )}

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
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border bg-card p-5 shadow-sm">
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
              <Link
                key={p.slug}
                href={`/closers/${p.slug}`}
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
                      <DoorClosed className="size-12 text-brand/25" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {p.brand}
                  </p>
                  <p className="font-semibold leading-tight text-foreground">
                    {p.model}
                    {p.color ? (
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        · {p.color}
                      </span>
                    ) : null}
                  </p>
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
