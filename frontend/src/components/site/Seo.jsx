import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, langFromPath, altPath } from "@/lib/i18n";

const upsert = (selector, create, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) { el = document.createElement(create); document.head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
};

export const Seo = ({ title, description, jsonLd, image = "/img/env-wall.webp" }) => {
  const { pathname } = useLocation();
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const lang = langFromPath(pathname);
    const url = SITE + pathname;
    document.title = title;
    document.documentElement.lang = lang;
    upsert('meta[name="description"]', "meta", { name: "description", content: description });
    upsert('meta[property="og:title"]', "meta", { property: "og:title", content: title });
    upsert('meta[property="og:description"]', "meta", { property: "og:description", content: description });
    upsert('meta[property="og:url"]', "meta", { property: "og:url", content: url });
    upsert('meta[property="og:image"]', "meta", { property: "og:image", content: SITE + image });
    upsert('meta[property="og:locale"]', "meta", { property: "og:locale", content: lang === "en" ? "en_US" : "it_IT" });
    upsert('link[rel="canonical"]', "link", { rel: "canonical", href: url });
    upsert('link[hreflang="it"]', "link", { rel: "alternate", hreflang: "it", href: SITE + altPath(pathname, "it") });
    upsert('link[hreflang="en"]', "link", { rel: "alternate", hreflang: "en", href: SITE + altPath(pathname, "en") });
    upsert('link[hreflang="x-default"]', "link", { rel: "alternate", hreflang: "x-default", href: SITE + altPath(pathname, "it") });
    let s = document.getElementById("ld-page");
    if (ld) {
      if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = "ld-page"; document.head.appendChild(s); }
      s.textContent = ld;
    } else if (s) {
      s.remove();
    }
  }, [title, description, ld, image, pathname]);
  return null;
};
