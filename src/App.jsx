import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Shop from "./pages/shop";
import ConfigBoquilla from "./pages/configBoquilla";
import Contacto from "./pages/contacto";
import Cart from "./pages/cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import { useCart } from "./context/CartContext";

export default function App() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/shop", label: "Tienda" },
    { path: "/faq", label: "FAQ" },
    { path: "/about", label: "Sobre Nosotros" },
    { path: "/contacto", label: "Contacto" },
  ];

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo + Nombre */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Braggs Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones Header (Carrito + Hamburger) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm">{cart.length} artículos</div>
            <button
              className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
              onClick={() => navigate("/cart")}
            >
              <span className="sm:hidden font-bold">{cart.length}</span>
              Ver carrito
            </button>

            {/* Hamburger Button (Mobile Only) */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg py-4 px-4 flex flex-col gap-2 transition-all">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium active:bg-blue-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Páginas */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/config" element={<ConfigBoquilla />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </main>
    </div>
  );
}
