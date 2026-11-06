import { useState } from "react";
import { useT } from "@/lib/i18n";
import { LABELS } from "@/data/labels";
import { Reveal, MaskLines } from "@/components/site/Reveal";

const Signature = () => (
  <svg viewBox="0 0 120 40" className="label-sig" aria-hidden>
    <path d="M4 30 C 14 6, 24 6, 22 26 S 40 34, 46 14 S 58 4, 60 24 S 76 34, 84 12 S 100 10, 116 22" fill="none" stroke="#1d2a44" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const LabelStrip = ({ id, text }) => (
  <div className={`label-strip label-${id}`} data-testid={`label-strip-${id}`}>
    {id === "sketch" ? (
      <>
        <span className="label-small">SKETCH · SIGNED BY</span>
        <Signature />
      </>
    ) : (
      <>
        <span className="label-small">{id === "golden" ? "VOL. 1" : "No. 01"}</span>
        <span className="label-title">{text || "SLABSY"}</span>
      </>
    )}
  </div>
);

export const LabelGallery = () => {
  const { t } = useT();
  const [text, setText] = useState("");
  return (
    <section id="label" data-testid="label-gallery" className="scroll-mt-28 mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <p className="overline">{t({ it: "Galleria label", en: "Label gallery" })}</p>
          <h2 className="font-display mt-5 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
            <MaskLines lines={t({ it: ["Una label,", "mille stili."], en: ["One label,", "endless styles."] })} />
          </h2>
          <p className="mt-6 max-w-xl text-[#c9cfd9]">{t({ it: "Per WALL V.2 e STAND V.2: label originali e personalizzate che richiamano lo stile, i colori e i personaggi che ami, o bianche da far firmare al tuo artista.", en: "For WALL V.2 and STAND V.2: original and custom labels echoing the style, colors and characters you love, or blank ones for your artist to sign." })}</p>
        </div>
        <label className="w-full max-w-sm">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">{t({ it: "Prova il tuo testo", en: "Try your text" })}</span>
          <input data-testid="label-text-input" value={text} maxLength={22} onChange={(e) => setText(e.target.value.toUpperCase())} placeholder="AMAZING #1" className="mt-3 w-full rounded-2xl border border-[var(--line)] bg-[var(--ink-2)] px-5 py-4 font-mono outline-none transition-[border-color] duration-300 focus:border-[var(--gold)]" />
        </label>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LABELS.map((l, i) => (
          <Reveal key={l.id} delay={(i % 3) * 0.07} className="group rounded-3xl border border-[var(--line)] bg-[var(--ink-2)] p-5 transition-[border-color] duration-500 hover:border-[rgba(201,164,92,0.5)]" data-testid={`label-card-${l.id}`}>
            <div className="label-stage">
              <div className="label-holder"><LabelStrip id={l.id} text={text} /></div>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-extrabold uppercase">{l.name}</h3>
              <span className="font-mono text-xs text-[var(--gold)]">0{i + 1}</span>
            </div>
            <p className="mt-2 text-sm text-[#c9cfd9]">{t(l.d)}</p>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 font-mono text-xs text-[var(--muted)]">{t({ it: "Esempi di stile. Ogni label viene realizzata su richiesta.", en: "Style examples. Every label is made on request." })}</p>
    </section>
  );
};
