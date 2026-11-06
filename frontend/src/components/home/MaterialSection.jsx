import { Printer } from "lucide-react";
import { useT } from "@/lib/i18n";
import { MATERIAL } from "@/data/copy";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { SlabFrame } from "@/components/site/SlabFrame";

export const MaterialSection = () => {
  const { t } = useT();
  return (
    <section data-testid="material-section" className="border-t border-[var(--line)] bg-[var(--ink-2)] py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <p className="overline flex items-center gap-3"><Printer size={14} />{t(MATERIAL.over)}</p>
          <h2 className="font-display mt-5 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl"><MaskLines lines={t(MATERIAL.title)} /></h2>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-[#c9cfd9]">{t(MATERIAL.intro)}</p>
            <div className="mt-10">
              <SlabFrame src="/img/wall-v2-4.webp" alt="Slabsy Wall V.2 in PLA nero" label="PLA · 3D PRINT" accent="#C9A45C" sub={t({ it: "NERO", en: "BLACK" })} ratio="aspect-[16/10]" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
            {MATERIAL.pros.map((pr, i) => (
              <Reveal key={i} delay={i * 0.06} className="bg-[var(--ink-2)] p-7 transition-colors duration-500 hover:bg-[var(--ink-3)]" data-testid={`material-pro-${i}`}>
                <span className="font-mono text-xs text-[var(--gold)]">0{i + 1}</span>
                <h3 className="font-display mt-6 text-2xl font-extrabold uppercase leading-none sm:text-3xl">{t(pr.t)}</h3>
                <p className="mt-3 text-[#c9cfd9]">{t(pr.d)}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">{t(MATERIAL.care)}</p>
        </div>
      </div>
    </section>
  );
};
