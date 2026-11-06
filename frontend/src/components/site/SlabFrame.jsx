export const SlabFrame = ({ src, alt, label, sub, accent, ratio = "aspect-[16/10]", className = "", imgClass = "", testid, children }) => {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <figure data-testid={testid} className={`slab-frame group ${className}`} style={accent ? { "--accent": accent } : undefined}>
      <figcaption className="slab-label">
        <span className="truncate">{label}</span>
        {sub && <span className="shrink-0 opacity-80">{sub}</span>}
      </figcaption>
      <div className={`slab-window ${ratio}`} onMouseMove={onMove}>
        {children ?? (
          <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${imgClass}`} />
        )}
        <div className="spotlight" />
      </div>
    </figure>
  );
};
