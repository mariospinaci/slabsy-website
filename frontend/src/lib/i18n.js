import { useLocation } from "react-router-dom";
import { GUIDES } from "@/data/guides";

export const SITE = "https://www.slabsy.it";

export const ROUTES = {
  home: { it: "/", en: "/en" },
  products: { it: "/prodotti", en: "/en/products" },
  about: { it: "/chi-siamo", en: "/en/about" },
  faq: { it: "/faq", en: "/en/faq" },
  guides: { it: "/guide", en: "/en/guides" },
  contact: { it: "/contatti", en: "/en/contact" },
};

const clean = (p) => p.replace(/\/+$/, "") || "/";

export const langFromPath = (pathname) => {
  const p = clean(pathname);
  return p === "/en" || p.startsWith("/en/") ? "en" : "it";
};

export const useT = () => {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  return {
    lang,
    t: (obj) => (typeof obj === "string" ? obj : obj?.[lang] ?? obj?.it ?? ""),
    p: (key, slug) => (slug ? `${ROUTES[key][lang]}/${slug}` : ROUTES[key][lang]),
  };
};

export const altPath = (pathname, target) => {
  const p = clean(pathname);
  const from = target === "en" ? "it" : "en";
  if (langFromPath(p) === target) return p;
  for (const k of Object.keys(ROUTES)) {
    if (ROUTES[k][from] === p) return ROUTES[k][target];
  }
  const base = `${ROUTES.guides[from]}/`;
  if (p.startsWith(base)) {
    const g = GUIDES.find((x) => x.slug[from] === p.slice(base.length));
    if (g) return `${ROUTES.guides[target]}/${g.slug[target]}`;
  }
  return ROUTES.home[target];
};
