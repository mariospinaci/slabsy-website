import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useT, SITE } from "@/lib/i18n";
import { GUIDES } from "@/data/guides";
import { Seo } from "@/components/site/Seo";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { GuideCard } from "@/pages/Guides";
import { FinalCta } from "@/components/site/FinalCta";

export default function GuideArticle() {
  const { slug } = useParams();
  const { t, p, lang } = useT();
  const g = GUIDES.find((x) => x.slug[lang] === slug) || GUIDES[0];
  const others = GUIDES.filter((x) => x.id !== g.id);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: t(g.title), description: t(g.excerpt), image: SITE + g.img, inLanguage: lang, author: { "@type": "Organization", name: "Slabsy" }, publisher: { "@type": "Organization", name: "Slabsy" } };
  return (
    <>
      <Seo title={`${t(g.title)} | Slabsy`} description={t(g.excerpt)} jsonLd={ld} image={g.img} />
      <article data-testid={`guide-article-${g.id}`} className="pt-32 lg:pt-40">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <Link to={p("guides")} data-testid="guide-back-link" className="link-under inline-flex items-center gap-2 text-sm text-[var(--muted)]"><ArrowLeft size={16} />{t({ it: "Tutte le guide", en: "All guides" })}</Link>
          <p className="overline mt-10">{t({ it: "Guida", en: "Guide" })} · {g.read} min</p>
          <h1 className="font-display mt-5 text-5xl font-black uppercase leading-[0.9] sm:text-7xl"><MaskLines lines={[t(g.title)]} animateOnLoad /></h1>
          <p className="mt-6 max-w-2xl text-lg text-[#c9cfd9]">{t(g.excerpt)}</p>
        </div>
        <motion.div initial={{ clipPath: "inset(12% 8% 12% 8% round 28px)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }} transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-14 max-w-[1300px] px-5 sm:px-8">
          <img src={g.img} alt={t(g.title)} className="aspect-[16/9] w-full rounded-[28px] object-cover" />
        </motion.div>
        <div className="prose-slabsy mx-auto max-w-[760px] px-5 py-20 sm:px-8">
          {g.body.map((s, i) => (
            <Reveal key={i} as="section" className="mb-12">
              <h2 className="font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl"><span className="mr-3 font-mono text-sm text-[var(--gold)]">0{i + 1}</span>{t(s.h)}</h2>
              <p className="mt-5 text-lg">{t(s.p)}</p>
            </Reveal>
          ))}
        </div>
      </article>
      <section className="mx-auto max-w-[1440px] border-t border-[var(--line)] px-5 py-20 sm:px-8 lg:px-12">
        <p className="overline">{t({ it: "Continua a leggere", en: "Keep reading" })}</p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">{others.map((o, i) => <GuideCard key={o.id} g={o} i={i} />)}</div>
      </section>
      <FinalCta />
    </>
  );
}
