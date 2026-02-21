import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b last:border-0 border-gray-100">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex justify-between items-start py-4 focus:outline-none group"
            >
                <h3 className="font-semibold text-lg text-gray-800 pr-8 group-hover:text-blue-600 transition-colors">
                    {item.q}
                </h3>
                <span
                    className={`text-gray-400 transform transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base pb-6">
                            {item.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function FAQ() {
    const faqs = [
        {
            category: "Preguntas Generales",
            items: [
                {
                    q: "¿Hacéis envíos internacionales? ¿Cuánto tarda?",
                    a: "Realizamos envíos a toda Europa. Para envíos fuera de Europa, contáctanos por mensaje privado y gestionaremos tu pedido de forma personalizada.",
                },
                {
                    q: "¿Ofrecen personalización para agrupaciones musicales?",
                    a: "Sí, ofrecemos la posibilidad que los músicos de tu agrupación disfruten de productos totalmente personalizados.",
                },
                {
                    q: "¿Ofrecen descuentos para bandas o compras en grupo?",
                    a: "Sí, ofrecemos descuentos especiales para bandas y compras en grupo. Además, los pedidos superiores a 75€ tienen envío gratuito.",
                },
                {
                    q: "¿Dónde puedo ver testimonios de otros músicos que usen vuestros productos?",
                    a: "Puedes encontrar opiniones y testimonios de músicos que ya usan nuestros productos en nuestras redes sociales.",
                },
                {
                    q: "¿Cómo puedo hacer un pedido?",
                    a: "Puedes realizar tu pedido directamente a través de nuestra web. Si tienes dudas o necesitas asesoramiento personalizado, contáctanos por mensaje privado o redes sociales.",
                },
                {
                    q: "¿Cuánto tarda en llegar mi pedido?",
                    a: "En el momento que recibimos tu pedido, nos ponemos en marcha con su fabricación. En el caso de las boquillas, este proceso se puede demorar hasta 3 días hábiles. Los envíos dentro de España suelen tardar entre 2-4 días laborables desde el momento de su fabricación. Para otros países europeos, entre 5-8 días laborables. Te enviaremos un número de seguimiento para que puedas rastrear tu pedido.",
                },
                {
                    q: "¿Puedo modificar o cancelar mi pedido una vez realizado?",
                    a: "Si necesitas modificar o cancelar tu pedido, contáctanos lo antes posible a través de nuestro correo electrónico. Si aún no ha sido enviado, podremos hacer los cambios necesarios.",
                },
                {
                    q: "¿Ofrecen asesoramiento para elegir la boquilla adecuada?",
                    a: "Sí, estaremos encantados de ayudarte a elegir el modelo y las especificaciones más adecuadas para tu instrumento y estilo. Contáctanos por mensaje privado o redes sociales.",
                },
                {
                    q: "¿Cómo puedo contactar con Braggs si tengo más preguntas?",
                    a: "Puedes contactarnos a través de nuestras redes sociales, por email braggs3d@gmail.com o mediante el formulario de contacto en nuestra web. Te responderemos en menos de 24 horas.",
                },
            ],
        },
        {
            category: "Boquillas Impresas en 3D",
            items: [
                {
                    q: "¿Las boquillas suenan igual que las de metal tradicionales?",
                    a: "Las boquillas de impresión 3D ofrecen un sonido ligeramente diferente al metal tradicional. Producen un timbre más cálido y suave, con menos brillo metálico. Muchos músicos aprecian esta calidez para ciertos estilos musicales o para sesiones de práctica prolongadas.",
                },
                {
                    q: "¿Son seguras para la salud? ¿El material es tóxico o puede causar alergias?",
                    a: "Sí, son completamente seguras. Utilizamos materiales biodegradables de grado alimentario, no tóxicos y libres de BPA. No causan alergias conocidas y son seguros para el contacto prolongado.",
                },
                {
                    q: "¿Cuánto duran? ¿Se desgastan más rápido que las metálicas?",
                    a: "Con un cuidado adecuado, nuestras boquillas tienen una vida útil excelente. Aunque son menos resistentes a impactos fuertes que el metal, con un uso normal pueden durar años. Son ideales para práctica diaria, estudiantes y músicos que buscan alternativas ligeras.",
                },
                {
                    q: "¿Puedo lavarlas con agua y jabón o se deterioran?",
                    a: "Sí, puedes lavarlas con agua tibia y jabón suave. Evita agua muy caliente (más de 60°C) ya que el material puede deformarse con calor excesivo. Sécalas bien después de limpiarlas.",
                },
                {
                    q: "¿Qué pasa si se me cae? ¿Son más frágiles que las de metal?",
                    a: "El material es resistente a caídas normales, pero sí es más susceptible a roturas por impactos fuertes comparado con el metal. Recomendamos guardarlas en su funda protectora cuando no las uses.",
                },
                {
                    q: "¿Ofrecen diferentes medidas y modelos para trompeta, trombón, tuba, etc.?",
                    a: "Sí, fabricamos boquillas para todos los instrumentos de viento metal: trompeta, trombón, tuba, bombardino, trompa, fliscorno, etc. Disponemos de diferentes medidas y especificaciones según tus necesidades.",
                },
                {
                    q: "¿Por qué debería elegir una boquilla de impresión 3D en lugar de una tradicional?",
                    a: "Nuestras boquillas ofrecen varias ventajas: son más ligeras, reducen la fatiga en sesiones largas, tienen un precio más accesible, son personalizables, y ofrecen un timbre único y cálido. Además, son una opción más sostenible y ecológica.",
                },
                {
                    q: "¿Se pueden personalizar (colores, grabados, iniciales)?",
                    a: "¡Sí! Ofrecemos personalización completa: colores a elegir, grabados personalizados, iniciales, logos de bandas, y hasta modificaciones en la forma según tus preferencias. También hacemos personalizaciones especiales para bandas y agrupaciones.",
                },
                {
                    q: "¿Tienen garantía o política de devolución?",
                    a: "Ofrecemos garantía de 30 días. Si no estás satisfecho, puedes devolverla dentro de este período (los gastos de envío de devolución corren por cuenta del cliente).",
                },
                {
                    q: "¿Son más ligeras? ¿Eso afecta a la forma de tocar?",
                    a: "Sí, son significativamente más ligeras que las metálicas. Esto puede requerir un pequeño período de adaptación, pero muchos músicos aprecian la reducción de peso, especialmente en sesiones largas o marchas.",
                },
            ],
        },
        {
            category: "Soporte Magnético para Dispositivos Electrónicos",
            items: [
                {
                    q: "¿Es compatible con todos los atriles de marcha?",
                    a: "Nuestro soporte magnético está diseñado específicamente para acoplarse a los atriles de marcha tradicionales, adaptándose perfectamente a su estructura estándar.",
                },
                {
                    q: "¿Los imanes son lo suficientemente fuertes como para aguantar el dispositivo con viento o movimiento mientras marcho?",
                    a: "Sí, utilizamos imanes de alta potencia que mantienen tu dispositivo (tablet o smartphone) firmemente sujeto incluso con viento moderado y durante el movimiento de la marcha. Han sido probados en condiciones reales de desfile.",
                },
                {
                    q: "¿Qué peso máximo de dispositivos puede sostener?",
                    a: "El soporte puede sostener cómodamente tablets y smartphones de tamaño estándar (hasta tablets de 12-13 pulgadas aproximadamente).",
                },
                {
                    q: "¿Se puede usar también en atriles normales de ensayo/concierto?",
                    a: "El soporte está optimizado específicamente para atriles de marcha tradicionales. Su compatibilidad con atriles de ensayo o concierto dependerá del diseño específico de cada atril.",
                },
                {
                    q: "¿Cómo se instala? ¿Es fácil de poner y quitar?",
                    a: "Muy fácil. Se acopla al atril de marcha en segundos. Puedes poner y quitar tu dispositivo rápidamente gracias al sistema magnético.",
                },
                {
                    q: "¿Daña el dispositivo o deja marcas?",
                    a: "No, el sistema magnético está diseñado para ser seguro con dispositivos electrónicos. Los imanes no afectan al funcionamiento de tablets o smartphones modernos.",
                },
                {
                    q: "¿Incluye todo lo necesario o tengo que comprar algo aparte?",
                    a: "El soporte incluye todo lo necesario para su instalación y uso inmediato: la base de sujeción al atril y la placa magnética que se adhiere a tu dispositivo.",
                },
                {
                    q: "¿Funciona en condiciones de lluvia o humedad?",
                    a: "El soporte está fabricado con materiales resistentes a la humedad. Sin embargo, debes proteger tu dispositivo electrónico de la lluvia usando fundas impermeables adecuadas.",
                },
                {
                    q: "¿Cuánto mide/pesa? ¿Es cómodo de transportar?",
                    a: "El soporte pesa solo 70 gramos, siendo extremadamente ligero y compacto. Está diseñado específicamente para facilitar su transporte junto con tu instrumento y equipo de marcha sin añadir apenas peso a tu mochila.",
                },
                {
                    q: "¿Es compatible con fundas de protección para el dispositivo?",
                    a: "Sí, la placa magnética adhesiva puede colocarse sobre fundas compatibles, aunque recomendamos fundas no muy gruesas para asegurar la máxima adherencia magnética.",
                },
                {
                    q: "¿El adhesivo de la placa magnética daña mi tablet/móvil?",
                    a: "No, utilizamos adhesivos de calidad que permiten adherir y retirar la placa sin dejar residuos ni dañar la superficie de tu dispositivo o funda.",
                },
            ],
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
                    Preguntas Frecuentes
                </h1>

                <div className="space-y-8">
                    {faqs.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">
                                {section.category}
                            </h2>
                            <div className="space-y-2">
                                {section.items.map((item, itemIdx) => (
                                    <FAQItem key={itemIdx} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
                    <h3 className="text-lg font-semibold mb-2">
                        ¿No encuentras lo que buscas?
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Estamos aquí para ayudarte con cualquier duda adicional.
                    </p>
                    <a
                        href="/contacto"
                        className="inline-block bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        Contáctanos
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
