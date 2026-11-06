import { motion } from "framer-motion";
import { MaskLines } from "@/components/site/Reveal";

export const PageHero = ({ over, lines, intro, testid }) => (
  <section data-testid={testid} className="relative overflow-hidden pb-16 pt-36 lg:pb-24 lg:pt-44">
    <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[800px] rounded-full bg-[radial-gradient(closest-side,rgba(201,164,92,0.14),transparent)]" />
    <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
      <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="overline flex items-center gap-3">
        <span className="h-px w-10 bg-[var(--gold)]" />{over}
      </motion.p>
      <h1 className="font-display mt-6 text-[3.3rem] font-black uppercase leading-[0.86] sm:text-8xl lg:text-[7.5rem]">
        <MaskLines lines={lines} animateOnLoad />
      </h1>
      {intro && (
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }} className="mt-8 max-w-2xl text-base leading-relaxed text-[#c9cfd9] sm:text-lg">
          {intro}
        </motion.p>
      )}
    </div>
  </section>
);
