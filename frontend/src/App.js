import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ROUTES } from "@/lib/i18n";
import Layout from "@/components/site/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Faq from "@/pages/Faq";
import Guides from "@/pages/Guides";
import GuideArticle from "@/pages/GuideArticle";
import Contact from "@/pages/Contact";
import CleanLabels from "@/pages/CleanLabels";

const PAGES = [["home", Home], ["products", Products], ["clean", CleanLabels], ["about", About], ["faq", Faq], ["guides", Guides], ["contact", Contact]];
const LANGS = ["it", "en"];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {LANGS.flatMap((l) => PAGES.map(([k, Page]) => <Route key={k + l} path={ROUTES[k][l]} element={<Page />} />))}
          {LANGS.map((l) => <Route key={`g${l}`} path={`${ROUTES.guides[l]}/:slug`} element={<GuideArticle />} />)}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      <Toaster position="bottom-center" theme="dark" />
    </BrowserRouter>
  );
}

export default App;
