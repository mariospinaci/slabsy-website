import { Link, useLocation } from "react-router-dom";
import { altPath, langFromPath } from "@/lib/i18n";

export const LangSwitch = () => {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  return (
    <div data-testid="language-switcher" className="flex items-center rounded-full border border-[var(--line)] p-1 font-mono text-xs">
      {["it", "en"].map((l) => (
        <Link key={l} to={altPath(pathname, l)} data-testid={`language-switcher-${l}`} aria-current={lang === l} className={`rounded-full px-3 py-1.5 uppercase transition-colors duration-300 ${lang === l ? "bg-[var(--paper)] text-[var(--ink)]" : "text-[var(--paper)]/75 hover:text-[var(--paper)]"}`}>
          {l}
        </Link>
      ))}
    </div>
  );
};
