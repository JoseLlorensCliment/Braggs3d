import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4">¡Pago Exitoso!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Gracias por tu compra. Hemos recibido tu pedido correctamente.
        Te enviaremos un correo con los detalles.
      </p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
