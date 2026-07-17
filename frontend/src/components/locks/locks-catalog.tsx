"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { type Lock as LockT, LOCK_BRANDS, LOCK_TYPES } from "@/lib/locks";

const STORAGE_KEY = "locks-filters";

export function LocksCatalog({ products }: { products: LockT[] }) {
  const t = useT();
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [openFilters, setOpenFilters] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (Array.isArray(s.brands)) setBrands(new Set(s.brands));
        if (Array.isArray(s.types)) setTypes(new Set(s.types));
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
        JSON.stringify({ brands: [...brands], types: [...types] }),
      );
    } catch {
      /* ignore */
    }
  }, [brands, types, restored]);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (brands.size > 0 && !brands.has(p.brand)) return false;
        if (types.size > 0 && !types.has(p.lockType)) return false;
        return true;
      }),
    [products, brands, types],
  );

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
  const toggleType = makeToggle(setTypes);

  function reset() {
    setBrands(new Set());
    setTypes(new Set());
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
        LOCK_BRANDS.map((b) => ({
          key: b,
          label: b,
          checked: brands.has(b),
          onToggle: () => toggleBrand(b),
        })),
      )}

      {checkboxGroup(
        t("spec.lockType"),
        LOCK_TYPES.map((lt) => ({
          key: lt,
          label: t(lt),
          checked: types.has(lt),
          onToggle: () => toggleType(lt),
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
                href={`/locks/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[0]}
                      alt={p.model}
                      className={cn(
                        "size-full transition duration-300 group-hover:scale-105",
                        p.imgWide ? "object-contain p-2" : "object-cover",
                      )}
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand/10 via-muted to-brand-accent/10">
                      <Lock className="size-12 text-brand/25" />
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
                  {p.lockType && (
                    <span className="inline-flex w-fit items-center gap-1 rounded-md bg-brand-accent/10 px-2 py-0.5 text-[11px] font-medium text-brand-accent">
                      <Lock className="size-3" />
                      {t(p.lockType)}
                    </span>
                  )}
                  <div className="mt-auto flex items-center justify-end pt-2">
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
