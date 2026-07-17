import data from "@/data/accessories.json";

export type Accessory = {
  slug: string;
  code: string;
  brand: string;
  model: string;
  baseModel: string;
  /** category — the folder name: ბრონები / პეტლები / რეზინა / წებო / ხერხი */
  accessoryType: string;
  spec: string;
  color: string;
  metal: string;
  dimensions: string;
  lockType: string;
  keyCount: string;
  country: string;
  price: number | null;
  images: string[];
  imgWide: boolean;
};

export const ACCESSORIES = data as Accessory[];

export function getAccessory(slug: string): Accessory | undefined {
  return ACCESSORIES.find((a) => a.slug === slug);
}

export const ACCESSORY_TYPES = [
  ...new Set(ACCESSORIES.map((a) => a.accessoryType).filter(Boolean)),
].sort();

export const ACCESSORY_BRANDS = [
  ...new Set(ACCESSORIES.map((a) => a.brand)),
].sort();

export const ACCESSORY_COLORS = [
  ...new Set(ACCESSORIES.map((a) => a.color).filter(Boolean)),
].sort();
