import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Catálogo</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.id}
            className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-white flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Link to={`/product/${p.id}`} className="block flex-grow">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 border-b">
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="p-5 text-center flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 mb-2 leading-tight">{p.name}</h3>
                <p className="text-xl font-medium text-gray-700 mt-auto">{p.price} €</p>
              </div>
            </Link>

            <div className="p-4 pt-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(p);
                }}
                className="w-full bg-black text-white px-4 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Añadir al carrito
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
