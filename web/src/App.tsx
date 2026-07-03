import type { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { StaticPage } from "./routes/StaticPage.js";
import { STATIC_PAGE_LINKS } from "./lib/staticPageLinks.js";

export function App(): ReactElement {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <Routes>
        <Route path="/" element={<main>BareBrilliant</main>} />
        {STATIC_PAGE_LINKS.map((page) => (
          <Route key={page.slug} path={`/${page.slug}`} element={<StaticPage slug={page.slug} />} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
