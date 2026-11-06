import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { FAQ } from "@/data/faq";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { FaqList } from "@/components/site/FaqList";
import { FinalCta } from "@/components/site/FinalCta";
import { SEO } from "@/data/seo";

export default function Faq() {
  const { t, p } = useT();
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })),
  };
  return (
    <>
      <Seo title={t(SEO.faq.title)} description={t(SEO.faq.desc)} jsonLd={ld} />
      <PageHero testid="faq-hero" over="FAQ" lines={t({ it: ["Domande", "frequenti."], en: ["Frequently asked", "questions."] })} intro={t({ it: "Tutto quello che c'è da sapere su compatibilità, spessori, label e acquisto.", en: "Everything you need to know about compatibility, shims, labels and buying." })} />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-8"><FaqList /></div>
        <aside className="lg:col-span-3 lg:col-start-10">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--ink-2)] p-7 lg:sticky lg:top-32">
            <p className="overline">{t({ it: "Approfondisci", en: "Learn more" })}</p>
            <p className="font-display mt-4 text-3xl font-extrabold uppercase leading-none">{t({ it: "Le guide Slabsy", en: "Slabsy guides" })}</p>
            <Link to={p("guides")} data-testid="faq-guides-link" className="link-under mt-6 inline-flex items-center gap-2 text-[var(--gold-2)]">{t({ it: "Leggi le guide", en: "Read the guides" })}<ArrowRight size={16} /></Link>
          </div>
        </aside>
      </section>
      <FinalCta />
    </>
  );
}
