"use client";

import { useLocale, LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center rounded-full border border-white/20 bg-white/5 p-0.5">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition",
            locale === code
              ? "bg-brand-accent text-white"
              : "text-white/70 hover:text-white",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
