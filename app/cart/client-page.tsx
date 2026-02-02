"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck, Tag, Check, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { featuredProducts } from "@/lib/data/mockData";
import ProductGrid from "@/components/products/ProductGrid";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { useCart } from "@/context/CartContext";

export default function ClientCartPage() {
    const { cartItems, updateQuantity, removeItem, cartTotal: subtotal } = useCart();
    const [discountCode, setDiscountCode] = React.useState("");
    const [isApplyingCode, setIsApplyingCode] = React.useState(false);
    const [discountApplied, setDiscountApplied] = React.useState(false);

    // Recommendations - show products not in cart
    const recommendedProducts = featuredProducts.slice(0, 4);

    const handleApplyDiscount = (e: React.FormEvent) => {
        e.preventDefault();
        if (!discountCode) return;
        setIsApplyingCode(true);
        setTimeout(() => {
            setIsApplyingCode(false);
            if (discountCode.toUpperCase() === "GLITTER10") {
                setDiscountApplied(true);
            }
        }, 1000);
    };

    const discountAmount = discountApplied ? subtotal * 0.1 : 0;
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal - discountAmount + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-pearl-white to-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md"
                >
                    {/* Empty Cart Icon */}
                    <div className="relative w-32 h-32 mx-auto mb-8">
                        <div className="absolute inset-0 bg-champagne-gold/10 rounded-full animate-pulse" />
                        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                            <ShoppingBag size={48} className="text-champagne-gold" />
                        </div>
                    </div>

                    <h1 className="font-heading text-4xl md:text-5xl mb-4 text-dark-luxury">
                        Your Cart is Empty
                    </h1>
                    <p className="text-warm-gray mb-8 text-lg leading-relaxed">
                        Looks like you haven&apos;t added any sparkle to your life yet.
                        Discover our luxury collection and shine bright!
                    </p>
                    <Link href="/collections/all">
                        <Button size="lg" className="shadow-luxury-glow min-w-[200px]">
                            <Sparkles size={18} className="mr-2" />
                            Start Shopping
                        </Button>
                    </Link>
                </motion.div>

                {/* Show recommendations even when cart is empty */}
                <div className="container mx-auto px-4 mt-20">
                    <FadeInOnScroll>
                        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center text-dark-luxury">
                            Bestsellers You&apos;ll Love
                        </h3>
                    </FadeInOnScroll>
                    <ProductGrid products={recommendedProducts} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-pearl-white/30 to-white py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-dark-luxury mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-warm-gray text-lg">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready to sparkle
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cartItems.map((item) => {
                                const itemPrice = item.onSale && item.salePrice ? item.salePrice : item.price;
                                const itemTotal = itemPrice * item.quantity;

                                return (
                                    <motion.div
                                        key={`${item.id}-${item.selectedVariant || 'default'}`}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="group relative bg-white p-6 rounded-xl border border-gray-100 hover:border-champagne-gold/30 hover:shadow-lg transition-all duration-300"
                                    >
                                        {/* Glitter effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-champagne-gold/0 via-champagne-gold/5 to-champagne-gold/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

                                        <div className="relative flex flex-col sm:flex-row gap-6">
                                            {/* Image */}
                                            <Link
                                                href={`/products/${item.id}`}
                                                className="relative w-full sm:w-32 aspect-square rounded-lg overflow-hidden bg-gray-50 shrink-0 group/image"
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover/image:scale-105 transition-transform duration-500"
                                                />
                                                {item.onSale && (
                                                    <div className="absolute top-2 left-2 bg-error text-white text-xs font-bold px-2 py-1 rounded">
                                                        SALE
                                                    </div>
                                                )}
                                            </Link>

                                            {/* Info */}
                                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                                <div>
                                                    <div className="flex justify-between items-start gap-4 mb-2">
                                                        <Link
                                                            href={`/products/${item.id}`}
                                                            className="font-heading text-xl font-bold text-dark-luxury hover:text-champagne-gold transition-colors"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <div className="text-right shrink-0">
                                                            <p className="font-bold text-xl text-dark-luxury">
                                                                ${itemTotal.toFixed(2)}
                                                            </p>
                                                            {item.onSale && item.salePrice && (
                                                                <p className="text-sm text-gray-400 line-through">
                                                                    ${(item.price * item.quantity).toFixed(2)}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-3 text-sm text-warm-gray mb-1">
                                                        <span className="flex items-center gap-1">
                                                            <span className="text-champagne-gold">•</span>
                                                            {item.category}
                                                        </span>
                                                        {item.selectedVariant && (
                                                            <span className="flex items-center gap-1">
                                                                <span className="text-champagne-gold">•</span>
                                                                {item.selectedVariant}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-sm text-warm-gray">
                                                        ${itemPrice.toFixed(2)} each
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm text-warm-gray font-medium">Quantity:</span>
                                                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="p-2 px-3 hover:bg-champagne-gold/10 text-gray-600 hover:text-champagne-gold disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                                                disabled={item.quantity <= 1}
                                                                aria-label="Decrease quantity"
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                            <span className="w-12 text-center text-base font-bold text-dark-luxury">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="p-2 px-3 hover:bg-champagne-gold/10 text-gray-600 hover:text-champagne-gold transition-colors"
                                                                aria-label="Increase quantity"
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-error transition-colors font-medium group/remove"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={18} className="group-hover/remove:scale-110 transition-transform" />
                                                        <span className="hidden sm:inline">Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Continue Shopping Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="pt-6"
                        >
                            <Link
                                href="/collections/all"
                                className="inline-flex items-center text-dark-luxury hover:text-champagne-gold font-medium gap-2 group transition-colors"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                Continue Shopping
                            </Link>
                        </motion.div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full lg:w-[420px] shrink-0"
                    >
                        <div className="bg-white p-8 rounded-2xl border-2 border-champagne-gold/20 shadow-xl sticky top-24">
                            <h2 className="font-heading text-2xl font-bold mb-6 text-dark-luxury flex items-center gap-2">
                                <Sparkles size={24} className="text-champagne-gold" />
                                Order Summary
                            </h2>

                            {/* Price Breakdown */}
                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="flex justify-between text-base">
                                    <span className="text-warm-gray">Subtotal</span>
                                    <span className="font-semibold text-dark-luxury">${subtotal.toFixed(2)}</span>
                                </div>

                                {discountApplied && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="flex justify-between text-success font-medium"
                                    >
                                        <span className="flex items-center gap-1">
                                            <Tag size={16} />
                                            Discount (10%)
                                        </span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </motion.div>
                                )}

                                <div className="flex justify-between text-base">
                                    <span className="text-warm-gray">Shipping</span>
                                    <span className={shipping === 0 ? "text-success font-semibold" : "text-dark-luxury"}>
                                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>

                                {shipping > 0 && subtotal < 100 && (
                                    <div className="bg-champagne-gold/10 border border-champagne-gold/20 rounded-lg p-3">
                                        <p className="text-xs text-champagne-gold-dark font-medium">
                                            💫 Add <span className="font-bold">${(100 - subtotal).toFixed(2)}</span> more for FREE shipping!
                                        </p>
                                        <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-champagne-gold to-champagne-gold-dark transition-all duration-500"
                                                style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-baseline mb-8 pb-6 border-b border-gray-100">
                                <span className="text-xl font-bold text-dark-luxury">Total</span>
                                <span className="text-4xl font-bold text-dark-luxury">${total.toFixed(2)}</span>
                            </div>

                            {/* Discount Code */}
                            <form onSubmit={handleApplyDiscount} className="mb-6">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                                    Promo Code
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter code (try GLITTER10)"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                        className="bg-gray-50 border-gray-200 focus:ring-champagne-gold focus:border-champagne-gold"
                                        disabled={discountApplied}
                                    />
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        disabled={isApplyingCode || discountApplied || !discountCode}
                                        className="shrink-0"
                                    >
                                        {isApplyingCode ? "..." : discountApplied ? <Check size={16} /> : "Apply"}
                                    </Button>
                                </div>
                                {discountApplied && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-success mt-2 flex items-center gap-1 font-medium"
                                    >
                                        <Check size={14} /> Code applied successfully!
                                    </motion.p>
                                )}
                            </form>

                            {/* Checkout Button */}
                            <Button
                                size="lg"
                                className="w-full h-14 text-lg shadow-luxury-glow mb-6 font-bold"
                            >
                                Proceed to Checkout
                            </Button>

                            {/* Trust Badges */}
                            <div className="space-y-3 text-center">
                                <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <ShieldCheck size={18} className="text-champagne-gold" />
                                    Secure 256-bit SSL Encryption
                                </p>
                                <div className="flex justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                    {/* Payment Icons */}
                                    <div className="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">VISA</div>
                                    <div className="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">MC</div>
                                    <div className="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">AMEX</div>
                                    <div className="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">PAY</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recommended Products */}
                <div className="mt-24">
                    <FadeInOnScroll>
                        <div className="text-center mb-12">
                            <h3 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-dark-luxury">
                                Complete Your Look
                            </h3>
                            <p className="text-warm-gray text-lg">
                                Customers who bought these items also loved...
                            </p>
                        </div>
                    </FadeInOnScroll>
                    <ProductGrid products={recommendedProducts} />
                </div>
            </div>
        </div>
    );
}
