import Link from "next/link";
import { Search, Phone, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-brand text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="ბესა">
          <Logo invert />
        </Link>

        <MainNav />

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 sm:flex">
            {[
              { icon: Search, label: "ძებნა" },
              { icon: Phone, label: "დარეკვა" },
              { icon: MapPin, label: "მისამართი" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="size-[18px]" />
              </button>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
