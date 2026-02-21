import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalCheckout({ cartItems, customer, total, disabled }) {
  const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "";

  // Bloquear el botón si faltan datos del cliente
  const onClick = (data, actions) => {
    if (disabled) {
      return actions.reject();
    }
    return actions.resolve();
  };

  return (
    <PayPalScriptProvider options={{ "client-id": clientId, currency: "EUR" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        onClick={onClick}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: total.toString(), currency_code: "EUR" },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          const paypalOrderId = order?.id;
          try {
            await fetch(`${apiUrl}/api/orders/paypal`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cartItems,
                customerInfo: customer,
                paypalOrderId,
              }),
            });
            alert("✅ Pago completado con éxito");
          } catch (e) {
            console.error(e);
            alert("Pago realizado, pero hubo un error guardando el pedido.");
          }
        }}
      />
    </PayPalScriptProvider>
  );
}
