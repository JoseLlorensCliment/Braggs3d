import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const product = PRODUCTS.find((p) => p.id === parseInt(id));

    // Determine gallery up front
    const gallery = product?.images?.length > 0 ? product.images : (product ? [product.img] : []);
    const [activeImage, setActiveImage] = useState(gallery[0] || "");

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
                <Link to="/shop" className="text-blue-600 hover:underline">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <Link to="/shop" className="text-gray-500 hover:text-black mb-6 inline-block transition">
                &larr; Volver al catálogo
            </Link>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Image Gallery */}
                <div className="flex flex-col gap-4">
                    <motion.div
                        className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={activeImage}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain"
                        />
                    </motion.div>

                    {gallery.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {gallery.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${activeImage === img ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <motion.div
                    className="flex flex-col justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                    <p className="text-2xl font-light text-gray-700 mb-6">{product.price} €</p>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 mb-8"
                    >
                        Añadir al carrito
                    </button>

                    {product.description && (
                        <div className="prose prose-sm md:prose-base text-gray-600 mb-6">
                            <p>{product.description}</p>
                        </div>
                    )}

                    {product.specs && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">Especificaciones:</h3>
                            <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                {product.specs.map((spec, index) => (
                                    <li key={index}>{spec}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {product.disclaimer && (
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mt-4">
                            <p className="text-sm text-gray-500 italic">
                                <span className="font-semibold not-italic">Aviso Importante: </span>
                                {product.disclaimer}
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
