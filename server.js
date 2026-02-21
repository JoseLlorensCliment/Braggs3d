import express from "express";
import Stripe from "stripe";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Use environment variable for Stripe key if available
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "TU_SECRET_KEY_STRIPE");
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Database setup (PostgreSQL for production, SQLite for dev)
const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL;

let sequelize;

if (isProduction && process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for some providers like Render
      }
    }
  });
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  });
}

// Define Order model
const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerAddress: DataTypes.STRING,
  customerPhone: DataTypes.STRING,
  amount: {
    type: DataTypes.FLOAT, // Amount in Euros
    allowNull: false,
  },
  items: {
    type: DataTypes.TEXT, // Store items as JSON string
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('items');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('items', JSON.stringify(value));
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending", // pending, paid, failed
  },
  stripeSessionId: DataTypes.STRING,
  paypalOrderId: DataTypes.STRING,
  paymentProvider: {
    type: DataTypes.STRING, // 'stripe' | 'paypal'
    defaultValue: "stripe",
  },
});

// Sync database
sequelize.sync({ alter: true }).then(() => {
  console.log("Base de datos sincronizada");
}).catch(err => {
  console.error("Error sincronizando base de datos:", err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

app.use(cors());
app.use(express.json());

// Endpoint to create Stripe Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  const { cartItems, customerInfo } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío" });
  }

  // Calculate total amount (in cents)
  // Note: Ideally, fetch prices from DB to avoid client-side manipulation.
  // For this implementation, we trust the incoming cartItems structure but re-calculate total.
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const amountInCents = Math.round(totalAmount * 100);

  try {
    // Create Order in Database first (Pending)
    const order = await Order.create({
      customerName: customerInfo?.name || "Cliente",
      customerEmail: customerInfo?.email || "email@example.com",
      customerAddress: customerInfo?.address || "",
      customerPhone: customerInfo?.phone || "",
      amount: totalAmount,
      items: cartItems,
      status: "pending",
      paymentProvider: "stripe",
    });

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name || item.model || "Producto" },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      })),
      mode: "payment",
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/cancel`,
      metadata: {
        orderId: order.id.toString(),
      },
    });

    // Save session ID to order
    await order.update({ stripeSessionId: session.id });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to record PayPal order as paid
app.post("/api/orders/paypal", async (req, res) => {
  try {
    const { cartItems, customerInfo, paypalOrderId } = req.body || {};
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }
    if (!paypalOrderId) {
      return res.status(400).json({ error: "Falta paypalOrderId" });
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    const order = await Order.create({
      customerName: customerInfo?.name || "Cliente",
      customerEmail: customerInfo?.email || "email@example.com",
      customerAddress: customerInfo?.address || "",
      customerPhone: customerInfo?.phone || "",
      amount: totalAmount,
      items: cartItems,
      status: "paid",
      paypalOrderId,
      paymentProvider: "paypal",
    });

    res.json({ ok: true, orderId: order.id });
  } catch (err) {
    console.error("Error guardando pedido PayPal:", err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to get all orders (Admin usage)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static frontend files in production
if (process.env.NODE_ENV === "production" || process.env.RENDER) {
  app.use(express.static(path.join(__dirname, "dist")));

  // Usa middleware global para atrapar cualquier ruta no definida por la API
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`)
);

// Keep the process alive
setInterval(() => { }, 10000);
