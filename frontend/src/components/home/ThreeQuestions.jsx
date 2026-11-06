import { useT } from "@/lib/i18n";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { SlabFrame } from "@/components/site/SlabFrame";
import { QA } from "@/data/copy";

export const ThreeQuestions = () => {
  const { t } = useT();
  return (
    <section data-testid="three-questions-section" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="overline">{t({ it: "Il prodotto", en: "The product" })}</p>
            <h2 className="font-display mt-5 text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl">
              <MaskLines lines={t({ it: ["Tre domande.", "Tre risposte."], en: ["Three questions.", "Three answers."] })} />
            </h2>
            <Reveal className="mt-10" delay={0.1}>
              <SlabFrame src="/img/env-desk.webp" alt="Slabsy Stand V.2 su una scrivania" label="SLABSY · STAND V.2" sub="DESK" accent="#EFE9DD" ratio="aspect-[5/4]" />
            </Reveal>
          </div>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7">
          {QA.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 0.05} className="group border-t border-[var(--line)] py-10 first:border-t-0 first:pt-0 lg:py-14">
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-sm text-[var(--gold)]">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl font-extrabold uppercase leading-none transition-colors duration-300 group-hover:text-[var(--gold-2)] sm:text-4xl">{t(item.q)}</h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-[#c9cfd9] sm:text-lg">{t(item.a)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
