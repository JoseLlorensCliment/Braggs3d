import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

export default function StripeCheckout({ cartItems, customer, disabled }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    const stripe = await stripePromise;

    const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

    try {
      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          customerInfo: customer
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al conectar con el servidor");
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={disabled || loading}
        className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold 
          ${disabled || loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50 text-gray-900 border-gray-300"}`}
      >
        {loading ? "Procesando..." : "Pagar con Tarjeta 💳"}
      </button>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
