import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useT } from "@/lib/i18n";
import { LABELS, LABEL_PRICE } from "@/data/labels";
import { DISCLAIMER } from "@/data/site";
import { formatPrice } from "@/data/products";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { EtsyButton } from "@/components/site/EtsyButton";

const CLEAN_OPTION = { code: "CLEAN", name: { it: "Label clean (bianca, da far firmare)", en: "Clean label (blank, for signing)" }, img: null };
const OPTIONS = [...LABELS, CLEAN_OPTION];
// Label slot position inside stand-v2-label-preview.webp (percent)
const SLOT = { left: "22.1%", width: "53.5%", top: "78.9%", height: "11.4%" };

const Preview = ({ opt, t, view }) => (
  <div className="slab-frame" data-testid="label-preview">
    <div className="slab-label" style={{ "--accent": "#C9A45C" }}>
      <span>{view === "3d" ? "LABEL · 3D" : "STAND V.2"}</span>
      <span>{opt.code}</span>
    </div>
    {view === "3d" ? <div className="slab-window"><Relief3D opt={opt} t={t} /></div> : <div className="slab-window relative">
      <img src="/img/stand-v2-label-preview.webp" alt={t({ it: "Slabsy Stand V.2 nero con label", en: "Black Slabsy Stand V.2 with label" })} className="block w-full" />
      <div className="absolute overflow-hidden rounded-[2px] bg-[#f6f5f1]" style={SLOT}>
        <AnimatePresence initial={false}>
          <motion.div key={opt.code} className="absolute inset-0" initial={{ y: "-105%" }} animate={{ y: "0%" }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            {opt.img ? (
              <img src={opt.img} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[#f6f5f1] font-mono text-[clamp(7px,1.1vw,12px)] tracking-[0.3em] text-[#9aa0aa]">SLABSY · CLEAN</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>}
  </div>
);

const LAYERS = [0, 1.5, 3, 4.5, 6, 7.5, 9];

const Label3D = ({ opt, t }) => {
  const rx = useSpring(useMotionValue(56), { stiffness: 90, damping: 16 });
  const rz = useSpring(useMotionValue(-20), { stiffness: 90, damping: 16 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(40 + ((e.clientY - r.top) / r.height) * 30);
    rz.set(-34 + ((e.clientX - r.left) / r.width) * 28);
  };
  const face = opt.img ? <img src={opt.img} alt="" className="h-full w-full object-cover" draggable="false" /> : <div className="h-full w-full bg-[#f2f1ec]" />;
  return (
    <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#c9c9c9,#8e8e8e_75%)] [perspective:1100px]" onPointerMove={onMove} onPointerLeave={() => { rx.set(56); rz.set(-20); }} data-testid="label-3d-view">
      <motion.div className="relative aspect-[6/1] w-[78%] [transform-style:preserve-3d]" style={{ rotateX: rx, rotateZ: rz }}>
        {LAYERS.map((z) => <div key={z} className="absolute inset-0 rounded-[3px] bg-[#141416]" style={{ transform: `translateZ(${z}px)` }} />)}
        <div className="absolute inset-[3px] overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.4)]" style={{ transform: "translateZ(11px)" }}>{face}</div>
      </motion.div>
      <p className="absolute bottom-3 left-4 font-mono text-[11px] tracking-[0.12em] text-[#1b1b1d]">{t({ it: "Vista 3D illustrativa · muovi per ruotare", en: "Illustrative 3D view · move to rotate" })}</p>
    </div>
  );
};

const Relief3D = ({ opt, t }) => opt.relief ? (
  <div className="relative aspect-[16/10]" data-testid="label-3d-render">
    <img src={opt.relief} alt={`Slabsy label ${opt.code} – 3D`} className="h-full w-full object-cover" />
    <p className="absolute bottom-3 left-4 font-mono text-[11px] tracking-[0.12em] text-[#1b1b1d]">{t({ it: "Render 3D reale", en: "Real 3D render" })}</p>
  </div>
) : <Label3D opt={opt} t={t} />;

const ViewToggle = ({ view, setView, t }) => (
  <div className="mb-4 inline-flex rounded-full border border-[var(--line)] p-1" data-testid="label-view-toggle">
    {[["stand", { it: "Sullo stand", en: "On the stand" }], ["3d", { it: "Rilievo 3D", en: "3D relief" }]].map(([k, l]) => (
      <button key={k} type="button" onClick={() => setView(k)} data-testid={`label-view-${k}`} className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-[background-color,color] duration-300 ${view === k ? "bg-[var(--paper)] text-[var(--ink)]" : "text-[var(--paper)]/75 hover:text-[var(--paper)]"}`}>{t(l)}</button>
    ))}
  </div>
);

const Option = ({ opt, active, onPick, t }) => (
  <button type="button" onClick={onPick} data-testid={`label-option-${opt.code.toLowerCase()}`} aria-pressed={active}
    className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-[border-color,background-color] duration-300 ${active ? "border-[var(--gold)] bg-[var(--ink-3)]" : "border-[var(--line)] hover:border-[var(--paper)]/40"}`}>
    <span className="block aspect-[6/1] w-28 shrink-0 overflow-hidden rounded-[3px] border border-white/10 bg-[#f6f5f1] sm:w-36">
      {opt.img && <img src={opt.img} alt={`Slabsy label ${opt.code} ${opt.name}`} loading="lazy" className="h-full w-full object-cover" />}
    </span>
    <span className="min-w-0">
      <span className="block font-mono text-[11px] tracking-[0.14em] text-[var(--gold)]">{opt.img ? opt.code : "CLEAN"}</span>
      <span className="block truncate text-sm font-medium">{typeof opt.name === "string" ? opt.name : t(opt.name)}</span>
    </span>
  </button>
);

const RELIEF = [
  { it: "Strati sovrapposti in rilievo: il disegno esce dalla base.", en: "Stacked raised layers: the design rises from the base." },
  { it: "Spessori reali che catturano luci e ombre e danno profondità.", en: "Real thickness that catches light and shadow for depth." },
  { it: "Stampate in 3D in PLA, come gli espositori Slabsy.", en: "3D printed in PLA, just like Slabsy displays." },
];

const Relief = ({ t }) => (
  <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-12" data-testid="label-relief">
    <Reveal className="min-w-0 lg:col-span-7">
      <div className="slab-frame">
        <div className="slab-label" style={{ "--accent": "#EFE9DD" }}><span>LABEL · 3D</span><span>LB-006</span></div>
        <div className="slab-window aspect-[16/10]">
          <img src="/img/labels/relief-3d.webp" alt={t({ it: "Dettaglio in rilievo 3D della label Slabsy LB-006 Weapon X", en: "3D relief detail of Slabsy label LB-006 Weapon X" })} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    </Reveal>
    <div className="min-w-0 lg:col-span-5">
      <p className="overline">{t({ it: "Label in rilievo", en: "Relief labels" })}</p>
      <h3 className="font-display mt-4 text-4xl font-extrabold uppercase leading-[0.9] sm:text-6xl"><MaskLines lines={t({ it: ["Non sono piatte.", "Sono in 3D."], en: ["Not flat.", "Fully 3D."] })} /></h3>
      <ul className="mt-8">
        {RELIEF.map((r, i) => <li key={i} className="border-b border-[var(--line)] py-3 text-[#c9cfd9]">— {t(r)}</li>)}
      </ul>
    </div>
  </div>
);

export const LabelGallery = () => {
  const { t, lang } = useT();
  const [sel, setSel] = useState(0);
  const [view, setView] = useState("stand");
  const opt = OPTIONS[sel];
  const pick = (i) => {
    setSel(i);
    const el = document.getElementById("label-preview-anchor");
    if (el && window.innerWidth < 1024) window.__lenis ? window.__lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="label" data-testid="label-gallery" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="overline">{t({ it: "Etichette · Listino Luglio 2026", en: "Labels · July 2026 price list" })}</p>
          <h2 className="font-display mt-4 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl"><MaskLines lines={t({ it: ["Scegli la", "tua label."], en: ["Pick your", "label."] })} /></h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-[#c9cfd9]">{t({ it: "16 label originali a tema, in rilievo 3D, e la label clean per WALL V.2 e STAND V.2. Selezionane una e guardala sullo Stand V.2 nero.", en: "16 original themed 3D relief labels plus the clean label for WALL V.2 and STAND V.2. Pick one and see it on the black Stand V.2." })}</p>
          <p className="mt-4 flex items-baseline gap-3" data-testid="label-price">
            <span className="font-display text-5xl font-black text-[var(--gold)]">{formatPrice(LABEL_PRICE, lang)}</span>
            <span className="text-sm text-[var(--muted)]">{t({ it: "a label · IVA inclusa", en: "per label · VAT included" })}</span>
          </p>
        </div>
      </div>
      <Relief t={t} />
      <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div id="label-preview-anchor" className="min-w-0 lg:col-span-7">
          <div className="lg:sticky lg:top-28">
            <ViewToggle view={view} setView={setView} t={t} />
            <Preview opt={opt} t={t} view={view} />
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.14em] text-[var(--gold)]" data-testid="label-selected-code">{opt.img ? opt.code : "CLEAN"}</p>
                <p className="font-display mt-1 text-3xl font-extrabold uppercase leading-none" data-testid="label-selected-name">{typeof opt.name === "string" ? opt.name : t(opt.name)}</p>
              </div>
              <EtsyButton testid="label-etsy-button" />
            </div>
          </div>
        </div>
        <Reveal className="min-w-0 lg:col-span-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1" data-testid="label-options">
            {OPTIONS.map((o, i) => <Option key={o.code} opt={o} active={i === sel} onPick={() => pick(i)} t={t} />)}
          </div>
        </Reveal>
      </div>
      <p className="mt-12 max-w-4xl text-xs leading-relaxed text-[var(--muted)]" data-testid="label-disclaimer">{t(DISCLAIMER)}</p>
    </section>
  );
};
