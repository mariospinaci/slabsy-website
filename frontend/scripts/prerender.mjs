// Post-build: writes a static HTML file per route with full text, meta tags and JSON-LD,
// so search engines and AI crawlers read the content without running JavaScript.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const build = join(root, "build");
const load = (f) => import(pathToFileURL(join(root, "src/data", f)).href);

const [{ PRODUCTS }, { FAQ }, { GUIDES }, { SEO }, copy, site, { SITE, ROUTES }, { CLEAN }] = await Promise.all(
  ["products.js", "faq.js", "guides.js", "seo.js", "copy.js", "site.js", "routes.js", "clean.js"].map(load),
);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const L = (o, l) => (typeof o === "string" ? o : o?.[l] ?? o?.it ?? "");
const price = (n, l) => new Intl.NumberFormat(l === "en" ? "en-IE" : "it-IT", { style: "currency", currency: "EUR" }).format(n);
const r = (key, l, slug) => (slug ? `${ROUTES[key][l]}/${slug}` : ROUTES[key][l]);
const TYPE = { wall: { it: "A parete", en: "Wall-mounted" }, stand: { it: "Da appoggio", en: "Tabletop" } };

const nav = (l) => `<nav><a href="${r("home", l)}">Slabsy</a> · ${site.NAV.map((n) => `<a href="${r(n.key, l)}">${esc(L(n.label, l))}</a>`).join(" · ")} · <a href="${r("home", l === "it" ? "en" : "it")}">${l === "it" ? "English" : "Italiano"}</a></nav>`;
const footer = (l) => `<footer><p>Slabsy · <a href="mailto:${site.EMAIL}">${site.EMAIL}</a> · ${site.PHONE}</p><p>${esc(L(site.DISCLAIMER, l))}</p></footer>`;

const productBlock = (m, l, full) => `<article id="${m.id}"><h${full ? 2 : 3}>${m.name}</h${full ? 2 : 3}><p><strong>${price(m.price, l)}</strong> (${l === "en" ? "VAT incl." : "IVA incl."}) · ${esc(L(TYPE[m.type], l))}</p><p>${esc(L(full ? m.desc : m.short, l))}</p>${full ? `<ul><li>${l === "en" ? "Material: PLA, 3D printed" : "Materiale: PLA, stampa 3D"}</li><li>${l === "en" ? "Color: black" : "Colore: nero"}</li><li>${l === "en" ? "Label slot" : "Alloggio label"}: ${m.label ? (l === "en" ? "yes, removable (1 label included)" : "sì, removibile (N°1 etichetta inclusa)") : "no"}</li><li>${l === "en" ? "Interchangeable shims up to 30 mm" : "Spessori intercambiabili fino a 30 mm"}</li><li>CGC · CBCS · ECG</li></ul>` : ""}</article>`;
const material = (l) => `<section><h2>${esc(L(copy.MATERIAL.title, l).join(" "))}</h2><p>${esc(L(copy.MATERIAL.intro, l))}</p><ul>${copy.MATERIAL.pros.map((p) => `<li><strong>${esc(L(p.t, l))}</strong>: ${esc(L(p.d, l))}</li>`).join("")}</ul><p>${esc(L(copy.MATERIAL.care, l))}</p></section>`;
const faqList = (l, items = FAQ) => items.map((f) => `<h3>${esc(L(f.q, l))}</h3><p>${esc(L(f.a, l))}</p>`).join("");
const faqLd = (l) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: L(f.q, l), acceptedAnswer: { "@type": "Answer", text: L(f.a, l) } })) });
const productsLd = (l) => ({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: PRODUCTS.map((m, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Product", name: m.name, brand: { "@type": "Brand", name: "Slabsy" }, image: SITE + m.img, material: "PLA", color: l === "en" ? "Black" : "Nero", description: L(m.desc, l), offers: { "@type": "Offer", price: m.price.toFixed(2), priceCurrency: "EUR" } } })) });

const pages = [];
for (const l of ["it", "en"]) {
  const alt = (key, slugFn) => ({ it: slugFn ? r(key, "it", slugFn("it")) : r(key, "it"), en: slugFn ? r(key, "en", slugFn("en")) : r(key, "en") });
  pages.push({ l, paths: alt("home"), seo: SEO.home, ld: { "@context": "https://schema.org", "@type": "WebSite", name: "Slabsy", url: SITE },
    body: `<h1>${l === "en" ? "Your slab deserves the spotlight." : "La tua slab merita la scena."}</h1><p>${esc(L(copy.HERO_SUB, l))}</p>${copy.QA.map((q) => `<h2>${esc(L(q.q, l))}</h2><p>${esc(L(q.a, l))}</p>`).join("")}<section><h2>${l === "en" ? "The models" : "I modelli"}</h2>${PRODUCTS.map((m) => productBlock(m, l, false)).join("")}</section>${material(l)}<section><h2>FAQ</h2>${faqList(l, FAQ.slice(0, 4))}</section>` });
  pages.push({ l, paths: alt("products"), seo: SEO.products, ld: productsLd(l),
    body: `<h1>${l === "en" ? "The Slabsy models" : "I modelli Slabsy"}</h1>${PRODUCTS.map((m) => productBlock(m, l, true)).join("")}<section><h2>${l === "en" ? "Services & extras" : "Servizi & optional"}</h2><ul><li>${l === "en" ? "Custom shims for display bases" : "Realizzazione spessori per basi espositive"}</li></ul></section>` });
  pages.push({ l, paths: alt("clean"), seo: SEO.clean, image: "/img/clean-artist.webp",
    body: `<h1>${esc(L(CLEAN.lines, l).join(" "))}</h1><p>${esc(L(CLEAN.intro, l))}</p><h2>${esc(L(CLEAN.what.h, l))}</h2><p>${esc(L(CLEAN.what.p, l))}</p><h2>${l === "en" ? "How it works" : "Come funziona"}</h2><ol>${CLEAN.steps.map((s) => `<li><strong>${esc(L(s.t, l))}</strong>: ${esc(L(s.d, l))}</li>`).join("")}</ol><h2>${l === "en" ? "Why a clean label" : "Perché una label clean"}</h2><ul>${CLEAN.why.map((w) => `<li><strong>${esc(L(w.t, l))}</strong>: ${esc(L(w.d, l))}</li>`).join("")}</ul><p>${esc(L(CLEAN.tip, l))}</p>` });
  pages.push({ l, paths: alt("about"), seo: SEO.about,
    body: `<h1>${l === "en" ? "The display never steals the scene." : "Il display non ruba la scena."}</h1><ul>${L(copy.PURPOSE, l).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${material(l)}<section><h2>${l === "en" ? "The best solution for your collection" : "La miglior soluzione per la tua collezione"}</h2><ul>${site.VALUES.map((v) => `<li><strong>${esc(L(v.t, l))}</strong>: ${esc(L(v.d, l))}</li>`).join("")}</ul></section>` });
  pages.push({ l, paths: alt("faq"), seo: SEO.faq, ld: faqLd(l), body: `<h1>${l === "en" ? "Frequently asked questions" : "Domande frequenti"}</h1>${faqList(l)}` });
  pages.push({ l, paths: alt("guides"), seo: SEO.guides,
    body: `<h1>${l === "en" ? "Guides" : "Guide"}</h1><ul>${GUIDES.map((g) => `<li><a href="${r("guides", l, L(g.slug, l))}">${esc(L(g.title, l))}</a> — ${esc(L(g.excerpt, l))}</li>`).join("")}</ul>` });
  pages.push({ l, paths: alt("contact"), seo: SEO.contact, body: `<h1>${l === "en" ? "Contact" : "Contatti"}</h1><p>Email: <a href="mailto:${site.EMAIL}">${site.EMAIL}</a> · ${l === "en" ? "Phone" : "Telefono"}: <a href="${site.PHONE_HREF}">${site.PHONE}</a></p>` });
  for (const g of GUIDES) {
    pages.push({ l, paths: alt("guides", (x) => L(g.slug, x)), seo: { title: { it: `${L(g.title, "it")} | Slabsy`, en: `${L(g.title, "en")} | Slabsy` }, desc: g.excerpt }, image: g.img,
      ld: { "@context": "https://schema.org", "@type": "Article", headline: L(g.title, l), description: L(g.excerpt, l), image: SITE + g.img, inLanguage: l, author: { "@type": "Organization", name: "Slabsy" }, publisher: { "@type": "Organization", name: "Slabsy" } },
      body: `<article><h1>${esc(L(g.title, l))}</h1><p>${esc(L(g.excerpt, l))}</p>${g.body.map((s) => `<h2>${esc(L(s.h, l))}</h2><p>${esc(L(s.p, l))}</p>`).join("")}</article>` });
  }
}

const template = readFileSync(join(build, "index.html"), "utf8");
const setMeta = (html, attr, key, val) => {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(val)}"/>`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `${tag}</head>`);
};

for (const pg of pages) {
  const path = pg.paths[pg.l];
  const title = L(pg.seo.title, pg.l);
  const desc = L(pg.seo.desc, pg.l);
  let html = template.replace(/<html lang="[^"]*"/, `<html lang="${pg.l}"`).replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", desc);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", desc);
  html = setMeta(html, "property", "og:url", SITE + path);
  html = setMeta(html, "property", "og:locale", pg.l === "en" ? "en_US" : "it_IT");
  html = setMeta(html, "property", "og:image", SITE + (pg.image || "/img/env-wall.webp"));
  const links = `<link rel="canonical" href="${SITE + path}"/><link rel="alternate" hreflang="it" href="${SITE + pg.paths.it}"/><link rel="alternate" hreflang="en" href="${SITE + pg.paths.en}"/><link rel="alternate" hreflang="x-default" href="${SITE + pg.paths.it}"/>`;
  const ld = pg.ld ? `<script type="application/ld+json" id="ld-page">${JSON.stringify(pg.ld).replace(/</g, "\\u003c")}</script>` : "";
  html = html.replace("</head>", `${links}${ld}<style>.pre{max-width:860px;margin:0 auto;padding:120px 20px;color:#EFE9DD;font-family:sans-serif;line-height:1.6}.pre a{color:#E2C27F}</style></head>`);
  html = html.replace('<div id="root"></div>', `<div id="root"><div class="pre">${nav(pg.l)}<main>${pg.body}</main>${footer(pg.l)}</div></div>`);
  const out = path === "/" ? join(build, "index.html") : join(build, path.slice(1), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}
console.log(`prerender: ${pages.length} pages written`);
