"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

/**
 * Showroom-style hero. The dark scene below is built in CSS so it reads like a
 * real showroom (lit display walls, island unit, floor reflection) instead of a
 * flat gradient. Drop a real photo at `public/images/hero-showroom.jpg` and it
 * will be layered on top automatically.
 */
function DisplayWall() {
  // a wall of backlit product cabinets
  return (
    <div className="absolute inset-y-0 right-0 flex w-[60%] items-stretch gap-3 px-6 [perspective:1200px]">
      {Array.from({ length: 6 }).map((_, col) => (
        <div
          key={col}
          className="relative flex flex-1 flex-col gap-2 rounded-md bg-white/[0.03] p-2 ring-1 ring-white/[0.06]"
        >
          {/* top backlight */}
          <div className="absolute inset-x-2 -top-px h-6 rounded-b-xl bg-brand-accent-soft/30 blur-md" />
          {Array.from({ length: 7 }).map((_, row) => (
            <div
              key={row}
              className="relative flex-1 overflow-hidden rounded-sm bg-gradient-to-b from-white/[0.12] to-white/[0.02] ring-1 ring-white/5"
            >
              {/* the product silhouette */}
              <span className="absolute left-1/2 top-1/2 h-3/5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25" />
              <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent-soft/70" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const t = useT();
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-white">
      {/* ---- showroom scene ---- */}
      <div className="absolute inset-0 -z-10">
        {/* base ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_75%_0%,#1d4170_0%,#102a4d_45%,#0b1f3b_100%)]" />
        {/* ceiling spotlights */}
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_30%_0%,rgba(120,170,255,0.25),transparent_70%),radial-gradient(50%_100%_at_70%_0%,rgba(120,170,255,0.2),transparent_70%)]" />
        {/* the lit display wall */}
        <DisplayWall />
        {/* left readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-transparent" />
        {/* floor reflection */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight drop-shadow-sm sm:text-5xl lg:text-6xl">
            {t("hero.title1")}
            <br />
            <span className="text-brand-accent-soft">{t("hero.title2")}</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-brand-accent text-white shadow-lg shadow-brand-accent/30 hover:bg-brand-accent/90"
            >
              <a href="/products">
                {t("hero.cta1")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white/10 hover:text-white"
            >
              <MapPin className="size-4" />
              {t("hero.cta2")}
            </Button>
          </div>
        </div>

        {/* AGB island unit */}
        <div className="relative hidden lg:flex lg:justify-center">
          <div className="relative">
            <div className="flex size-44 flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-brand-accent to-brand-accent/70 shadow-2xl shadow-brand-accent/40 ring-1 ring-white/20">
              <span className="text-4xl font-extrabold tracking-wide">AGB</span>
              <span className="mt-1.5 text-xs font-medium opacity-90">
                Open · Close · Live
              </span>
              <span className="mt-3 text-[10px] uppercase tracking-widest opacity-60">
                Made in Italy
              </span>
            </div>
            {/* reflection */}
            <div className="mx-auto mt-1 h-10 w-40 rounded-b-2xl bg-gradient-to-b from-brand-accent/30 to-transparent blur-sm" />
          </div>
        </div>
      </div>

      {/* carousel dots */}
      <div className="relative flex justify-center gap-2 pb-8">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === 0 ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
