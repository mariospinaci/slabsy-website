import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PRODUCTS, formatPrice } from "@/data/products";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { SlabFrame } from "@/components/site/SlabFrame";

const TYPE = { wall: { it: "A parete", en: "Wall-mounted" }, stand: { it: "Da appoggio", en: "Tabletop" } };

export const ModelCard = ({ m, i }) => {
  const { t, p, lang } = useT();
  return (
    <Reveal delay={(i % 2) * 0.12} className={i % 2 ? "md:translate-y-20" : ""}>
      <Link to={`${p("products")}#${m.id}`} data-testid={`model-card-${m.id}`} className="group block">
        <SlabFrame src={m.img} alt={`${m.name} – Slabsy`} label={m.name} sub={formatPrice(m.price, lang)} accent={m.accent} />
        <div className="mt-6 flex items-start justify-between gap-6 px-1">
          <div>
            <p className="overline">{t(TYPE[m.type])}{m.label ? ` · ${t({ it: "con label", en: "with label" })}` : ""}</p>
            <p className="mt-3 max-w-sm text-[#c9cfd9]">{t(m.short)}</p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--line)] transition-[background-color,color,transform] duration-500 group-hover:rotate-45 group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)]">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
};

export const ModelsGrid = () => {
  const { t } = useT();
  return (
    <section data-testid="models-section" className="relative bg-[var(--ink-2)] py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="overline">{t({ it: "La collezione", en: "The collection" })}</p>
            <h2 className="font-display mt-5 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
              <MaskLines lines={t({ it: ["Quattro modelli.", "Un solo principio."], en: ["Four models.", "One principle."] })} />
            </h2>
          </div>
          <p className="max-w-md text-[#c9cfd9]">{t({ it: "WALL per la parete, STAND per l'appoggio. Versione V.1 essenziale o V.2 con alloggio per label removibile e personalizzabile.", en: "WALL for the wall, STAND for the tabletop. Essential V.1 or V.2 with a slot for a removable, customizable label." })}</p>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-14 pb-20 md:grid-cols-2">
          {PRODUCTS.map((m, i) => <ModelCard key={m.id} m={m} i={i} />)}
        </div>
      </div>
    </section>
  );
};
