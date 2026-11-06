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

## Backlog
- P0: Insert Etsy shop URL (src/data/site.js ETSY_URL) and per-product Etsy links; real product photos; technical specs (dimensions, material, colors)
- P1: Prerendering/SSR of pages for AI crawlers that don't run JS; social profile links; Google Search Console + sitemap submission
- P2: More guides/blog, label gallery, cookie/privacy page, analytics
