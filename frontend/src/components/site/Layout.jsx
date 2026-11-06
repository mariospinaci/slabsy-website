import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const useLenis = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null; };
  }, []);
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
};

export default function Layout() {
  useLenis();
  return (
    <div className="grain min-h-screen overflow-x-clip bg-[var(--ink)] text-[var(--paper)]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
