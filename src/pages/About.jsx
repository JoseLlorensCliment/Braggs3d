import React from "react";
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-6 text-gray-900">Sobre Nosotros</h1>
                    <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
                </div>

                {/* Content Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                            <span className="font-bold text-gray-900">Braggs 3D</span> nace en <span className="font-semibold">Abanilla, Murcia</span>,
                            de la mano de dos hermanos músicos, <span className="font-semibold">Roberto y Esteban</span>.
                        </p>

                        <p>
                            Ambos contamos con estudios profesionales de música en la especialidad de
                            <span className="font-semibold"> trombón y tuba</span> respectivamente, además de estudios universitarios en
                            <span className="font-semibold"> ADE e Ingeniería Mecánica</span>.
                        </p>

                        <p>
                            En la impresión 3D encontramos una herramienta perfecta para solucionar los problemas
                            que se nos presentaban en nuestras actuaciones, pero que en realidad son necesidades
                            comunes para todos los músicos.
                        </p>

                        <p>
                            Contamos con una extensa trayectoria como músicos de calle, formando parte de una
                            banda de música y una charanga, lo que nos ha hecho conocer a la perfección este
                            “mundillo” y conocer de primera mano las necesidades y peculiaridades de nosotros, los músicos.
                        </p>

                        <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-black italic">
                            "A través de nuestros productos, pretendemos facilitar la vida en la calle del músico
                            para que así se pueda centrar en lo importante: disfrutar tocando."
                        </div>

                        <p>
                            Nuestros productos ya están presentes en el día a día de más de <span className="font-bold">50 músicos</span>,
                            tanto españoles como extranjeros, que disfrutan de las soluciones basadas en la innovación que ofrecemos.
                        </p>

                        <p className="font-semibold text-gray-900">
                            Porque si nosotros confiamos en Braggs para nuestras actuaciones, tú también puedes hacerlo.
                        </p>
                    </div>

                    {/* Image/Visual Placeholder */}
                    <div className="relative h-full min-h-[400px] bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                        {/* Note for User: Add a real image here later */}
                        <div className="text-center p-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-gray-400 font-medium">Foto del equipo / taller</p>
                            <p className="text-gray-300 text-sm mt-2">(Recomendado añadir aquí)</p>
                        </div>
                    </div>

                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <a
                        href="/shop"
                        className="inline-block bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                        Descubre Nuestros Productos
                    </a>
                </div>

            </motion.div>
        </div>
    );
}
