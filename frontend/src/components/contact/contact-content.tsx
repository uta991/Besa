"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { useT } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export function ContactContent() {
  const t = useT();

  const INFO = [
    { icon: Phone, label: t("label.phone"), value: SITE.phone, href: SITE.phoneHref },
    { icon: Mail, label: t("label.email"), value: SITE.email, href: SITE.emailHref },
    { icon: MapPin, label: t("label.address"), value: t("site.address") },
    { icon: Clock, label: t("label.hours"), value: t("site.hours") },
  ];

  return (
    <>
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-brand">
            {t("contact.title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-brand-accent">
              {t("cat.home")}
            </Link>{" "}
            / <span className="text-brand-accent">{t("contact.title")}</span>
          </p>
        </div>
      </div>

      <div className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-brand">
                {t("contact.connect")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("contact.connectDesc")}
              </p>
              <ul className="mt-6 flex flex-col divide-y">
                {INFO.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4 py-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-muted-foreground hover:text-brand-accent"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>

          <div className="relative mt-6 overflow-hidden rounded-xl border shadow-sm">
            <iframe
              title={t("map.ourLocation")}
              src={SITE.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full sm:h-[380px]"
            />
            <div className="pointer-events-none absolute left-4 top-4 max-w-xs rounded-lg border bg-card/95 p-4 shadow-lg backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("map.ourLocation")}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t("site.address")}
                  </p>
                  <a
                    href={SITE.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline"
                  >
                    {t("map.directions")} <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
