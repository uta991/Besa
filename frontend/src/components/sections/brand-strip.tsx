const BRANDS = [
  { file: "agb", name: "AGB" },
  { file: "cisa", name: "CISA" },
  { file: "mottura", name: "Mottura" },
  { file: "guradian", name: "Guardian" },
  { file: "philips", name: "Philips" },
  { file: "kale", name: "Kale" },
  { file: "apecs", name: "Apecs" },
  { file: "dorma", name: "Dorma" },
  { file: "besel", name: "Besel" },
  { file: "ceam", name: "Ceam" },
  { file: "bool-safes", name: "Bool Safes" },
  { file: "technomax", name: "Technomax" },
  { file: "eagle", name: "Eagle" },
  { file: "kinq", name: "King" },
  { file: "doganlar", name: "Doganlar" },
  { file: "adams", name: "Adams" },
  { file: "bordonga", name: "Bordogna" },
  { file: "plast", name: "Plast" },
  { file: "freud", name: "Freud" },
];

export function BrandStrip({ colored = false }: { colored?: boolean }) {
  return (
    <section id="brands" className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {BRANDS.map((brand, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${brand.file}-${i}`}
              src={`/images/brands/${brand.file}.jpg`}
              alt={brand.name}
              className={
                colored
                  ? "h-9 w-auto max-w-[120px] object-contain transition hover:scale-105 sm:h-10"
                  : "h-9 w-auto max-w-[120px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-10"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
