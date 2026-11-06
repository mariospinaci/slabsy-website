import { useT } from "@/lib/i18n";
import { LABELS, LABEL_PRICE } from "@/data/labels";
import { DISCLAIMER } from "@/data/site";
import { formatPrice } from "@/data/products";
import { Reveal, MaskLines } from "@/components/site/Reveal";

const LabelCard = ({ l, i }) => (
  <Reveal delay={(i % 4) * 0.05} className="group" data-testid={`label-card-${l.code.toLowerCase()}`}>
    <div className="label-stage">
      <div className="label-holder">
        <img src={l.img} alt={`Slabsy label ${l.code} ${l.name}`} loading="lazy" className="block aspect-[6/1] w-full rounded-[3px] object-cover" />
      </div>
    </div>
    <p className="mt-4 font-mono text-xs tracking-[0.14em] text-[var(--gold)]">{l.code}</p>
    <p className="mt-1 font-medium">{l.name}</p>
  </Reveal>
);

export const LabelGallery = () => {
  const { t, lang } = useT();
  return (
    <section id="label" data-testid="label-gallery" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="overline">{t({ it: "Etichette · Listino Luglio 2026", en: "Labels · July 2026 price list" })}</p>
          <h2 className="font-display mt-4 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl"><MaskLines lines={t({ it: ["Le label", "Slabsy."], en: ["Slabsy", "labels."] })} /></h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-[#c9cfd9]">{t({ it: "16 label originali a tema per WALL V.2 e STAND V.2. Si inseriscono nell'alloggio label e si cambiano quando vuoi.", en: "16 original themed labels for WALL V.2 and STAND V.2. They slide into the label slot and can be swapped whenever you like." })}</p>
          <p className="mt-4 flex items-baseline gap-3" data-testid="label-price">
            <span className="font-display text-5xl font-black text-[var(--gold)]">{formatPrice(LABEL_PRICE, lang)}</span>
            <span className="text-sm text-[var(--muted)]">{t({ it: "a label · IVA inclusa", en: "per label · VAT included" })}</span>
          </p>
        </div>
      </div>
      <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {LABELS.map((l, i) => <LabelCard key={l.code} l={l} i={i} />)}
      </div>
      <p className="mt-12 max-w-4xl text-xs leading-relaxed text-[var(--muted)]" data-testid="label-disclaimer">{t(DISCLAIMER)}</p>
    </section>
  );
};
