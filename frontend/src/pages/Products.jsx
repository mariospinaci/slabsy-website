import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, Minus, Ruler, Tag } from "lucide-react";
import { useT, SITE } from "@/lib/i18n";
import { PRODUCTS, formatPrice } from "@/data/products";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { SlabFrame } from "@/components/site/SlabFrame";
import { EtsyButton } from "@/components/site/EtsyButton";
import { ShimSimulator } from "@/components/home/ShimSimulator";
import { FinalCta } from "@/components/site/FinalCta";
import { LabelGallery } from "@/components/site/LabelGallery";
import { SEO } from "@/data/seo";

const TYPE = { wall: { it: "A parete", en: "Wall-mounted" }, stand: { it: "Da appoggio", en: "Tabletop" } };

const Spec = ({ k, v, ok }) => (
  <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] py-3 text-sm">
    <dt className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">{k}</dt>
    <dd className="flex items-center gap-2 text-right">{ok === true && <Check size={14} className="text-[var(--gold)]" />}{ok === false && <Minus size={14} className="text-[var(--muted)]" />}{v}</dd>
  </div>
);

const ProductRow = ({ m, i }) => {
  const { t, p, lang } = useT();
  const [active, setActive] = useState(0);
  return (
    <article id={m.id} data-testid={`product-${m.id}`} className="scroll-mt-28 border-t border-[var(--line)] py-16 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
          <SlabFrame src={m.gallery[active]} alt={`${m.name} vista ${active + 1}`} label={m.name} sub={`0${i + 1} / 04`} accent={m.accent} />
          <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
            {m.gallery.map((g, gi) => (
              <button key={g} onClick={() => setActive(gi)} data-testid={`product-${m.id}-thumb-${gi}`} className={`overflow-hidden rounded-xl border-2 transition-[border-color,opacity] duration-300 ${active === gi ? "border-[var(--gold)]" : "border-transparent opacity-60 hover:opacity-100"}`} aria-label={`${m.name} ${gi + 1}`}>
                <img src={g} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              </button>
            ))}
          </div>
        </Reveal>
        <div className="lg:col-span-5">
          <p className="overline">{t(TYPE[m.type])}</p>
          <h2 className="font-display mt-4 text-5xl font-black uppercase leading-[0.9] sm:text-6xl">{m.name}</h2>
          <p className="mt-5 flex items-baseline gap-3"><span data-testid={`product-${m.id}-price`} className="font-display text-4xl font-extrabold text-[var(--gold-2)]">{formatPrice(m.price, lang)}</span><span className="font-mono text-xs text-[var(--muted)]">{t({ it: "IVA incl.", en: "VAT incl." })}</span></p>
          <p className="mt-6 leading-relaxed text-[#c9cfd9]">{t(m.desc)}</p>
          <dl className="mt-8">
            <Spec k={t({ it: "Montaggio", en: "Mounting" })} v={t(TYPE[m.type])} />
            <Spec k={t({ it: "Alloggio label", en: "Label slot" })} v={m.label ? t({ it: "Sì, removibile", en: "Yes, removable" }) : t({ it: "No", en: "No" })} ok={m.label} />
            <Spec k={t({ it: "Label inclusa", en: "Label included" })} v={m.label ? "N°1" : "—"} ok={m.label} />
            <Spec k={t({ it: "Materiale", en: "Material" })} v={t({ it: "PLA · stampa 3D", en: "PLA · 3D printed" })} ok />
            <Spec k={t({ it: "Colore", en: "Color" })} v={t({ it: "Nero", en: "Black" })} />
            <Spec k={t({ it: "Spessori", en: "Shims" })} v={t({ it: "Intercambiabili, fino a 30 mm", en: "Interchangeable, up to 30 mm" })} ok />
            <Spec k={t({ it: "Compatibilità", en: "Compatibility" })} v="CGC · CBCS · ECG" ok />
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <EtsyButton testid={`product-${m.id}-etsy-button`} />
            <Link to={p("contact")} data-testid={`product-${m.id}-info-link`} className="btn-ghost rounded-full px-6 py-3.5 font-semibold">{t({ it: "Chiedi info", en: "Ask us" })}</Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const Extras = () => {
  const { t } = useT();
  return (
    <section data-testid="extras-section" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
        <MaskLines lines={t({ it: ["Spessori, label", "e servizi."], en: ["Shims, labels", "and services."] })} />
      </h2>
      <div className="mt-14 grid gap-4 md:grid-cols-6">
        <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--ink-2)] p-6 sm:p-8 md:col-span-4 md:row-span-2" data-testid="extras-shims">
          <p className="overline">{t({ it: "Spessori intercambiabili", en: "Interchangeable shims" })}</p>
          <p className="mt-4 max-w-lg text-[#c9cfd9]">{t({ it: "Ogni base viene fornita con spessori intercambiabili pensati per adattarsi a diverse tipologie di slab, per fumetti spillati e brossurati fino a 30 mm.", en: "Every base ships with interchangeable shims designed to fit different slab types, for staple-bound and perfect-bound comics up to 30 mm." })}</p>
          <div className="mt-8 max-w-xl"><ShimSimulator /></div>
        </Reveal>
        <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--ink-2)] p-6 sm:p-8 md:col-span-2" delay={0.08} data-testid="extras-labels">
          <Tag className="text-[var(--gold)]" size={26} strokeWidth={1.5} />
          <h3 className="font-display mt-6 text-3xl font-extrabold uppercase leading-none">{t({ it: "Label", en: "Labels" })}</h3>
          <p className="mt-3 text-sm text-[#c9cfd9]">{t({ it: "Label originali e personalizzate per i modelli V.2, e label da far firmare o sketchare al tuo artista preferito.", en: "Original and custom labels for V.2 models, and labels to have signed or sketched by your favourite artist." })}</p>
        </Reveal>
        <Reveal className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6 text-[var(--ink)] sm:p-8 md:col-span-2" delay={0.12} data-testid="extras-services">
          <Ruler size={26} strokeWidth={1.5} />
          <h3 className="font-display mt-6 text-3xl font-extrabold uppercase leading-none">{t({ it: "Servizi & optional", en: "Services & extras" })}</h3>
          <ul className="mt-3 space-y-1 text-sm text-[#2a3445]">
            <li>— {t({ it: "Realizzazione spessori per basi espositive", en: "Custom shims for display bases" })}</li>
            <li>— {t({ it: "Realizzazione etichette (label)", en: "Custom labels" })}</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default function Products() {
  const { t } = useT();
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    const id = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
      else if (el) el.scrollIntoView();
    }, 250);
    return () => clearTimeout(id);
  }, [hash]);
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRODUCTS.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Product", name: m.name, brand: { "@type": "Brand", name: "Slabsy" }, image: SITE + m.img, material: "PLA", color: t({ it: "Nero", en: "Black" }), description: t(m.desc), offers: { "@type": "Offer", price: m.price.toFixed(2), priceCurrency: "EUR" } },
    })),
  };
  return (
    <>
      <Seo title={t(SEO.products.title)} description={t(SEO.products.desc)} jsonLd={ld} />
      <PageHero testid="products-hero" over={t({ it: "Listino · Luglio 2026", en: "Price list · July 2026" })} lines={t({ it: ["I modelli", "Slabsy."], en: ["The Slabsy", "models."] })} intro={t({ it: "Due famiglie, due varianti. WALL per la parete, STAND per l'appoggio; V.1 essenziale, V.2 con alloggio label removibile e personalizzabile.", en: "Two families, two variants. WALL for the wall, STAND for tabletops; essential V.1, or V.2 with a removable, customizable label slot." })} />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {PRODUCTS.map((m, i) => <ProductRow key={m.id} m={m} i={i} />)}
      </div>
      <LabelGallery />
      <Extras />
      <FinalCta />
    </>
  );
}
