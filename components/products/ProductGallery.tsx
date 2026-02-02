"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RefreshCw, Maximize2 } from "lucide-react";
import { Product } from "@/types";

interface ProductGalleryProps {
    product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = React.useState(product.image);
    const [isZoomed, setIsZoomed] = React.useState(false);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const allImages = [product.image, ...(product.images || [])];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-8 h-full">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:w-24 scrollbar-hide">
                {allImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={cn(
                            "relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-md overflow-hidden border-2 transition-all",
                            selectedImage === img ? "border-champagne-gold" : "border-transparent opacity-70 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`${product.name} view ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Display */}
            <div className="relative flex-1 aspect-[3/4] lg:aspect-square bg-white rounded-lg overflow-hidden border border-gray-100 group">
                <div
                    className="w-full h-full relative cursor-zoom-in"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full relative"
                        >
                            <Image
                                src={selectedImage}
                                alt={product.name}
                                fill
                                className={cn(
                                    "object-cover transition-transform duration-200",
                                    isZoomed ? "scale-150" : "scale-100"
                                )}
                                style={isZoomed ? {
                                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                                } : undefined}
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 360 Toggle (Visual Only) */}
                <button className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-dark-luxury shadow-md hover:bg-champagne-gold hover:text-white transition-colors">
                    <RefreshCw size={20} />
                    <span className="sr-only">View 360</span>
                </button>

                {/* Fullscreen Toggle (Visual Only) */}
                <button className="absolute bottom-4 right-16 p-2 bg-white/80 backdrop-blur rounded-full text-dark-luxury shadow-md hover:bg-champagne-gold hover:text-white transition-colors">
                    <Maximize2 size={20} />
                    <span className="sr-only">Fullscreen</span>
                </button>

                {/* New/Sale Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <span className="bg-champagne-gold text-dark-luxury text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">New</span>}
                    {product.onSale && <span className="bg-error text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Sale</span>}
                </div>
            </div>
        </div>
    );
}
