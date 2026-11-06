import { useState } from "react";
import { useT } from "@/lib/i18n";

const MAX = 30;
const K = 5;
const X0 = 150;

export const ShimSimulator = () => {
  const { t } = useT();
  const [mm, setMm] = useState(14);
  const slab = mm * K;
  return (
    <div data-testid="shim-simulator" className="flex h-full flex-col">
      <svg viewBox="0 0 440 230" className="w-full" role="img" aria-label={t({ it: "Schema dello spessore intercambiabile", en: "Interchangeable shim diagram" })}>
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="#C9A45C" /><line x1="0" y1="0" x2="0" y2="6" stroke="#0B1320" strokeWidth="2" />
          </pattern>
        </defs>
        <path d="M60 200 L110 150 L130 150 L130 120 L145 120 L145 196 L330 196 L330 120 L345 120 L345 150 L380 150 L400 200 Z" fill="#18243A" stroke="#EFE9DD" strokeOpacity="0.35" />
        <rect x={X0} y="22" width={slab} height="174" rx="3" fill="rgba(239,233,221,0.16)" stroke="#EFE9DD" strokeOpacity="0.8" style={{ transition: "width .35s cubic-bezier(.16,1,.3,1)" }} />
        <rect x={X0 + slab} y="120" width={MAX * K - slab} height="76" fill="url(#hatch)" style={{ transition: "x .35s cubic-bezier(.16,1,.3,1), width .35s cubic-bezier(.16,1,.3,1)" }} />
        <text x={X0 + 6} y="40" fill="#EFE9DD" fontSize="11" fontFamily="JetBrains Mono">SLAB</text>
        <line x1={X0} x2={X0 + MAX * K} y1="214" y2="214" stroke="#C9A45C" />
        <text x={X0 + (MAX * K) / 2} y="228" fill="#C9A45C" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">MAX 30 MM</text>
      </svg>
      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">{t({ it: "Spessore slab", en: "Slab thickness" })}</span>
          <span data-testid="shim-value" className="font-display text-4xl font-extrabold">{mm} mm</span>
        </div>
        <input data-testid="shim-range" type="range" min="6" max={MAX} value={mm} onChange={(e) => setMm(Number(e.target.value))} className="shim-range mt-4 w-full" style={{ "--pct": `${((mm - 6) / (MAX - 6)) * 100}%` }} aria-label={t({ it: "Spessore slab in millimetri", en: "Slab thickness in millimetres" })} />
        <p className="mt-3 font-mono text-xs text-[var(--muted)]">{t({ it: "Schema illustrativo · lo spessore riempie lo spazio libero", en: "Illustrative diagram · the shim fills the free space" })}</p>
      </div>
    </div>
  );
};
