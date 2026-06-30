import Link from "next/link";
import { BRANDS } from "@/lib/brands";

export function BrandStrip({ colored = false }: { colored?: boolean }) {
  return (
    <section id="brands" className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {[...BRANDS]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              aria-label={brand.name}
              className="shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/brands/${brand.file}.jpg`}
                alt={brand.name}
                className={
                  colored
                    ? "h-9 w-auto max-w-[120px] object-contain transition hover:scale-105 sm:h-10"
                    : "h-9 w-auto max-w-[120px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-10"
                }
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
