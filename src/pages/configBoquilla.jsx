import React, { useMemo, useState } from "react";

// === Datos de catálogo (extraídos de los PDFs del usuario) ===
// Precio y condiciones
const PRICE_EUR = 35;
const FREE_SHIPPING_MIN = 75;

// Colores disponibles (combinando translúcidos y sólidos)
const COLORS = [
  // Translúcidos
  "Azul claro translúcido",
  "Transparente",
  "Rosa translúcido",
  "Oliva translúcido",
  "Naranja translúcido",
  // Sólidos / Brillantes
  "Rojo",
  "Amarillo",
  "Verde",
  "Negro",
  "Blanco",
  "Azul eléctrico",
];

// Catálogo por instrumento > marca > modelos
// Catálogo por instrumento > marca > modelos (extraído de tus PDFs)
const CATALOG = {
  "Trompa": {
    "Bach": ["7S"],
    "Denis Wick": ["5N", "6N", "7N"],
    "Laskey": ["75G"],
    "Yamaha": ["32C4"],
    "Giardinelli": ["Sabatini"],
    "Holton Farkas": ["DC", "MDC", "SC", "VDC"],
    "King": ["H2"],
    "Paxman": ["3", "3B"],
    "Reynolds": ["6D"],
    "Schilke": ["30 Top", "Powell"],
    "Stork": ["6C"]
  },

  "Trompeta": {
    "Bach": [
      "2-3/4C",
      "1 1/2B",
      "1",
      "1-1/4C",
      "1-1/2C",
      "1-1/4C 24/24 Symp",
      "10-3/4 CW Megat.",
      "10 3/4 EW",
      "10",
      "10-1/2C",
      "11C",
      "12CW",
      "17C",
      "18C",
      "2-1/2C",
      "2",
      "20C",
      "2C",
      "3B",
      "3C",
      "3D",
      "3E",
      "3MV",
      "5A",
      "5B",
      "6 New Y.",
      "6BM",
      "6C",
      "7BW",
      "7C Mt Vern",
      "7CW",
      "7DW",
      "7EW",
      "7MV",
      "8C"
    ],
    "Yamaha": [
      "11A5",
      "11B4",
      "11C4-7C",
      "11C4",
      "11C4 - 7C",
      "13A4a",
      "13A4A",
      "13C4",
      "14A4A",
      "14B4",
      "14C4",
      "15B4",
      "15C4",
      "16C4",
      "16D",
      "17B4",
      "17C4",
      "18C4",
      "5A4",
      "6A4A",
      "7A4",
      "7B4",
      "8C4"
    ],
    "Denis Wick": ["2", "4", "MM1,5C", "MM2C"],
    "Schilke": [
      "10A4A Top",
      "11A",
      "12",
      "13",
      "13A4A",
      "13D",
      "13D4",
      "14",
      "14A4A",
      "14B4",
      "14C2",
      "15A4A",
      "15B4",
      "15C4",
      "16C2",
      "17",
      "17D4D",
      "18",
      "18C3D",
      "20",
      "20D2D",
      "24D"
    ],
    "Lotus": ["1L", "1XL", "1XL2", "2XL2", "3M", "3M2", "7XS"],
    "Laskey": [
      "60ES",
      "65MC",
      "65MD",
      "65S",
      "68C",
      "68MC",
      "75B-23-24",
      "75B-24-75"
    ],
    "Monnette": [
      "093 C1",
      "AP4",
      "AP5",
      "B JB-82 P",
      "B1-1LDS1 82",
      "B1 - 5 X TOP",
      "B1 - 7 UNITY",
      "B15",
      "B2 Unity (Retro)",
      "B2MS3",
      "B3S3 LT Blank",
      "B4",
      "B4S (Prana)",
      "B6L Top",
      "B6M Unit",
      "B6S1",
      "BP5",
      "C1 - 1 TOP",
      "C15",
      "C15M (Prana)",
      "C2FL",
      "C2MS2 STC1",
      "C2S3",
      "C3FS7",
      "D14S6/82 PRANA",
      "D2S3",
      "E2S3",
      "Franck Tucker"
    ],
    "JK": ["1C", "1E", "4B A2", "4C", "Parke 640"],
    "Griego": ["Ashton 1"],
    "Getzen": ["12", "5", "5C", "7"],
    "Bob Reeves": [
      "1 - ½ Classical",
      "40ES 69 5 Sleeve",
      "40SV 692SL",
      "42ES Top",
      "42S",
      "42SV JFP",
      "43ES",
      "EV7",
      "Jerry Hey"
    ],
    "King": ["11", "M18"]
  },

  "Tuba": {
    "Bach": ["18", "7"],
    "Conn": ["2", "Helleberg", "Helleberg 2", "Helleberg 7B"],
    "Denis Wick": [
      "1XL",
      "2,5CC",
      "2L",
      "AT3Y",
      "AT7Y",
      "AT8Y"
    ],
    "Laskey": ["30F", "30H", "32H"],
    "Miraphone": [
      "C4",
      "Rose Model 1",
      "TU 41",
      "TU 29",
      "TU 31"
    ],
    "Perantucci": [
      "12",
      "9S",
      "PT-36",
      "PT-48",
      "PT-50",
      "PT-64",
      "PT72-S",
      "PT-88"
    ],
    "Wessex": ["MP7"],
    "Yamaha": ["67B4", "67C4", "Roger Bobo", "Jim Self"],
    "Shires": ["4"],
    "Schilke": ["69C4"],
    "Monette": ["94", "94 Prana"],
    "Mike Finn": ["2", "3H", "4", "5H"],
    "M&B": ["MB1", "MB2 - XL", "MB3", "MB4", "MB5"],
    "Marcinkiewickz": ["W2"],
    "JK": ["3D", "3E", "4D", "5E", "7E"],
    "Giardinelli": ["Helleberg"],
    "Giddings": ["Diablo"],
    "Kanstul": ["30H"],
    "Parke": ["Ofenloch"],
    "Sidey": ["Classic"],
    "Stork": ["WD24"],
    "Tilz": ["WH-B1"]
  },

  "Trombón (Tudel Ancho)": {
    "Bach": ["1-1/2G", "3G", "4GB", "5G", "5GS", "6-1/2A"],
    "Denis Wick": [
      "3AL",
      "4AL",
      "4ABL",
      "SM2M",
      "SM3U",
      "SM3X",
      "SM3XR",
      "SM4U",
      "SM4X"
    ],
    "Laskey": ["59MD", "93D"],
    "Griego": ["Alessi 3C", "Laskey", "59MD", "93D"],
    "Perantucci": ["AH-1C"],
    "Wessex": ["4Y"],
    "Yamaha": ["59L", "60L", "Douglas Yeo"],
    "Schilke": ["58", "59", "M5.1"],
    "Hammond": ["10L", "10XL", "12ML", "21BL", "9XL", "F1"],
    "K&G": ["3.5D", "3.5D+", "3D", "3D+"],
    "M&B": [
      "GW3",
      "GW4",
      "GW5",
      "MB3-ET",
      "MB4-ET",
      "MB4F",
      "MB5",
      "MB51SS",
      "MB5F"
    ],
    "Randefalk": ["R2S", "R3", "R3,5"]
  },

  "Trombón (Tudel Estrecho)": {
    "Conn": ["2", "3", "Simone Mantia 10", "Trombone"],
    "Denis Wick": ["12CS", "BSM4X", "BSM6", "SM4B"],
    "Giardinelli": ["6D"],
    "JK Exclusive": ["EU 4A"],
    "K&G": ["48"],
    "King": ["M21"],
    "Parduba": ["2 Double Cup"],
    "Rudy Muck": ["21"],
    "Schilke": ["40B", "42B", "51", "51D"],
    "Yamaha": ["37C4", "45A"],
    "York": ["BiCo Tru 62 Bugle"],
    "Alliance": ["B6", "DC5S", "Mead B5"],
    "Amati-Kraslice": ["A16", "A54 Bugle"],
    "Bach": [
      "11C",
      "12",
      "12C",
      "12C Rep 2",
      "15EW",
      "17C",
      "3 Corp.",
      "6-1/2 AL",
      "6-3/4C",
      "7C",
      "JCH",
      "Sonny Russo"
    ],
    "Bowman": ["BB1EU", "BB1TB"],
    "Faxx": ["6-1/2 AL"],
    "Callet": ["Magnum 5 JT"]
  }
};


// === Utilidades ===
const toSlug = (s) => s.toLowerCase().replace(/[^a-z0-9áéíóúüñ\s-]/gi, "").replace(/\s+/g, "-");

function Badge({ children }) {
  return (
    <span className="inline-block rounded-full px-3 py-1 text-xs bg-gray-100 border border-gray-200">
      {children}
    </span>
  );
}

function Step({ index, title, children, complete }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold border ${
          complete ? "bg-black text-white border-black" : "bg-white text-black border-gray-300"
        }`}>
          {index}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="pl-10">{children}</div>
    </div>
  );
}

export default function App() {
  const [instrument, setInstrument] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [engraving, setEngraving] = useState("");
  const [cart, setCart] = useState([]);

  const brands = useMemo(() => (instrument ? Object.keys(CATALOG[instrument]) : []), [instrument]);
  const models = useMemo(() => (instrument && brand ? CATALOG[instrument][brand] : []), [instrument, brand]);

  const canAdd = instrument && brand && model && color;

  const addToCart = () => {
    if (!canAdd) return;
    const item = { id: `${toSlug(instrument)}-${toSlug(brand)}-${toSlug(model)}-${toSlug(color)}`,
      instrument, brand, model, color, engraving: engraving.trim() || null, price: PRICE_EUR };
    setCart((c) => [...c, item]);
    // reset solo color/engraving (para elegir rápido distintas variantes)
    setColor("");
    setEngraving("");
  };

  const total = useMemo(() => cart.reduce((s, it) => s + it.price, 0), [cart]);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section id="inicio" className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center py-10 md:py-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Boquillas personalizadas, modernas y resistentes
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Elige paso a paso: <strong>Instrumento → Marca → Modelo → Color</strong> y añade <strong>grabado</strong> (opcional) incluido en el precio.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge>Precio: {PRICE_EUR} €</Badge>
              <Badge>Envío gratis &gt; {FREE_SHIPPING_MIN} €</Badge>
              <Badge>Pago con PayPal o Tarjeta</Badge>
              <Badge>Grabado incluido</Badge>
            </div>
            <a href="#tienda" className="inline-block rounded-2xl bg-black text-white px-5 py-3 text-sm font-semibold hover:opacity-90">
              Ir a la tienda
            </a>
          </div>
          <div className="aspect-[4/3] w-full rounded-3xl border bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="text-5xl mb-2">🎺🎷</div>
              <p className="text-sm text-gray-500">(Imagen/slider del producto aquí)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selector paso a paso */}
      <section id="tienda" className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Configura tu boquilla</h2>
            <p className="text-gray-600 text-sm">Sigue los pasos y añade al carrito.</p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            <div>
              <Step index={1} title="Instrumento" complete={!!instrument}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {Object.keys(CATALOG).map((inst) => (
                    <button
                      key={inst}
                      onClick={() => { setInstrument(inst); setBrand(""); setModel(""); }}
                      className={`rounded-xl border px-4 py-3 text-sm text-left hover:bg-gray-50 ${instrument === inst ? "border-black" : "border-gray-200"}`}
                    >
                      {inst}
                    </button>
                  ))}
                </div>
              </Step>

              <Step index={2} title="Marca" complete={!!brand}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {brands.length === 0 && <div className="text-sm text-gray-500">Selecciona un instrumento primero</div>}
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => { setBrand(b); setModel(""); }}
                      className={`rounded-xl border px-4 py-3 text-sm text-left hover:bg-gray-50 ${brand === b ? "border-black" : "border-gray-200"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </Step>

              <Step index={3} title="Modelo" complete={!!model}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {models.length === 0 && <div className="text-sm text-gray-500">Selecciona una marca</div>}
                  {models.map((m) => (
                    <button
                      key={m}
                      onClick={() => setModel(m)}
                      className={`rounded-xl border px-4 py-3 text-sm text-left hover:bg-gray-50 ${model === m ? "border-black" : "border-gray-200"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </Step>

              <Step index={4} title="Color" complete={!!color}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`rounded-xl border px-3 py-2 text-xs text-left hover:bg-gray-50 ${color === c ? "border-black" : "border-gray-200"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Step>

              <Step index={5} title="Grabado (opcional)" complete={!!engraving.trim()}>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    placeholder="Nombre / texto a grabar (incluido en el precio)"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    onClick={() => setEngraving("")}
                    className="rounded-xl border px-3 py-3 text-sm hover:bg-gray-50"
                    title="Borrar grabado"
                  >
                    Limpiar
                  </button>
                </div>
              </Step>

              <div className="pl-10">
                <button
                  disabled={!canAdd}
                  onClick={addToCart}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold ${
                    canAdd ? "bg-black text-white hover:opacity-90" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Añadir al carrito — {PRICE_EUR} €
                </button>
                {!canAdd && (
                  <p className="text-xs text-gray-500 mt-2">Completa Instrumento, Marca, Modelo y Color.</p>
                )}
              </div>
            </div>

            {/* Resumen / Checkout simulado */}
            <aside className="rounded-3xl border h-fit sticky top-24">
              <div className="p-5 border-b">
                <h3 className="font-semibold">Resumen del pedido</h3>
              </div>
              <div className="p-5">
                {cart.length === 0 ? (
                  <p className="text-sm text-gray-500">Tu carrito está vacío.</p>
                ) : (
                  <ul className="space-y-3 mb-4">
                    {cart.map((it) => (
                      <li key={it.id} className="flex items-start justify-between gap-4 border rounded-2xl p-3">
                        <div className="text-sm">
                          <div className="font-medium">{it.instrument}</div>
                          <div className="text-gray-600">{it.brand} — {it.model}</div>
                          <div className="text-gray-600">Color: {it.color}</div>
                          {it.engraving && (<div className="text-gray-600">Grabado: “{it.engraving}”</div>)}
                        </div>
                        <div className="text-sm font-semibold whitespace-nowrap">{it.price} €</div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-semibold">{total} €</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Envío</span>
                  <span className="text-sm font-semibold">{total >= FREE_SHIPPING_MIN ? "Gratis" : "Calculado en checkout"}</span>
                </div>

                {total < FREE_SHIPPING_MIN && (
                  <div className="text-xs text-gray-500 mb-4">
                    Añade {(FREE_SHIPPING_MIN - total)} € para envío gratuito.
                  </div>
                )}

                {total >= FREE_SHIPPING_MIN && (
                  <div className="text-xs text-green-700 mb-4">¡Envío gratuito aplicado!</div>
                )}

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => alert("Simulación: Redirigir a Pasarela de Pago (Tarjeta)")}
                    className="rounded-2xl border px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                  >
                    Pagar con Tarjeta 💳
                  </button>
                  <button
                    onClick={() => alert("Simulación: Redirigir a PayPal")}
                    className="rounded-2xl bg-[#FFC439] px-4 py-3 text-sm font-semibold hover:brightness-95"
                  >
                    Pagar con PayPal
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 mt-3">El pago real requiere integrar una pasarela (Stripe/PayPal Checkout).</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-2">Contacto</h2>
          <p className="text-gray-600 text-sm mb-6">Para consultas o pedidos personalizados:</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <li className="rounded-2xl border p-4">Instagram: @braggs.es</li>
            <li className="rounded-2xl border p-4">Correo: braggs­c mouthpieces@gmail.com</li>
            <li className="rounded-2xl border p-4">WhatsApp: +34 646280502 · +34 639832798</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-xs text-gray-500 flex flex-wrap items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} Braggs Mouthpieces · Todos los derechos reservados
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Política de envíos</a>
            <a href="#" className="hover:underline">Devoluciones</a>
            <a href="#" className="hover:underline">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
