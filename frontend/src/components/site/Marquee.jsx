import { useT } from "@/lib/i18n";
import { MARQUEE } from "@/data/site";

export const Marquee = () => {
  const { t } = useT();
  const items = t(MARQUEE);
  const row = [...items, ...items];
  return (
    <section data-testid="editorial-marquee" aria-label="Slabsy" className="overflow-hidden border-y border-[var(--line)] bg-[var(--ink-2)] py-7">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className={`font-display px-8 text-4xl font-extrabold uppercase tracking-tight sm:text-6xl ${i % 2 ? "text-outline" : "text-[var(--paper)]"}`}>{w}</span>
                <span className="h-3 w-3 rotate-45 bg-[var(--gold)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
