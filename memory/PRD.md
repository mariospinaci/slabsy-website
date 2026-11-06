# Slabsy – PRD

## Original problem statement
"Voglio realizzare un sito internet vetrina per posizionare un prodotto, slabsy che sono degli espositori per fumetti in cgc. il sito sarà solo una vetrina per posizionare il prodotto sui motori di ricerca, social e anche nelle varie ai. mentre per la vendita ci appoggeremo su etsy. allego qlc foto rendering script e flyer. analizza il tutto, dimmi se il materiale è sufficiente... formula una proposta e consiglia i vari step da fare"

User choices: IT + EN with switcher; contact form saving requests + email notification to info@slabsy.it; Etsy link not yet available; renders + AI environment images; FAQ + 3 guides.

## Architecture
- React (CRA/craco) + framer-motion + lenis, Tailwind; routes IT at root (/prodotti, /chi-siamo, /faq, /guide, /contatti) and EN under /en/*
- FastAPI: POST /api/contact (Mongo `contact_requests`, honeypot, in-memory rate limit 5/10 min/IP) + Emergent managed Resend email (email_service.py) to OWNER_EMAIL
- SEO: per-page title/description/canonical/hreflang/OG via Seo component, JSON-LD (Organization, WebSite, ItemList/Product, FAQPage, Article), sitemap.xml, robots.txt (AI bots allowed), llms.txt
- Assets: /public/img (renders converted to webp, 4 AI environment images, logo recolored light/dark), favicon.svg

## User personas
Collectors of CGC/CBCS/ECG graded comics (IT + international), comic shops, artists (sketch labels).

## Core requirements
Home (what/why/different), Products (4 models, shims, labels, services), About, FAQ, Guides, Contact, Etsy CTA.

## Implemented (2026-11-06)
- Full bilingual site, kinetic masked hero, 3D tilt + parallax slab frame, slow marquee, models grid, aligned bento with interactive shim simulator, philosophy section, FAQ accordion, 3 guides, contact form with email notification
- Etsy buttons open "coming soon" dialog (ETSY_URL empty in src/data/site.js)

## Iteration 2 (2026-11-06)
- All renders recolored black (public/img/{id}-1..4.webp, view 1 = three-quarter) and AI environment images re-edited with black stands
- Product order: Stand V.1, Stand V.2 (label), Wall V.1, Wall V.2 (label); collection cards cycle views on hover
- PLA / 3D printing copy + pros (MaterialSection on Home & About, specs, FAQ, llms.txt, JSON-LD material/color)
- Label gallery (6 CSS styles + live text preview) on /prodotti#label
- Static prerender: `yarn build` runs scripts/prerender.mjs → 18 HTML pages with full text, meta, hreflang, JSON-LD (data from src/data/*)

## Iteration 3 (2026-11-06)
- Labels are NOT customizable on request (client): removed all "custom labels" copy, label service, invented label gallery and text preview; guide 3 slug now label-e-sketch-label / labels-and-sketch-labels
- Pending: real label designs from the client's flyer (to rebuild the gallery); confirm sketch labels still offered

## Iteration 4 (2026-11-06)
- New page Label clean (/label-clean, /en/clean-labels): blank labels customized by the artist; 3 AI illustrative images (clean-artist/-signature/-finished); data in src/data/clean.js; nav, bento, products, FAQ, sitemap, llms.txt, prerender (20 pages)
- Pending: label gallery from flyer page 2 (file not received yet)

## Iteration 5 (2026-11-06)
- Label gallery on /prodotti#label: 16 labels LB-001…LB-016 cropped from "SLABSY_listino etichette v2.pdf" (public/img/labels), €14 each VAT incl., disclaimer; data src/data/labels.js; in prerender + llms.txt; bento link

## Iteration 6 (2026-11-06)
- Label picker: select any of 16 labels or the clean label and see it applied on black Stand V.2 front render (stand-v2-label-preview.webp, slot % in LabelGallery.jsx)
- Clean label price €14 (clean.js, page, prerender, llms.txt)
- New signature image clean-signature-table.webp (blank label on table, unbranded pen)

## Iteration 7 (2026-11-06)
- 3D relief block (client render LB-006, img/labels/relief-3d.webp); picker toggle "Sullo stand / Rilievo 3D": real render if RELIEF map in labels.js has the code, else illustrative CSS 3D view (rotates on pointer move)
- Pending: real 3D renders for the other 15 labels + clean label → add to RELIEF map

## Iteration 8 (2026-11-06)
- Offline export: `yarn build:offline` → /app/frontend/offline (HashRouter via REACT_APP_OFFLINE, relative paths, contact = email/phone buttons). Double-click offline/index.html. Re-run after content changes before saving to GitHub.

## Backlog
- P0: Insert Etsy shop URL (src/data/site.js ETSY_URL) and per-product Etsy links; real product photos; technical specs (dimensions, material, colors)
- P1: Prerendering/SSR of pages for AI crawlers that don't run JS; social profile links; Google Search Console + sitemap submission
- P2: More guides/blog, label gallery, cookie/privacy page, analytics
