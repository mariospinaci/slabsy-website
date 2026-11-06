import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useT } from "@/lib/i18n";
import { Reveal, MaskLines } from "@/components/site/Reveal";

const PRINCIPLES = {
  it: ["Linee pulite", "Struttura solida", "Nessun elemento superfluo", "Proporzioni che non competono con l'opera"],
  en: ["Clean lines", "Solid structure", "Nothing superfluous", "Proportions that never compete with the artwork"],
};

export const Philosophy = () => {
  const { t } = useT();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} data-testid="philosophy-section" className="relative bg-[var(--paper)] py-24 text-[var(--ink)] lg:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#7a5d26]">{t({ it: "Design e filosofia", en: "Design & philosophy" })}</p>
        <h2 className="font-display mt-6 text-[3.4rem] font-black uppercase leading-[0.86] sm:text-8xl lg:text-[9rem]">
          <MaskLines lines={t({ it: ["Sottrarre,", "non aggiungere."], en: ["Subtract,", "don't add."] })} />
        </h2>
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-[28px] border-[10px] border-white/60 shadow-[0_40px_80px_-40px_rgba(11,19,32,0.6)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.img src="/img/env-shelf.webp" alt="Collezione di slab su espositori Slabsy" style={{ y, scale: 1.2 }} className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
            <p className="mt-3 font-mono text-xs text-[#4a5568]">{t({ it: "Visualizzazione d'ambiente", en: "Environment visualization" })}</p>
          </Reveal>
          <div className="lg:col-span-5">
            <Reveal>
              <blockquote className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
                “{t({ it: "Il display non deve rubare la scena, deve sostenerla.", en: "The display shouldn't steal the scene, it should support it." })}”
              </blockquote>
              <p className="mt-6 text-lg leading-relaxed text-[#2a3445]">{t({ it: "Ogni linea è stata studiata per creare equilibrio. Ogni proporzione per garantire stabilità. Ogni scelta estetica per mantenere coerenza e pulizia visiva.", en: "Every line was studied to create balance. Every proportion to ensure stability. Every aesthetic choice to keep coherence and visual clarity." })}</p>
            </Reveal>
            <ul className="mt-10">
              {t(PRINCIPLES).map((pr, i) => (
                <Reveal as="li" key={pr} delay={i * 0.06} className="flex items-baseline gap-5 border-t border-[#0B1320]/15 py-4">
                  <span className="font-mono text-xs text-[#7a5d26]">0{i + 1}</span>
                  <span className="font-display text-2xl font-bold uppercase">{pr}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
