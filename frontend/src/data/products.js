export const PRODUCTS = [
  {
    id: "wall-v1",
    name: "SLABSY WALL V.1",
    type: "wall",
    price: 32,
    label: false,
    accent: "#C9694A",
    img: "/img/wall-v1.webp",
    gallery: ["/img/wall-v1.webp", "/img/wall-v1-empty.webp", "/img/wall-v1-side.webp"],
    short: { it: "Espositore a parete, montaggio rapido, design moderno.", en: "Wall display, quick mounting, modern design." },
    desc: {
      it: "Espositore da parete dal design moderno, progettato per un montaggio rapido. È privo di alloggiamento per etichetta: la variante più essenziale, per chi vuole solo la slab.",
      en: "A modern wall display designed for quick mounting. It has no label slot: the most essential variant, for those who want nothing but the slab.",
    },
  },
  {
    id: "wall-v2",
    name: "SLABSY WALL V.2",
    type: "wall",
    price: 39,
    label: true,
    accent: "#D9A33A",
    img: "/img/wall-v2.webp",
    gallery: ["/img/wall-v2.webp", "/img/wall-v2-empty.webp", "/img/wall-v2-side.webp"],
    short: { it: "Espositore a parete, montaggio rapido, con alloggio label.", en: "Wall display, quick mounting, with label slot." },
    desc: {
      it: "Espositore da parete dal design moderno, progettato per un montaggio rapido. È dotato di alloggiamento per etichetta removibile e personalizzabile. N°1 etichetta inclusa nel prezzo.",
      en: "A modern wall display designed for quick mounting. It features a slot for a removable, customizable label. One label included in the price.",
    },
  },
  {
    id: "stand-v1",
    name: "SLABSY STAND V.1",
    type: "stand",
    price: 27,
    label: false,
    accent: "#6E9A80",
    img: "/img/stand-v1.webp",
    gallery: ["/img/stand-v1.webp", "/img/stand-v1-front.webp", "/img/stand-v1-side.webp"],
    short: { it: "Espositore da appoggio, base stabile, inclinazione ottimale.", en: "Tabletop stand, stable base, optimal angle." },
    desc: {
      it: "Espositore da appoggio con base stabile e inclinazione ottimale. È privo di alloggiamento per etichetta. Perfetto su mobili, mensole e scrivanie.",
      en: "A tabletop stand with a stable base and an optimal angle. It has no label slot. Perfect on furniture, shelves and desks.",
    },
  },
  {
    id: "stand-v2",
    name: "SLABSY STAND V.2",
    type: "stand",
    price: 34,
    label: true,
    accent: "#4F74A8",
    img: "/img/stand-v2.webp",
    gallery: ["/img/stand-v2.webp", "/img/stand-v2-empty.webp", "/img/stand-v2-side.webp"],
    short: { it: "Espositore da appoggio, base stabile, con alloggio label.", en: "Tabletop stand, stable base, with label slot." },
    desc: {
      it: "Espositore da appoggio con base stabile e inclinazione ottimale. È dotato di alloggiamento per etichetta removibile e personalizzabile. N°1 etichetta inclusa nel prezzo.",
      en: "A tabletop stand with a stable base and an optimal angle. It features a slot for a removable, customizable label. One label included in the price.",
    },
  },
];

export const formatPrice = (n, lang) =>
  new Intl.NumberFormat(lang === "en" ? "en-IE" : "it-IT", { style: "currency", currency: "EUR" }).format(n);
