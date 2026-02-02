"use client";

import * as React from "react";
import Link from "next/link";
import { Star, Minus, Plus, Heart, Share2, Truck, ShieldCheck } from "lucide-react";
import ProductGallery from "@/components/products/ProductGallery";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { useCart } from "@/context/CartContext";

interface ClientProductPageProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ClientProductPage({ product, relatedProducts }: ClientProductPageProps) {
    const [quantity, setQuantity] = React.useState(1);
    const [activeTab, setActiveTab] = React.useState<"description" | "usage" | "ingredients">("description");
    const [isAdding, setIsAdding] = React.useState(false);
    const { addItem } = useCart();

    const handleAddToCart = () => {
        setIsAdding(true);
        addItem(product, quantity);
        setTimeout(() => setIsAdding(false), 2000);
    };

    return (
        <div className="min-h-screen bg-pearl-white pb-20">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 text-sm text-warm-gray">
                <Link href="/" className="hover:text-dark-luxury">Home</Link>
                <span className="mx-2">/</span>
                <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-dark-luxury">{product.category}</Link>
                <span className="mx-2">/</span>
                <span className="text-dark-luxury font-medium">{product.name}</span>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Left Side: Gallery */}
                    <div className="w-full lg:w-[60%]">
                        <ProductGallery product={product} />
                    </div>

                    {/* Right Side: Product Info */}
                    <div className="w-full lg:w-[40%] space-y-8 sticky top-24 self-start">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-warm-gray border-warm-gray/30">{product.category}</Badge>
                                <div className="flex items-center gap-2 text-sm text-warm-gray">
                                    <div className="flex text-champagne-gold">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < Math.floor(product.rating || 5) ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                    <span>(128 Reviews)</span>
                                </div>
                            </div>

                            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-dark-luxury">{product.name}</h1>

                            <div className="flex items-baseline gap-4">
                                {product.onSale && product.salePrice ? (
                                    <>
                                        <span className="text-3xl font-bold text-dark-luxury">${product.salePrice.toFixed(2)}</span>
                                        <span className="text-xl text-warm-gray line-through">${product.price.toFixed(2)}</span>
                                        <Badge variant="sale">SAVE 20%</Badge>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold text-dark-luxury">${product.price.toFixed(2)}</span>
                                )}
                            </div>

                            <p className="text-warm-gray leading-relaxed text-lg">
                                {product.description || "Unlock your inner radiance with this premium shimmering formula. Long-lasting, lightweight, and designed for maximum impact."}
                            </p>
                        </div>

                        <div className="h-px bg-champagne-gold/20" />

                        {/* Selectors */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold uppercase tracking-wider text-dark-luxury">Shade</label>
                                <div className="flex gap-3">
                                    {['#D4AF37', '#E6C0C0', '#CD7F32', '#C0C0C0'].map((color, i) => (
                                        <button
                                            key={i}
                                            className={cn(
                                                "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-champagne-gold focus:ring-offset-2",
                                                i === 0 ? "border-dark-luxury scale-110" : "border-transparent"
                                            )}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-end gap-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold uppercase tracking-wider text-dark-luxury">Quantity</label>
                                    <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50"><Minus size={16} /></button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50"><Plus size={16} /></button>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <Button
                                        size="lg"
                                        variant="primary"
                                        className="w-full h-[50px] text-lg shadow-luxury-glow"
                                        onClick={handleAddToCart}
                                        isLoading={isAdding}
                                    >
                                        {isAdding ? "Adding..." : "Add to Cart"}
                                    </Button>
                                </div>
                            </div>

                            <Button variant="outline" size="lg" className="w-full h-[50px] border-dark-luxury hover:bg-dark-luxury hover:text-white">
                                Buy Now
                            </Button>

                            <div className="flex justify-between items-center pt-4">
                                <button className="flex items-center gap-2 text-sm font-medium text-dark-luxury hover:text-rose-gold transition-colors">
                                    <Heart size={18} /> Add to Wishlist
                                </button>
                                <button className="flex items-center gap-2 text-sm font-medium text-dark-luxury hover:text-rose-gold transition-colors">
                                    <Share2 size={18} /> Share
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="bg-white p-4 rounded-lg border border-gray-100 flex justify-around">
                            <div className="flex flex-col items-center text-center gap-1">
                                <Truck size={20} className="text-champagne-gold" />
                                <span className="text-xs font-medium">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-1">
                                <ShieldCheck size={20} className="text-champagne-gold" />
                                <span className="text-xs font-medium">Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-20 lg:mt-32 max-w-4xl mx-auto">
                    <div className="flex border-b border-gray-200">
                        {(["description", "usage", "ingredients"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2",
                                    activeTab === tab
                                        ? "border-dark-luxury text-dark-luxury"
                                        : "border-transparent text-gray-400 hover:text-dark-luxury"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="py-12 animate-fade-in min-h-[200px] text-warm-gray leading-relaxed text-lg">
                        {activeTab === "description" && (
                            <div className="space-y-4">
                                <p>Experience the ultimate luxury with our signature glitter formula. Designed for long-wear performance without the messy fallout, this product delivers intense, light-catching sparkle that lasts all day and night.</p>
                                <ul className="list-disc pl-5 space-y-2 mt-4">
                                    <li>High-impact pigment</li>
                                    <li>Water-resistant formula</li>
                                    <li>Vegan & Cruelty-free</li>
                                    <li>Suitable for sensitive skin</li>
                                </ul>
                            </div>
                        )}
                        {activeTab === "usage" && (
                            <div className="space-y-4">
                                <p>For best results, apply with a flat synthetic brush or fingertips. Layer for increased intensity.</p>
                                <p className="font-bold text-dark-luxury mt-4">Pro Tip:</p>
                                <p>Use our Glitter Primer beneath for 24-hour wear and zero fallout.</p>
                            </div>
                        )}
                        {activeTab === "ingredients" && (
                            <p>Polyethylene Terephthalate, Acrylates Copolymer, Glycerin, Water, Mica, Titanium Dioxide, Iron Oxides. Formulated without parabens, sulfates, or phthalates.</p>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-20 border-t border-champagne-gold/20 pt-20">
                    <FadeInOnScroll>
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-3xl md:text-4xl text-dark-luxury mb-4">You May Also Like</h2>
                        </div>
                    </FadeInOnScroll>
                    <FadeInOnScroll>
                        <ProductGrid products={relatedProducts} />
                    </FadeInOnScroll>
                </div>
            </div>

            {/* Mobile Sticky Add to Cart */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-40 flex items-center gap-4">
                <div className="flex-1">
                    <p className="font-bold text-dark-luxury truncate">{product.name}</p>
                    <p className="text-sm text-warm-gray">${product.salePrice || product.price}</p>
                </div>
                <Button onClick={handleAddToCart} isLoading={isAdding} className="flex-1 shadow-luxury-glow">Add to Cart</Button>
            </div>
        </div>
    );
}
