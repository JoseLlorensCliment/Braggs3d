import React from "react";
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
            {/* <div>
              <div className="font-bold leading-tight">Braggs 3D</div>
            </div> */}
          </div>

          {/* Menú */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
            {[
              { path: "/", label: "Inicio" },
              { path: "/shop", label: "Tienda" },
              // { path: "/config", label: "Configura tu boquilla" },
              { path: "/faq", label: "FAQ" },
              { path: "/about", label: "Sobre Nosotros" },
              { path: "/contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Carrito */}
          <div className="flex items-center gap-4">
            <div className="text-sm">{cart.length} artículos</div>
            <button
              className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => navigate("/cart")}
            >
              Ver carrito
            </button>
          </div>
        </div>
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
