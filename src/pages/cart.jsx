import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import PaypalCheckout from "../components/PaypalCheckout";
import StripeCheckout from "../components/StripeCheckout";

export default function Cart() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  // If you later use FREE_SHIPPING_MIN, keep this, otherwise we use the new logic
  // const FREE_SHIPPING_MIN = 75;

  // Datos del cliente
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    region: "", // Nueva propiedad para la región
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Cálculo del envío
  const isMurciaOrValenciana = ["murcia", "comunidad_valenciana"].includes(customer.region);

  // Base shipping cost logic
  let shippingCost = 0;
  if (cart.length > 0) {
    if (!customer.region) {
      shippingCost = 0; // Not calculated yet
    } else {
      shippingCost = isMurciaOrValenciana ? 2.90 : 4.90;
    }
  }

  const finalTotal = total + shippingCost;

  // Validación básica
  const isFormValid =
    customer.name.trim() &&
    customer.address.trim() &&
    customer.region.trim() && // Require region selection
    customer.email.trim() &&
    customer.phone.trim();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div>
          {/* Lista de productos */}
          <ul className="space-y-4 mb-6">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between border p-3 rounded-lg bg-white"
              >
                <div className="flex items-center gap-4">
                  {item.img && (
                    <img src={item.img} alt={item.name} className="w-12 h-12 object-contain rounded" />
                  )}
                  <div>
                    <div className="font-medium">{item.name || item.model}</div>
                    <div className="text-gray-600">{Number(item.price).toFixed(2)} €</div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(idx)}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors bg-red-50 px-3 py-1 rounded hover:bg-red-100"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          {/* Datos del cliente */}
          <div className="border rounded-xl p-6 mb-6 bg-white shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Datos de envío</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nombre y Apellidos"
                value={customer.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-shadow"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={customer.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-shadow"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono móvil"
                value={customer.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-shadow"
              />

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="address"
                  placeholder="Dirección completa"
                  value={customer.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-shadow"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Región / Comunidad Autónoma <span className="text-red-500">*</span>
                </label>
                <select
                  name="region"
                  value={customer.region}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-shadow bg-white"
                >
                  <option value="">Selecciona una región para calcular el envío...</option>
                  <option value="murcia">Región de Murcia (2,90€)</option>
                  <option value="comunidad_valenciana">Comunidad Valenciana (2,90€)</option>
                  <option value="resto_espana">Resto de España (4,90€)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Totales */}
          <div className="border rounded-xl p-6 bg-gray-50 mb-6">
            <div className="flex justify-between text-gray-600 mb-3">
              <span>Subtotal ({cart.length} artículos)</span>
              <span>{Number(total).toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4 pb-4 border-b">
              <span>Envío</span>
              <span>
                {!customer.region
                  ? "Calculado al seleccionar región"
                  : `${shippingCost.toFixed(2)} €`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-xl mb-2">
              <span>Total a pagar</span>
              <span>{finalTotal.toFixed(2)} €</span>
            </div>
          </div>

          {/* Vaciar carrito */}
          <div className="flex justify-end mb-6">
            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-600 hover:underline transition-colors"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Botones de pago */}
          <div className="flex flex-col items-center gap-3">
            {/* <StripeCheckout cartItems={cart} customer={customer} disabled={!isFormValid} /> */}
            <div className="w-full max-w-md bg-white p-4 rounded-xl border shadow-sm">
              <PaypalCheckout cartItems={cart} customer={customer} total={finalTotal} disabled={!isFormValid} />
            </div>
          </div>

          {!isFormValid && (
            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mt-6 text-center text-sm border border-yellow-200">
              ⚠️ Rellena todos los datos de envío y selecciona tu región para habilitar el pago.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
