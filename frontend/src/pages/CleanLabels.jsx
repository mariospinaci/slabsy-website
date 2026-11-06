import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { CLEAN } from "@/data/clean";
import { formatPrice } from "@/data/products";
import { SEO } from "@/data/seo";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, MaskLines } from "@/components/site/Reveal";
import { SlabFrame } from "@/components/site/SlabFrame";
import { FinalCta } from "@/components/site/FinalCta";

const IMG_NOTE = { it: "Immagini illustrative", en: "Illustrative images" };

const What = () => {
  const { t, p, lang } = useT();
  return (
    <section data-testid="clean-what" className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
      <Reveal className="lg:col-span-7">
        <SlabFrame src="/img/clean-artist.webp" alt={t({ it: "Artista che personalizza una label clean Slabsy", en: "Artist customizing a Slabsy clean label" })} label="LABEL CLEAN" sub="SKETCH" accent="#EFE9DD" ratio="aspect-[3/2]" testid="clean-hero-image" />
      </Reveal>
      <div className="lg:col-span-5">
        <p className="overline">{t(CLEAN.what.h)}</p>
        <h2 className="font-display mt-4 text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl"><MaskLines lines={t({ it: ["La firma", "la mette", "l'artista."], en: ["The artist", "adds the", "signature."] })} /></h2>
        <Reveal className="mt-8" delay={0.1}>
          <p className="text-lg leading-relaxed text-[#c9cfd9]">{t(CLEAN.what.p)}</p>
          <p className="mt-6 flex items-baseline gap-3" data-testid="clean-price">
            <span className="font-display text-5xl font-black text-[var(--gold)]">{formatPrice(CLEAN.price, lang)}</span>
            <span className="text-sm text-[var(--muted)]">{t({ it: "a label clean · IVA inclusa", en: "per clean label · VAT included" })}</span>
          </p>
          <Link to={p("products")} data-testid="clean-models-link" className="btn-ghost mt-8 inline-flex rounded-full px-6 py-3.5 font-semibold">{t({ it: "Vedi i modelli V.2", en: "See the V.2 models" })}</Link>
        </Reveal>
      </div>
    </section>
  );
};

const Steps = () => {
  const { t } = useT();
  return (
    <section data-testid="clean-steps" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl"><MaskLines lines={t({ it: ["Come", "funziona."], en: ["How it", "works."] })} /></h2>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
        {CLEAN.steps.map((s, i) => (
          <Reveal as="li" key={i} delay={i * 0.07} className="bg-[var(--ink-2)] p-8" data-testid={`clean-step-${i + 1}`}>
            <span className="font-display text-6xl font-black text-[var(--gold)]">0{i + 1}</span>
            <h3 className="font-display mt-6 text-2xl font-extrabold uppercase leading-none">{t(s.t)}</h3>
            <p className="mt-3 text-[#c9cfd9]">{t(s.d)}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
};

const Gallery = () => {
  const { t } = useT();
  return (
    <section data-testid="clean-gallery" className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
      <div className="grid gap-4 md:grid-cols-12">
        <Reveal className="md:col-span-7"><SlabFrame src="/img/clean-signature-label-r.webp" alt={t({ it: "Mano che firma una label clean su un tavolo", en: "Hand signing a clean label on a table" })} label={t({ it: "FIRMA", en: "SIGNATURE" })} sub="01" accent="#C9A45C" ratio="aspect-[3/2]" testid="clean-gallery-signature" /></Reveal>
        <Reveal className="md:col-span-5" delay={0.1}><SlabFrame src="/img/clean-finished.webp" alt={t({ it: "Label clean sketchata inserita in Slabsy Stand V.2", en: "Sketched clean label in a Slabsy Stand V.2" })} label={t({ it: "RISULTATO", en: "RESULT" })} sub="02" accent="#EFE9DD" ratio="aspect-[3/2] md:aspect-[20/19]" testid="clean-gallery-finished" /></Reveal>
      </div>
      <p className="mt-4 font-mono text-xs text-[var(--muted)]">{t(IMG_NOTE)}</p>
    </section>
  );
};

const Why = () => {
  const { t } = useT();
  return (
    <section data-testid="clean-why" className="bg-[var(--paper)] py-24 text-[var(--ink)] lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-5xl font-black uppercase leading-[0.88] sm:text-8xl"><MaskLines lines={t({ it: ["Perché una", "label clean."], en: ["Why a", "clean label."] })} /></h2>
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-[#0B1320]/15 bg-[#0B1320]/15 md:grid-cols-3">
          {CLEAN.why.map((w, i) => (
            <Reveal key={i} delay={i * 0.06} className="bg-[var(--paper)] p-8" data-testid={`clean-why-${i + 1}`}>
              <span className="font-mono text-xs text-[#7a5d26]">0{i + 1}</span>
              <h3 className="font-display mt-8 text-3xl font-extrabold uppercase leading-none">{t(w.t)}</h3>
              <p className="mt-4 text-[#2a3445]">{t(w.d)}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-[#2a3445]">{t(CLEAN.tip)}</p>
      </div>
    </section>
  );
};

export default function CleanLabels() {
  const { t } = useT();
  return (
    <>
      <Seo title={t(SEO.clean.title)} description={t(SEO.clean.desc)} image="/img/clean-artist.webp" />
      <PageHero testid="clean-hero" over={t(CLEAN.over)} lines={t(CLEAN.lines)} intro={t(CLEAN.intro)} />
      <What />
      <Steps />
      <Gallery />
      <Why />
      <FinalCta />
    </>
  );
}
