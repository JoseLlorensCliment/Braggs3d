import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="bg-red-100 p-4 rounded-full mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Pago Cancelado</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                El proceso de pago ha sido cancelado. No se ha realizado ningún cargo.
            </p>
            <Link
                to="/cart"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
                Volver al Carrito
            </Link>
        </div>
    );
}
