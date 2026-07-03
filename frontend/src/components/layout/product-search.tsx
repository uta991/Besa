"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { CATALOG } from "@/lib/catalog";

// Georgian → Latin so a Georgian query matches Latin product names (BAHAR, PROFI…)
const KA2LAT: Record<string, string> = {
  ა: "a", ბ: "b", გ: "g", დ: "d", ე: "e", ვ: "v", ზ: "z", თ: "t", ი: "i",
  კ: "k", ლ: "l", მ: "m", ნ: "n", ო: "o", პ: "p", ჟ: "zh", რ: "r", ს: "s",
  ტ: "t", უ: "u", ფ: "f", ქ: "k", ღ: "gh", ყ: "q", შ: "sh", ჩ: "ch",
  ც: "ts", ძ: "dz", წ: "ts", ჭ: "ch", ხ: "kh", ჯ: "j", ჰ: "h",
};
function canon(s: string): string {
  return s
    .toLowerCase()
    .split("")
    .map((c) => KA2LAT[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]/g, "");
}

const INDEX = CATALOG.map((p) => ({ p, text: canon(`${p.name} ${p.brand}`) }));

export function ProductSearch() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const results = useMemo(() => {
    const query = canon(q);
    if (!query) return [];
    return INDEX.filter((e) => e.text.includes(query))
      .slice(0, 8)
      .map((e) => e.p);
  }, [q]);

  function close() {
    setOpen(false);
    setQ("");
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("search.placeholder")}
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Search className="size-[18px]" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border bg-white text-foreground shadow-xl">
          <div className="flex items-center gap-2 border-b px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full bg-transparent py-3 text-sm outline-none"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="clear"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {q.trim() && (
            <div className="max-h-80 overflow-y-auto p-1.5">
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  {t("search.none")}
                </p>
              ) : (
                results.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={close}
                    className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-muted"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.name}
                          className={cn(
                            "size-full",
                            p.imgFit === "contain"
                              ? "object-contain p-0.5"
                              : "object-cover",
                          )}
                        />
                      ) : (
                        <Package className="size-4 text-brand/30" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {p.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {p.brand} · {t(p.categoryKey)}
                      </span>
                    </span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
