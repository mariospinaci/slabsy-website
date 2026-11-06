import { PenTool, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { ShimSimulator } from "@/components/home/ShimSimulator";

const Card = ({ className = "", children, testid, delay = 0 }) => (
  <Reveal delay={delay} className={`group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--ink-2)] p-6 transition-[border-color] duration-500 hover:border-[rgba(201,164,92,0.5)] sm:p-8 ${className}`} data-testid={testid}>
    {children}
  </Reveal>
);

export const FeatureBento = () => {
  const { t, p } = useT();
  return (
    <section data-testid="features-bento" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="max-w-3xl">
        <p className="overline">{t({ it: "Il vero punto di forza", en: "The real strength" })}</p>
        <h2 className="font-display mt-5 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
          <MaskLines lines={t({ it: ["Un solo supporto,", "tante possibilità."], en: ["One display,", "many possibilities."] })} />
        </h2>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(250px,auto)]">
        <Card className="md:col-span-4 md:row-span-2" testid="bento-shims">
          <div className="grid h-full gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="overline">01 · {t({ it: "Spessori intercambiabili", en: "Interchangeable shims" })}</p>
              <h3 className="font-display mt-4 text-4xl font-extrabold uppercase leading-none">{t({ it: "Si adatta alla tua slab", en: "Adapts to your slab" })}</h3>
              <p className="mt-4 text-[#c9cfd9]">{t({ it: "Le basi Slabsy vengono fornite con spessori intercambiabili, per slab di fumetti spillati e brossurati fino a 30 mm. Stabile, versatile, elegante.", en: "Slabsy bases ship with interchangeable shims, for slabs of staple-bound and perfect-bound comics up to 30 mm. Stable, versatile, elegant." })}</p>
            </div>
            <div className="lg:col-span-3"><ShimSimulator /></div>
          </div>
        </Card>
        <Card className="min-h-[420px] p-0 sm:p-0 md:col-span-2 md:row-span-2" testid="bento-labels" delay={0.1}>
          <img src="/img/env-hand.webp" alt="Inserimento di una slab in Slabsy Stand V.2" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="overline">02 · Label</p>
            <h3 className="font-display mt-3 text-3xl font-extrabold uppercase leading-none">{t({ it: "Label originali e personalizzate", en: "Original and custom labels" })}</h3>
            <p className="mt-3 text-sm text-[#d6dbe3]">{t({ it: "Stile, colori e personaggi che ami. Facili da inserire, belle da collezionare.", en: "The style, colors and characters you love. Easy to insert, beautiful to collect." })}</p>
            <Link to={`${p("products")}#label`} data-testid="bento-labels-gallery-link" className="link-under mt-4 inline-flex items-center gap-2 text-sm text-[var(--gold-2)]">{t({ it: "Vedi la galleria", en: "See the gallery" })}<ArrowUpRight size={14} /></Link>
          </div>
        </Card>
        <Card className="md:col-span-3" testid="bento-sketch" delay={0.05}>
          <PenTool className="text-[var(--gold)]" size={28} strokeWidth={1.5} />
          <p className="overline mt-8">03 · Sketch label</p>
          <h3 className="font-display mt-3 text-3xl font-extrabold uppercase leading-none">{t({ it: "Firmata dal tuo artista", en: "Signed by your artist" })}</h3>
          <p className="mt-3 text-[#c9cfd9]">{t({ it: "Label pensate per essere firmate o sketchate direttamente dal tuo artista preferito. La slab diventa un pezzo unico.", en: "Labels made to be signed or sketched directly by your favourite artist. The slab becomes one of a kind." })}</p>
        </Card>
        <Card className="md:col-span-3" testid="bento-compat" delay={0.1}>
          <ShieldCheck className="text-[var(--gold)]" size={28} strokeWidth={1.5} />
          <p className="overline mt-8">04 · {t({ it: "Compatibilità", en: "Compatibility" })}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {["CGC", "CBCS", "ECG", "+"].map((s) => <span key={s} className="font-display rounded-full border border-[var(--line)] px-5 py-1.5 text-2xl font-extrabold">{s}</span>)}
          </div>
          <p className="mt-4 text-[#c9cfd9]">{t({ it: "Compatibile con diversi formati di slab certificati per fumetti \"modern\".", en: "Compatible with several certified slab formats for \"modern\" comics." })}</p>
        </Card>
      </div>
    </section>
  );
};
