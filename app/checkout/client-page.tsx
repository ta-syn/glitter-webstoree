"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Check,
    CreditCard,
    Truck,
    MapPin,
    User,
    ShieldCheck,
    Lock,
    Sparkles,
    ArrowLeft,
    Smartphone
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

// Steps definition
const STEPS = [
    { id: 1, label: "Information", icon: User },
    { id: 2, label: "Shipping", icon: Truck },
    { id: 3, label: "Payment", icon: CreditCard },
];

export default function ClientCheckoutPage() {
    const router = useRouter();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [currentStep, setCurrentStep] = React.useState(1);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [isThinking, setIsThinking] = React.useState(false); // For artificial delay

    // Form State
    const [formData, setFormData] = React.useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        postalCode: "",
        phone: "",
    });

    const [shippingMethod, setShippingMethod] = React.useState("standard"); // standard | express
    const [paymentMethod, setPaymentMethod] = React.useState("card"); // card | bkash

    // Derived values
    const shippingCost = shippingMethod === "express" ? 25 : (cartTotal > 100 ? 0 : 15);
    const total = cartTotal + shippingCost;

    // Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Navigation
    const nextStep = () => {
        setIsThinking(true);
        setTimeout(() => {
            setIsThinking(false);
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }, 600);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            clearCart();
            setIsProcessing(false);
            // In a real app, redirect to success page. 
            // For now verify with an alert or simple swap.
            alert("Order Placed Successfully! (Simulation)");
            router.push("/");
        }, 2000);
    };

    // Redirect if cart is empty
    React.useEffect(() => {
        if (cartItems.length === 0) {
            // router.push("/cart"); // Commented out for dev viewing
        }
    }, [cartItems, router]);

    return (
        <div className="min-h-screen bg-pearl-white lg:flex">
            {/* Left Column - Steps & Forms */}
            <div className="flex-1 p-4 md:p-8 lg:p-12 lg:border-r border-champagne-gold/20 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="font-heading text-2xl lg:text-3xl font-bold tracking-[0.2em] text-dark-luxury"
                        >
                            GLITTER
                        </Link>
                        <Link href="/cart" className="text-sm font-bold text-champagne-gold-dark hover:text-dark-luxury flex items-center gap-1">
                            <ArrowLeft size={14} /> Back to Cart
                        </Link>
                    </div>

                    {/* Progress Steps */}
                    <nav aria-label="Progress">
                        <ol role="list" className="flex items-center">
                            {STEPS.map((step, stepIdx) => (
                                <li key={step.id} className={`relative ${stepIdx !== STEPS.length - 1 ? "pr-8 sm:pr-20" : ""}`}>
                                    {step.id < currentStep ? (
                                        <>
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="h-0.5 w-full bg-champagne-gold" />
                                            </div>
                                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-champagne-gold hover:bg-champagne-gold-dark">
                                                <Check className="h-5 w-5 text-dark-luxury" aria-hidden="true" />
                                            </div>
                                        </>
                                    ) : step.id === currentStep ? (
                                        <>
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="h-0.5 w-full bg-gray-200" />
                                            </div>
                                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-champagne-gold bg-white" aria-current="step">
                                                <step.icon className="h-4 w-4 text-champagne-gold" aria-hidden="true" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="h-0.5 w-full bg-gray-200" />
                                            </div>
                                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                                                <step.icon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                            </div>
                                        </>
                                    )}
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider text-dark-luxury whitespace-nowrap">
                                        {step.label}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    {/* Form Content */}
                    <div className="pt-8">
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="font-heading text-2xl text-dark-luxury">Contact Information</h2>
                                        <Link href="/login" className="text-sm text-champagne-gold-dark underline font-medium">Log in</Link>
                                    </div>
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <h2 className="font-heading text-2xl text-dark-luxury mt-8">Shipping Address</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            label="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <Input
                                        label="Address"
                                        name="address"
                                        placeholder="123 Luxury Lane"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        label="Apartment, suite, etc. (optional)"
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleInputChange}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="City"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            label="Postal Code"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <Input
                                        label="Phone (for delivery updates)"
                                        name="phone"
                                        type="tel"
                                        icon={<Smartphone size={16} />}
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />

                                    <div className="pt-6">
                                        <Button
                                            onClick={nextStep}
                                            size="lg"
                                            className="w-full"
                                            isLoading={isThinking}
                                        >
                                            Continue to Shipping
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="border rounded-lg p-4 bg-white space-y-3 text-sm text-gray-600">
                                        <div className="flex justify-between border-b border-gray-100 pb-3">
                                            <span className="text-gray-500">Contact</span>
                                            <span className="font-medium text-dark-luxury">{formData.email || "sarah@example.com"}</span>
                                            <button onClick={() => setCurrentStep(1)} className="text-champagne-gold-dark underline">Change</button>
                                        </div>
                                        <div className="flex justify-between pt-1">
                                            <span className="text-gray-500">Ship to</span>
                                            <span className="font-medium text-dark-luxury truncate max-w-[200px]">{formData.address || "123 Luxury Lane, NY"}</span>
                                            <button onClick={() => setCurrentStep(1)} className="text-champagne-gold-dark underline">Change</button>
                                        </div>
                                    </div>

                                    <h2 className="font-heading text-2xl text-dark-luxury mt-8">Shipping Method</h2>
                                    <div className="space-y-4">
                                        {/* Standard */}
                                        <div
                                            onClick={() => setShippingMethod("standard")}
                                            className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-champagne-gold bg-champagne-gold/5 ring-1 ring-champagne-gold' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${shippingMethod === 'standard' ? 'border-champagne-gold' : 'border-gray-300'}`}>
                                                    {shippingMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-champagne-gold" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-dark-luxury">Standard Delivery</p>
                                                    <p className="text-xs text-warm-gray">4-7 Business Days</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-dark-luxury">{cartTotal > 100 ? "Free" : "$15.00"}</span>
                                        </div>

                                        {/* Express */}
                                        <div
                                            onClick={() => setShippingMethod("express")}
                                            className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-champagne-gold bg-champagne-gold/5 ring-1 ring-champagne-gold' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${shippingMethod === 'express' ? 'border-champagne-gold' : 'border-gray-300'}`}>
                                                    {shippingMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-champagne-gold" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-dark-luxury">Express Delivery</p>
                                                    <p className="text-xs text-warm-gray">1-3 Business Days</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-dark-luxury">$25.00</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-6">
                                        <Button onClick={prevStep} variant="ghost" className="flex-1">Back</Button>
                                        <Button onClick={nextStep} size="lg" className="flex-1" isLoading={isThinking}>Continue to Payment</Button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="border rounded-lg p-4 bg-white space-y-3 text-sm text-gray-600">
                                        {/* Simplified summary of prev steps */}
                                        <div className="flex justify-between border-b border-gray-100 pb-3">
                                            <span className="text-gray-500">Shipping</span>
                                            <span className="font-medium text-dark-luxury">{shippingMethod === 'express' ? 'Express' : 'Standard'}</span>
                                            <button onClick={() => setCurrentStep(2)} className="text-champagne-gold-dark underline">Change</button>
                                        </div>
                                    </div>

                                    <h2 className="font-heading text-2xl text-dark-luxury mt-8">Payment</h2>
                                    <p className="text-sm text-warm-gray mb-4">All transactions are secure and encrypted.</p>

                                    {/* Payment Method Selector */}
                                    <div className="space-y-4">
                                        {/* Credit Card Option */}
                                        <div
                                            onClick={() => setPaymentMethod("card")}
                                            className={`border rounded-xl overflow-hidden transition-all ${paymentMethod === 'card' ? 'border-champagne-gold shadow-md' : 'border-gray-200'}`}
                                        >
                                            <div className="p-4 flex items-center justify-between cursor-pointer bg-white">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-champagne-gold' : 'border-gray-300'}`}>
                                                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-champagne-gold" />}
                                                    </div>
                                                    <span className="font-bold text-dark-luxury">Credit or Debit Card</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <div className="w-8 h-5 bg-gray-100 rounded border border-gray-200" />
                                                    <div className="w-8 h-5 bg-gray-100 rounded border border-gray-200" />
                                                </div>
                                            </div>

                                            {/* Card Details Form - Only visible if active */}
                                            <AnimatePresence>
                                                {paymentMethod === 'card' && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="bg-gray-50/50 p-4 border-t border-gray-100 space-y-4"
                                                    >
                                                        <Input placeholder="Card number" icon={<CreditCard size={16} />} />
                                                        <Input placeholder="Name on card" />
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <Input placeholder="Expiration date (MM / YY)" />
                                                            <Input placeholder="Security code" icon={<Lock size={16} />} />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* bKash Option */}
                                        <div
                                            onClick={() => setPaymentMethod("bkash")}
                                            className={`border rounded-xl overflow-hidden transition-all ${paymentMethod === 'bkash' ? 'border-[#E2136E] shadow-md' : 'border-gray-200'}`}
                                        >
                                            <div className="p-4 flex items-center justify-between cursor-pointer bg-white">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'bkash' ? 'border-[#E2136E]' : 'border-gray-300'}`}>
                                                        {paymentMethod === 'bkash' && <div className="w-2.5 h-2.5 rounded-full bg-[#E2136E]" />}
                                                    </div>
                                                    <span className="font-bold text-dark-luxury">bKash Mobile Banking</span>
                                                </div>
                                                <div className="text-[#E2136E] font-bold text-xs border border-[#E2136E] px-2 py-0.5 rounded">
                                                    bKash
                                                </div>
                                            </div>

                                            {/* Bkash Details - Only visible if active */}
                                            <AnimatePresence>
                                                {paymentMethod === 'bkash' && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="bg-[#E2136E]/5 p-6 border-t border-[#E2136E]/20 text-center space-y-4"
                                                    >
                                                        <p className="text-sm text-gray-700">
                                                            Pay directly from your bKash account using the secure gateway.
                                                        </p>
                                                        <div className="bg-white p-4 rounded border-dashed border-2 border-[#E2136E]/30 max-w-xs mx-auto">
                                                            <p className="font-heading font-bold text-lg mb-2">Total: ${total.toFixed(2)}</p>
                                                            <p className="text-xs text-gray-500">You will be redirected to bKash gateway to complete payment.</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-6">
                                        <Button onClick={prevStep} variant="ghost" className="flex-1">Back</Button>
                                        <Button
                                            onClick={handlePlaceOrder}
                                            size="lg"
                                            className={`flex-1 ${paymentMethod === 'bkash' ? 'bg-[#E2136E] hover:bg-[#C1105E] text-white shadow-none' : ''}`} // specific styling for bkash action
                                            isLoading={isProcessing}
                                        >
                                            {paymentMethod === 'bkash' ? 'Pay with bKash' : 'Pay Now'}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Links */}
                    <div className="py-8 border-t border-gray-100 flex gap-6 text-xs text-gray-500">
                        <Link href="/policy" className="hover:underline">Refund Policy</Link>
                        <Link href="/policy" className="hover:underline">Shipping Policy</Link>
                        <Link href="/policy" className="hover:underline">Privacy Policy</Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="hidden lg:block w-[450px] bg-gray-50 border-l border-gray-200 p-12 overflow-y-auto">
                <div className="sticky top-12 space-y-8">
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.selectedVariant}`} className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-md border border-gray-200 overflow-hidden bg-white">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-dark-luxury">{item.name}</p>
                                    <p className="text-xs text-warm-gray">{item.selectedVariant}</p>
                                </div>
                                <p className="text-sm font-medium text-dark-luxury">
                                    ${(item.onSale && item.salePrice ? item.salePrice : item.price).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-6 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-medium text-dark-luxury">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipping</span>
                            <span className="font-medium text-dark-luxury">
                                {shippingMethod === 'express' ? '$25.00' : (shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`)}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 flex justify-between items-baseline">
                        <span className="text-base font-bold text-dark-luxury">Total</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs text-gray-500">USD</span>
                            <span className="text-2xl font-bold text-dark-luxury">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
