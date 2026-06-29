"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { useT } from "@/lib/i18n";

function FacebookIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.52.01-4.76.07-.99.04-1.53.21-1.89.35-.47.18-.81.4-1.17.76-.36.36-.58.7-.76 1.17-.14.36-.31.9-.35 1.89-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.99.21 1.53.35 1.89.18.47.4.81.76 1.17.36.36.7.58 1.17.76.36.14.9.31 1.89.35 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.99-.04 1.53-.21 1.89-.35.47-.18.81-.4 1.17-.76.36-.36.58-.7.76-1.17.14-.36.31-.9.35-1.89.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.99-.21-1.53-.35-1.89a3.15 3.15 0 0 0-.76-1.17 3.15 3.15 0 0 0-1.17-.76c-.36-.14-.9-.31-1.89-.35-1.24-.06-1.61-.07-4.76-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.5-.34a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0Z" />
    </svg>
  );
}

const SOCIAL = [
  {
    Icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/share/1D7uz84Q8o/?mibextid=wwXIfr",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/serratura_handles?igsh=cTRiNWI3ZDJlc3Vn",
  },
];

export function SiteFooter() {
  const t = useT();

  const COLUMNS = [
    {
      title: t("nav.products"),
      links: [
        { label: t("cat.locks"), href: "/#categories" },
        { label: t("cat.handles"), href: "/#categories" },
        { label: t("cat.safes"), href: "/safes" },
        { label: t("cat.smartLocks"), href: "/smart-locks" },
        { label: t("cat.accessories"), href: "/#categories" },
        { label: t("cat.closers"), href: "/#categories" },
      ],
    },
    {
      title: t("nav.brands"),
      links: [
        { label: "AGB", href: "/#brands" },
        { label: "CISA", href: "/#brands" },
        { label: "Mottura", href: "/#brands" },
        { label: "Guardian", href: "/#brands" },
        { label: "Philips", href: "/#brands" },
        { label: t("footer.otherBrands"), href: "/#brands" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/#why" },
        { label: t("nav.news"), href: "/#news" },
        { label: t("nav.contact"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo invert />
          <p className="max-w-xs text-sm text-white/65">{t("footer.tagline")}</p>
          <div className="flex gap-2">
            {SOCIAL.map(({ Icon, label, href }) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/65">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-3 lg:hidden xl:flex">
          <h3 className="text-sm font-semibold">{t("nav.contact")}</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-white/65">
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0" /> +995 555 10 52 52
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0" /> info@besa.ge
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" /> {t("site.addressShort")}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/50 sm:px-6 lg:px-8">
          © 2026 ბესა. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
