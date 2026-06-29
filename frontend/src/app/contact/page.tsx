import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BrandStrip } from "@/components/sections/brand-strip";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "კონტაქტი",
  description: "დაგვიკავშირდით — ბესა, უსაფრთხოების სისტემები.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ContactContent />
        <BrandStrip />
      </main>
      <SiteFooter />
    </>
  );
}
