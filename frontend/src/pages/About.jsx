import { useT } from "@/lib/i18n";
import { VALUES } from "@/data/site";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { SlabFrame } from "@/components/site/SlabFrame";
import { Marquee } from "@/components/site/Marquee";
import { FinalCta } from "@/components/site/FinalCta";
import { MaterialSection } from "@/components/home/MaterialSection";
import { PURPOSE } from "@/data/copy";
import { SEO } from "@/data/seo";

const Block = ({ over, title, children, img, alt, label, flip }) => (
  <div className="grid items-center gap-12 border-t border-[var(--line)] py-20 lg:grid-cols-12 lg:py-28">
    <Reveal className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
      <SlabFrame src={img} alt={alt} label={label} sub="SLABSY" ratio="aspect-[4/3]" />
    </Reveal>
    <div className={`lg:col-span-5 ${flip ? "" : "lg:col-start-8"}`}>
      <p className="overline">{over}</p>
      <h2 className="font-display mt-4 text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl"><MaskLines lines={title} /></h2>
      <Reveal className="mt-8" delay={0.1}>{children}</Reveal>
    </div>
  </div>
);

export default function About() {
  const { t } = useT();
  return (
    <>
      <Seo title={t(SEO.about.title)} description={t(SEO.about.desc)} />
      <PageHero testid="about-hero" over={t({ it: "Il brand", en: "The brand" })} lines={t({ it: ["Il display", "non ruba", "la scena."], en: ["The display", "never steals", "the scene."] })} intro={t({ it: "Nel mondo del collezionismo ogni dettaglio conta. SLABSY esiste per esaltare ciò che conta davvero: la tua collezione.", en: "In collecting, every detail matters. SLABSY exists to elevate what really matters: your collection." })} />
      <Marquee />
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Block over={t({ it: "A cosa serve", en: "What it's for" })} title={t({ it: ["Più di un", "supporto."], en: ["More than", "a stand."] })} img="/img/env-desk.webp" alt="Slabsy Stand" label="STAND V.2">
          <p className="text-lg leading-relaxed text-[#c9cfd9]">{t({ it: "SLABSY è un sistema di esposizione premium per fumetti gradati certificati (CGC, CBCS e standard compatibili): uno strumento pensato e progettato per trasformare la slab in un vero elemento espositivo. Studiato per:", en: "SLABSY is a premium display system for certified graded comics (CGC, CBCS and compatible standards): a tool designed to turn the slab into a true display piece. Designed to:" })}</p>
          <ul className="mt-6">{t(PURPOSE).map((x) => <li key={x} className="border-b border-[var(--line)] py-3 font-medium">— {x}</li>)}</ul>
        </Block>
        <Block flip over={t({ it: "Perché è diverso", en: "Why it's different" })} title={t({ it: ["Essenziale.", "Rigoroso."], en: ["Essential.", "Rigorous."] })} img="/img/wall-v2-4.webp" alt="Slabsy Wall V.2" label="WALL V.2">
          <p className="text-lg leading-relaxed text-[#c9cfd9]">{t({ it: "SLABSY è progettato secondo un approccio essenziale: linee pulite, struttura solida, nessun elemento superfluo, proporzioni studiate per non competere con l'opera. Il display non deve rubare la scena, deve sostenerla.", en: "SLABSY follows an essential approach: clean lines, a solid structure, nothing superfluous, proportions designed never to compete with the artwork. The display shouldn't steal the scene, it should support it." })}</p>
        </Block>
      </section>
      <MaterialSection />
      <section data-testid="values-section" className="bg-[var(--paper)] py-24 text-[var(--ink)] lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <h2 className="font-display text-5xl font-black uppercase leading-[0.88] sm:text-8xl"><MaskLines lines={t({ it: ["La miglior soluzione", "per la tua collezione."], en: ["The best solution", "for your collection."] })} /></h2>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-[#0B1320]/15 bg-[#0B1320]/15 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.k} delay={i * 0.06} className="bg-[var(--paper)] p-8 transition-colors duration-500 hover:bg-[var(--paper-2)]" data-testid={`value-${v.k}`}>
                <span className="font-mono text-xs text-[#7a5d26]">0{i + 1}</span>
                <h3 className="font-display mt-8 text-3xl font-extrabold uppercase leading-none">{t(v.t)}</h3>
                <p className="mt-4 text-[#2a3445]">{t(v.d)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
