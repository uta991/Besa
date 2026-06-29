"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export function Showroom() {
  const t = useT();

  const CONTACT = [
    { icon: MapPin, text: t("site.address") },
    { icon: Clock, text: t("site.hours") },
    { icon: Phone, text: SITE.phone, href: SITE.phoneHref },
  ];

  return (
    <section id="showroom" className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
              {t("sec.showroom")}
            </h2>
            <p className="max-w-md text-muted-foreground">{t("showroom.desc")}</p>
            <ul className="flex flex-col gap-3 text-sm">
              {CONTACT.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon className="size-4 shrink-0 text-brand-accent" />
                  {href ? (
                    <a href={href} className="hover:text-brand-accent">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="pt-1">
              <Button
                asChild
                className="bg-brand-accent text-white hover:bg-brand-accent/90"
              >
                <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">
                  <MapPin className="size-4" />
                  {t("showroom.viewMap")}
                </a>
              </Button>
            </div>
          </div>

          {/* gallery — symmetric: one tall (left) + two stacked (right) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] overflow-hidden rounded-xl border bg-muted shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/showroom/1.jpg"
                alt={t("sec.showroom")}
                className="size-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-3">
              {[3, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/2] overflow-hidden rounded-xl border bg-muted shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/showroom/${i}.jpg`}
                    alt={t("sec.showroom")}
                    className="size-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
