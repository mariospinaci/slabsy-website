import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { NAV, DISCLAIMER, EMAIL, PHONE, PHONE_HREF } from "@/data/site";

export const Footer = () => {
  const { t, p } = useT();
  return (
    <footer data-testid="site-footer" className="relative border-t border-[var(--line)] bg-[#080e18]">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src="/img/logo-light.png" alt="Slabsy" className="h-16 w-auto" />
            <p className="font-display mt-8 max-w-sm text-3xl font-extrabold uppercase leading-none">
              {t({ it: "Sottrarre, non aggiungere.", en: "Subtract, don't add." })}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:grid-cols-3">
            <div>
              <p className="overline mb-5">{t({ it: "Esplora", en: "Explore" })}</p>
              <ul className="space-y-3 text-sm">
                {NAV.map((n) => <li key={n.key}><Link to={p(n.key)} data-testid={`footer-nav-${n.key}`} className="link-under text-[var(--paper)]/85">{t(n.label)}</Link></li>)}
              </ul>
            </div>
            <div>
              <p className="overline mb-5">{t({ it: "Contatti", en: "Contact" })}</p>
              <ul className="space-y-3 text-sm">
                <li><a href={`mailto:${EMAIL}`} data-testid="footer-email" className="link-under">{EMAIL}</a></li>
                <li><a href={PHONE_HREF} data-testid="footer-phone" className="link-under">{PHONE}</a></li>
                <li className="text-[var(--muted)]">www.slabsy.it</li>
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <p className="overline mb-5">Social</p>
              <p className="text-sm text-[var(--muted)]">{t({ it: "Presto su Instagram, Facebook e YouTube.", en: "Soon on Instagram, Facebook and YouTube." })}</p>
            </div>
          </div>
        </div>
        <p className="mt-16 max-w-4xl text-xs leading-relaxed text-[var(--muted)]">{t(DISCLAIMER)}</p>
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-[var(--line)] pt-6 font-mono text-xs text-[var(--muted)] sm:flex-row">
          <span>© {new Date().getFullYear()} Slabsy</span>
          <span>{t({ it: "Compatibile con CGC · CBCS · ECG", en: "Compatible with CGC · CBCS · ECG" })}</span>
        </div>
      </div>
    </footer>
  );
};
