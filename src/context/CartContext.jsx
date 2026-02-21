import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    showToast("Producto añadido al carrito ✅");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((_, idx) => idx !== id));
    showToast("Producto eliminado ❌");
  };

  const clearCart = () => {
    setCart([]);
    showToast("Carrito vaciado 🛒");
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
