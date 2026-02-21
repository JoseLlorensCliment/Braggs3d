import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";  // 👈 IMPORTA EL PROVIDER

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>  {/* 👈 ENVUELVE LA APP */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
