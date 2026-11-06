import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { GUIDES } from "@/data/guides";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const GuideCard = ({ g, i }) => {
  const { t, p } = useT();
  return (
    <Reveal delay={i * 0.08}>
      <Link to={p("guides", t(g.slug))} data-testid={`guide-card-${g.id}`} className="group block">
        <div className="overflow-hidden rounded-3xl border border-[var(--line)]">
          <img src={g.img} alt={t(g.title)} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
        </div>
        <p className="overline mt-6">{t({ it: "Guida", en: "Guide" })} · {g.read} min</p>
        <h3 className="font-display mt-3 text-3xl font-extrabold uppercase leading-none transition-colors duration-300 group-hover:text-[var(--gold-2)]">{t(g.title)}</h3>
        <p className="mt-3 text-[#c9cfd9]">{t(g.excerpt)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--gold-2)]">{t({ it: "Leggi", en: "Read" })}<ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" /></span>
      </Link>
    </Reveal>
  );
};

export default function Guides() {
  const { t } = useT();
  return (
    <>
      <Seo title={t({ it: "Guide · Come esporre i fumetti gradati | Slabsy", en: "Guides · How to display graded comics | Slabsy" })} description={t({ it: "Guide pratiche per esporre slab CGC, CBCS ed ECG: parete o appoggio, spessori per spillati e brossurati, label personalizzate e sketch label.", en: "Practical guides to display CGC, CBCS and ECG slabs: wall or tabletop, shims for staple-bound and perfect-bound comics, custom and sketch labels." })} />
      <PageHero testid="guides-hero" over={t({ it: "Guide", en: "Guides" })} lines={t({ it: ["Esporre", "con metodo."], en: ["Display", "with method."] })} intro={t({ it: "Consigli pratici per valorizzare i tuoi fumetti gradati.", en: "Practical advice to make the most of your graded comics." })} />
      <section className="mx-auto grid max-w-[1440px] gap-x-8 gap-y-16 px-5 pb-28 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-12">
        {GUIDES.map((g, i) => <GuideCard key={g.id} g={g} i={i} />)}
      </section>
    </>
  );
}
