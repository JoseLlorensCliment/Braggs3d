import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500); // aumentado a 3.5s para leer mejor
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 pointer-events-none flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        className="pointer-events-auto bg-gray-900/85 backdrop-blur-md border border-gray-700/50 text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] text-sm md:text-base font-medium max-w-sm text-center flex items-center justify-center gap-3"
      >
        {message}
      </motion.div>
    </div>
  );
}
