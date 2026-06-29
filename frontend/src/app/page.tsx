import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { BrandStrip } from "@/components/sections/brand-strip";
import { Categories } from "@/components/sections/categories";
import { FeatureBanners } from "@/components/sections/feature-banners";
import { WhyUs } from "@/components/sections/why-us";
import { Showroom } from "@/components/sections/showroom";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <BrandStrip colored />
        <Categories />
        <FeatureBanners />
        <WhyUs />
        <Showroom />
      </main>
      <SiteFooter />
    </>
  );
}
