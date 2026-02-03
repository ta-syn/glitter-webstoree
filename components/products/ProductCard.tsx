"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isAdded, setIsAdded] = React.useState(false);
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <motion.div
            className={cn("group relative bg-white rounded-md overflow-hidden", className)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Link href={`/products/${product.id}`} className="relative block w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                    {product.isNew && <Badge variant="gold">NEW</Badge>}
                    {product.onSale && <Badge variant="sale">SALE</Badge>}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className={cn(
                        "absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-sm transition-all duration-300 focus:opacity-100 focus:translate-x-0",
                        isWishlisted
                            ? "bg-champagne-gold text-white opacity-100 translate-x-0"
                            : "bg-white/80 text-dark-luxury opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-champagne-gold hover:text-white"
                    )}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                {/* Quick View Overlay (Sparkle Effect) */}
                <div className={cn(
                    "absolute inset-0 z-10 opacity-0 transition-opacity duration-500 pointer-events-none",
                    isHovered ? "opacity-100" : ""
                )}>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-60 mix-blend-screen"
                    >
                        <source src="/animations/anim_hover_sparkle_gold.webm" type="video/webm" />
                    </video>
                </div>

                {/* Add to Cart / Quick View Action */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-luxury flex gap-2">
                    <Button
                        className={cn(
                            "flex-1 backdrop-blur-md shadow-lg transition-colors",
                            isAdded ? "bg-success text-white" : "bg-white/90 hover:bg-champagne-gold text-dark-luxury"
                        )}
                        size="sm"
                        onClick={handleAddToCart}
                    >
                        {isAdded ? "Added!" : (
                            <><ShoppingBag size={16} className="mr-2" /> Add to Cart</>
                        )}
                    </Button>
                    <Button className="bg-white/90 hover:bg-dark-luxury hover:text-white backdrop-blur-md shadow-lg px-3" size="sm">
                        <Eye size={16} />
                    </Button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
                <div className="space-y-1">
                    <p className="text-xs text-warm-gray uppercase tracking-wider">{product.category}</p>
                    <Link href={`/products/${product.id}`}>
                        <h3 className="font-heading text-lg font-medium text-dark-luxury truncate group-hover:text-champagne-gold-dark transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Rating */}
                {product.rating && (
                    <div className="flex items-center gap-1">
                        <div className="flex text-champagne-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    fill={i < Math.floor(product.rating!) ? "currentColor" : "none"}
                                    className={i < Math.floor(product.rating!) ? "" : "text-gray-300"}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-400">({product.rating})</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2">
                    {product.onSale && product.salePrice ? (
                        <>
                            <span className="font-medium text-dark-luxury">${product.salePrice.toFixed(2)}</span>
                            <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="font-medium text-dark-luxury">${product.price.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
