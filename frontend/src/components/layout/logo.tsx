"use client";

import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  const t = useT();
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={invert ? "/images/besa-logo-light.png" : "/images/besa-logo.png"}
        alt="ბესა"
        className="h-12 w-auto object-contain"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-xl font-bold tracking-tight",
            invert ? "text-white" : "text-brand",
          )}
        >
          ბესა
        </span>
        <span
          className={cn(
            "text-[10px] font-medium tracking-wide",
            invert ? "text-white/60" : "text-muted-foreground",
          )}
        >
          {t("brand.tagline")}
        </span>
      </span>
    </div>
  );
}
