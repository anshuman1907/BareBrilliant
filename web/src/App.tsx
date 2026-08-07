import type { ReactElement } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { StaticPage } from "./routes/StaticPage.js";
import { CatalogPage } from "./routes/CatalogPage.js";
import { ProductPage } from "./routes/ProductPage.js";
import { CartPage } from "./routes/CartPage.js";
import { WishlistPage } from "./routes/WishlistPage.js";
import { CheckoutPage } from "./routes/CheckoutPage.js";
import { OrderConfirmationPage } from "./routes/OrderConfirmationPage.js";
import { HomePage } from "./routes/HomePage.js";
import { STATIC_PAGE_LINKS } from "./lib/staticPageLinks.js";
import { CartProvider } from "./contexts/CartContext.js";
import { WishlistProvider } from "./contexts/WishlistContext.js";

function AppShell(): ReactElement {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {STATIC_PAGE_LINKS.map((page) => (
          <Route key={page.slug} path={`/${page.slug}`} element={<StaticPage slug={page.slug} />} />
        ))}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/:category" element={<CatalogPage />} />
        <Route path="/:category/:slugAndId" element={<ProductPage />} />
      </Routes>
      {!isHomePage && <Footer />}
    </>
  );
}

export function App(): ReactElement {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppShell />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}
