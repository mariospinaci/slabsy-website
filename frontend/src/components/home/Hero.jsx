import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { MaskLines } from "@/components/site/Reveal";
import { SlabFrame } from "@/components/site/SlabFrame";
import { EtsyButton } from "@/components/site/EtsyButton";

const COPY = {
  over: { it: "Graded comics display stand", en: "Graded comics display stand" },
  lines: { it: ["La tua slab", "merita la", "scena."], en: ["Your slab", "deserves the", "spotlight."] },
  sub: {
    it: "Slabsy è il sistema espositivo per fumetti gradati CGC, CBCS ed ECG: a parete o da appoggio, con spessori intercambiabili fino a 30 mm e label personalizzabili.",
    en: "Slabsy is the display system for CGC, CBCS and ECG graded comics: wall-mounted or tabletop, with interchangeable shims up to 30 mm and customizable labels.",
  },
  cta: { it: "Scopri i modelli", en: "Explore the models" },
  stats: { it: [["4", "modelli"], ["30 mm", "spessore max"], ["3+", "standard slab"]], en: [["4", "models"], ["30 mm", "max thickness"], ["3+", "slab standards"]] },
  badge: { it: "SPESSORI INTERCAMBIABILI · FINO A 30 MM · ", en: "INTERCHANGEABLE SHIMS · UP TO 30 MM · " },
};

const RotatingBadge = ({ text }) => (
  <div className="pointer-events-none absolute -bottom-8 -left-6 z-10 h-28 w-28 sm:-left-12 sm:h-36 sm:w-36" aria-hidden>
    <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
      <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
      <circle cx="100" cy="100" r="98" fill="#0B1320" stroke="#C9A45C" strokeWidth="1" />
      <text className="font-mono" fontSize="13" letterSpacing="3" fill="#EFE9DD"><textPath href="#circ">{text}{text}</textPath></text>
    </svg>
    <span className="absolute inset-0 m-auto h-3 w-3 rotate-45 bg-[var(--gold)]" />
  </div>
);

const HeroVisual = ({ badge }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "14%"]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 110, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 110, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className="relative mx-auto w-full max-w-[520px] [perspective:1400px]">
      <motion.div style={{ rotateX: rx, rotateY: ry }} initial={{ clipPath: "inset(100% 0% 0% 0% round 20px)", y: 40 }} animate={{ clipPath: "inset(0% 0% 0% 0% round 20px)", y: 0 }} transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="[transform-style:preserve-3d]">
        <SlabFrame label="SLABSY · WALL V.2" sub="DISPLAY" accent="#C9A45C" ratio="aspect-[4/5]" testid="hero-slab-frame">
          <motion.img src="/img/env-wall.webp" alt="Espositori Slabsy a parete con fumetti gradati" style={{ y: imgY, scale: 1.18 }} className="h-full w-full object-cover" />
        </SlabFrame>
      </motion.div>
      <RotatingBadge text={badge} />
    </div>
  );
};

export const Hero = () => {
  const { t, p } = useT();
  return (
    <section data-testid="hero-section" className="relative overflow-hidden pb-20 pt-32 lg:min-h-[100svh] lg:pt-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,164,92,0.18),transparent)]" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="overline flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--gold)]" />{t(COPY.over)}
          </motion.p>
          <h1 data-testid="hero-title" className="font-display mt-6 text-[3.9rem] font-black uppercase leading-[0.86] tracking-[-0.01em] sm:text-8xl lg:text-[7.4rem] xl:text-[8.6rem]">
            <MaskLines lines={t(COPY.lines)} animateOnLoad lineClass={(i) => (i === 2 ? "text-[var(--gold)]" : "")} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }} className="mt-8 max-w-xl text-base leading-relaxed text-[#c9cfd9] sm:text-lg">
            {t(COPY.sub)}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.85 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Link to={p("products")} data-testid="hero-models-link" className="btn-ghost group inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-semibold">
              {t(COPY.cta)}<ArrowDownRight size={18} className="transition-transform duration-300 group-hover:rotate-[-45deg]" />
            </Link>
            <EtsyButton testid="hero-etsy-button" />
          </motion.div>
          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--line)] pt-6">
            {t(COPY.stats).map(([v, l]) => (
              <div key={l}><dt className="font-display text-3xl font-extrabold sm:text-4xl">{v}</dt><dd className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">{l}</dd></div>
            ))}
          </motion.dl>
        </div>
        <div className="lg:col-span-5"><HeroVisual badge={t(COPY.badge)} /></div>
      </div>
    </section>
  );
};
