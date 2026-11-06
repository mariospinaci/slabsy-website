import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { MaskLines, Reveal } from "@/components/site/Reveal";
import { EtsyButton } from "@/components/site/EtsyButton";

export const FinalCta = () => {
  const { t, p } = useT();
  return (
    <section data-testid="final-cta" className="relative overflow-hidden py-28 lg:py-40">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,164,92,0.22),transparent)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="overline">{t({ it: "La tua collezione", en: "Your collection" })}</p>
        <h2 className="font-display mt-6 text-[3.2rem] font-black uppercase leading-[0.86] sm:text-8xl lg:text-[8rem]">
          <MaskLines lines={t({ it: ["Dai nuova", "visibilità", "alla tua collezione."], en: ["Give your", "collection", "a new stage."] })} lineClass={(i) => (i === 1 ? "text-outline" : "")} />
        </h2>
        <Reveal className="mt-12 flex flex-wrap items-center gap-4" delay={0.2}>
          <EtsyButton testid="cta-etsy-button" />
          <Link to={p("contact")} data-testid="cta-contact-link" className="btn-ghost rounded-full px-6 py-3.5 font-semibold">{t({ it: "Scrivici", en: "Contact us" })}</Link>
        </Reveal>
      </div>
    </section>
  );
};
