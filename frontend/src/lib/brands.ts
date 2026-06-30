export type Brand = {
  file: string; // logo file in /images/brands/<file>.jpg
  name: string;
  slug: string; // /brands/<slug> — matches product brandSlug where products exist
};

export const BRANDS: Brand[] = [
  { file: "agb", name: "AGB", slug: "agb" },
  { file: "cisa", name: "CISA", slug: "cisa" },
  { file: "mottura", name: "Mottura", slug: "mottura" },
  { file: "guradian", name: "Guardian", slug: "guradian" },
  { file: "philips", name: "Philips", slug: "philips" },
  { file: "kale", name: "Kale", slug: "kale" },
  { file: "apecs", name: "Apecs", slug: "apecs" },
  { file: "dorma", name: "Dorma", slug: "dorma" },
  { file: "besel", name: "Besel", slug: "besel" },
  { file: "ceam", name: "Ceam", slug: "ceam" },
  { file: "bool-safes", name: "Bool Safes", slug: "booil-safes" },
  { file: "technomax", name: "Technomax", slug: "technomax" },
  { file: "eagle", name: "Eagle", slug: "eagle-safes" },
  { file: "kinq", name: "King", slug: "kinq" },
  { file: "doganlar", name: "Doganlar", slug: "doganlar" },
  { file: "adams", name: "Adams", slug: "adams" },
  { file: "bordonga", name: "Bordogna", slug: "bordonga" },
  { file: "plast", name: "Plast", slug: "plast" },
  { file: "freud", name: "Freud", slug: "freud" },
  { file: "duranteadesivi", name: "Durante & Adesivi", slug: "duranteadesivi" },
  { file: "serratura", name: "Serratura", slug: "serratura" },
];

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
