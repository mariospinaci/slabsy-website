import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { NAV } from "@/data/site";
import { LangSwitch } from "@/components/site/LangSwitch";
import { EtsyButton } from "@/components/site/EtsyButton";

export const Header = () => {
  const { t, p } = useT();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header data-testid="site-header" className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${scrolled || open ? "border-b border-[var(--line)] bg-[#0B1320]/85 py-3 backdrop-blur-xl" : "border-b border-transparent bg-[#0B1320]/40 py-5 backdrop-blur-md"}`}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link to={p("home")} data-testid="header-logo-link" className="shrink-0" aria-label="Slabsy home">
          <img src="/img/logo-light.png" alt="Slabsy" className="h-8 w-auto transition-transform duration-500 hover:-rotate-3 sm:h-9" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <NavLink key={n.key} to={p(n.key)} data-testid={`nav-${n.key}`} className={({ isActive }) => `link-under text-sm font-medium tracking-wide ${isActive ? "text-[var(--gold-2)]" : "text-[var(--paper)]/85 hover:text-[var(--paper)]"}`}>
              {t(n.label)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <div className="hidden sm:block"><EtsyButton size="sm" testid="header-etsy-button" /></div>
          <button data-testid="mobile-menu-toggle" onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] lg:hidden" aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav data-testid="mobile-menu" initial={{ height: 0 }} animate={{ height: "calc(100svh - 64px)" }} exit={{ height: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden lg:hidden">
            <div className="flex flex-col gap-1 px-5 pb-8 pt-6">
              {NAV.map((n, i) => (
                <motion.div key={n.key} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 + i * 0.05 }}>
                  <Link to={p(n.key)} data-testid={`mobile-nav-${n.key}`} className="font-display block py-2 text-4xl font-extrabold uppercase tracking-tight">{t(n.label)}</Link>
                </motion.div>
              ))}
              <div className="mt-4"><EtsyButton testid="mobile-etsy-button" /></div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
