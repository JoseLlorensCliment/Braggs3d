import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../components/Toast";

export default function Home() {
  const [showToast, setShowToast] = useState(false);

  const handleConfigClick = (e) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <>
      <AnimatePresence>
        {showToast && (
          <Toast
            message="🚧 El configurador no está disponible temporalmente. Disculpa las molestias."
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>

      <section
        className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url('/images/products/FOTO BOQUILLAS (1).jpeg')`,
          // Note: using bg-fixed achieves the CSS-only simple parallax effect
        }}
      >
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.h2
            className="text-4xl md:text-6xl font-sans font-bold mb-6 tracking-wide drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bienvenido a Braggs Mouthpieces
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Boquillas de impresión 3D y accesorios innovadores para músicos.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              to="/shop"
              className="px-8 py-4 rounded-full text-lg font-medium text-white shadow-xl 
                         bg-white/10 backdrop-blur-md border border-white/20 
                         hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              Ir a la tienda
            </Link>

            <button
              onClick={handleConfigClick}
              className="px-8 py-4 rounded-full text-lg font-medium text-gray-300 shadow-xl
                         bg-black/40 backdrop-blur-sm border border-gray-600/50 
                         hover:bg-black/60 transition-all duration-300 cursor-not-allowed"
            >
              Configura tu boquilla
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
