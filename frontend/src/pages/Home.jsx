import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useT, SITE } from "@/lib/i18n";
import { Seo } from "@/components/site/Seo";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/site/Marquee";
import { ThreeQuestions } from "@/components/home/ThreeQuestions";
import { ModelsGrid } from "@/components/home/ModelsGrid";
import { FeatureBento } from "@/components/home/FeatureBento";
import { Philosophy } from "@/components/home/Philosophy";
import { FaqList } from "@/components/site/FaqList";
import { FinalCta } from "@/components/site/FinalCta";
import { MaskLines } from "@/components/site/Reveal";
import { MaterialSection } from "@/components/home/MaterialSection";
import { SEO as PAGE_SEO } from "@/data/seo";

const SEO = PAGE_SEO.home;

export default function Home() {
  const { t, p } = useT();
  return (
    <>
      <Seo title={t(SEO.title)} description={t(SEO.desc)} jsonLd={{ "@context": "https://schema.org", "@type": "WebSite", name: "Slabsy", url: SITE }} />
      <Hero />
      <Marquee />
      <ThreeQuestions />
      <ModelsGrid />
      <FeatureBento />
      <MaterialSection />
      <Philosophy />
      <section data-testid="faq-teaser" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-36">
        <div className="lg:col-span-4">
          <p className="overline">FAQ</p>
          <h2 className="font-display mt-5 text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl">
            <MaskLines lines={t({ it: ["Domande", "frequenti"], en: ["Frequently", "asked"] })} />
          </h2>
          <Link to={p("faq")} data-testid="faq-teaser-all-link" className="link-under mt-8 inline-flex items-center gap-2 text-[var(--gold-2)]">
            {t({ it: "Tutte le domande", en: "All questions" })}<ArrowRight size={16} />
          </Link>
        </div>
        <div className="lg:col-span-8"><FaqList limit={4} /></div>
      </section>
      <FinalCta />
    </>
  );
}
