import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PRODUCTS, formatPrice } from "@/data/products";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { SlabFrame } from "@/components/site/SlabFrame";

const TYPE = { wall: { it: "A parete", en: "Wall-mounted" }, stand: { it: "Da appoggio", en: "Tabletop" } };

const ViewCycler = ({ m, hover }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!hover) { setIdx(0); return undefined; }
    setIdx(1);
    const id = setInterval(() => setIdx((n) => (n + 1) % m.gallery.length), 1100);
    return () => clearInterval(id);
  }, [hover, m.gallery.length]);
  return (
    <>
      {m.gallery.map((src, n) => (
        <img key={src} src={src} alt={n === 0 ? `${m.name} – Slabsy` : ""} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${idx === n ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`} />
      ))}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" data-testid={`model-card-${m.id}-dots`}>
        {m.gallery.map((src, n) => <span key={src} className={`h-1.5 rounded-full bg-[#0B1320] transition-[width,opacity] duration-500 ${idx === n ? "w-6 opacity-90" : "w-1.5 opacity-40"}`} />)}
      </div>
    </>
  );
};

export const ModelCard = ({ m, i }) => {
  const { t, p, lang } = useT();
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={(i % 2) * 0.12} className={i % 2 ? "md:translate-y-20" : ""}>
      <Link to={`${p("products")}#${m.id}`} data-testid={`model-card-${m.id}`} className="group block" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <SlabFrame label={m.name} sub={formatPrice(m.price, lang)} accent={m.accent}>
          <ViewCycler m={m} hover={hover} />
        </SlabFrame>
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
          <p className="max-w-md text-[#c9cfd9]">{t({ it: "WALL per la parete, STAND per l'appoggio. Versione V.1 essenziale o V.2 con alloggio per label removibile.", en: "WALL for the wall, STAND for the tabletop. Essential V.1 or V.2 with a slot for a removable label." })}</p>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-14 pb-20 md:grid-cols-2">
          {PRODUCTS.map((m, i) => <ModelCard key={m.id} m={m} i={i} />)}
        </div>
      </div>
    </section>
  );
};
