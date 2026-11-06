import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 36, className = "", as = "div", ...rest }) => {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0.25, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
};

const LINE = {
  hidden: { y: "105%" },
  show: (d) => ({ y: "0%", transition: { duration: 1.1, delay: d, ease: [0.16, 1, 0.3, 1] } }),
};

export const MaskLines = ({ lines, className = "", lineClass = "", delay = 0.15, animateOnLoad = false }) => {
  const trigger = animateOnLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.1 } };
  return (
    <motion.span className={`block ${className}`} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="-mt-[0.14em] block overflow-hidden pb-[0.06em] pt-[0.14em]">
          <motion.span className={`block ${typeof lineClass === "function" ? lineClass(i) : lineClass}`} variants={LINE} custom={delay + i * 0.11}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
