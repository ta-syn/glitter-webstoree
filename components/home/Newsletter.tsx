"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

export default function Newsletter() {
    const [email, setEmail] = React.useState("");
    const [status, setStatus] = React.useState<"idle" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <section className="py-20 md:py-32 bg-dark-luxury relative overflow-hidden text-center text-white">
            {/* Background Particles (Simulated) */}
            <div className="absolute inset-0 bg-[url('/images/sparkle-overlay.png')] opacity-10 animate-pulse" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeInOnScroll>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-champagne-gold via-white to-champagne-gold">
                        Join Our Glitter Club
                    </h2>
                    <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto">
                        Be the first to know about new collections, exclusive offers, and beauty tips.
                        Unlock 10% off your first order.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-champagne-gold focus:border-champagne-gold h-12"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button variant="primary" size="lg" className="whitespace-nowrap h-12">
                            {status === "success" ? "Subscribed!" : "Subscribe"}
                        </Button>
                    </form>
                </FadeInOnScroll>
            </div>
        </section>
    );
}
