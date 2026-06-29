"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Fingerprint,
  KeyRound,
  CreditCard,
  Key,
  Smartphone,
  Wifi,
  ShieldCheck,
  Flame,
  BadgeCheck,
  Boxes,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

type Slide = {
  eyebrow?: string;
  titleKey: string;
  subtitleKey: string;
  image: string;
  href: string;
  features: { label: string; icon: LucideIcon }[];
};

const SLIDES: Slide[] = [
  {
    eyebrow: "PHILIPS",
    titleKey: "cat.smartLocks",
    subtitleKey: "banner.smartSub",
    image: "/images/banners/smart-locks.jpg",
    href: "/smart-locks",
    features: [
      { label: "Fingerprint", icon: Fingerprint },
      { label: "PIN Code", icon: KeyRound },
      { label: "Card", icon: CreditCard },
      { label: "Key", icon: Key },
      { label: "App Control", icon: Smartphone },
      { label: "Remote Access", icon: Wifi },
      { label: "Secure & Safe", icon: ShieldCheck },
    ],
  },
  {
    titleKey: "cat.safes",
    subtitleKey: "banner.safesSub",
    image: "/images/banners/safes.jpg",
    href: "/safes",
    features: [
      { label: "feat.fireproof", icon: Flame },
      { label: "feat.digitalCode", icon: KeyRound },
      { label: "feat.key", icon: Key },
      { label: "feat.steelBody", icon: ShieldCheck },
      { label: "feat.certified", icon: BadgeCheck },
      { label: "feat.sizes", icon: Boxes },
    ],
  },
];

const ROTATE_MS = 5000;

function SlideView({ slide }: { slide: Slide }) {
  const t = useT();
  return (
    <>
      {/* product photo — edges faded so it merges into the banner */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full bg-cover bg-right-bottom bg-no-repeat lg:w-[64%]"
        style={{
          backgroundImage: `url('${slide.image}')`,
          maskImage:
            "linear-gradient(to right, transparent 0%, black 30%), linear-gradient(to top, transparent 0%, black 18%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 30%), linear-gradient(to top, transparent 0%, black 18%)",
          WebkitMaskComposite: "source-in",
        }}
      />
      {/* unifying tint so the text stays readable over the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-transparent lg:via-brand-dark/30" />

      <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div>
            {slide.eyebrow && (
              <p className="text-2xl font-bold tracking-wide">{slide.eyebrow}</p>
            )}
            <h2
              className={cn(
                "text-3xl font-bold tracking-tight",
                slide.eyebrow ? "mt-1" : "text-4xl",
              )}
            >
              {t(slide.titleKey)}
            </h2>
          </div>
          <p className="max-w-sm text-white/80">{t(slide.subtitleKey)}</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {slide.features.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-white/90"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                  <Icon className="size-4" />
                </span>
                {t(label)}
              </div>
            ))}
          </div>
          <div className="pt-2">
            <Button asChild className="bg-white text-brand hover:bg-white/90">
              <Link href={slide.href}>
                {t("banner.viewDetails")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div aria-hidden className="hidden lg:block" />
      </div>
    </>
  );
}

export function FeatureBanners() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % SLIDES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-muted/40 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[480px] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark via-brand to-brand-accent/60 text-white lg:min-h-[420px]">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.titleKey}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                i === active ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={i !== active}
            >
              <SlideView slide={slide} />
            </div>
          ))}

          {/* dots */}
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.titleKey}
                type="button"
                aria-label={slide.titleKey}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/40",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
