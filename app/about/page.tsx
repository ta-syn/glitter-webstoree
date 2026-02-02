"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-dark-luxury">
            <Header />
            <div className="pt-32 pb-20 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h1 className="font-heading text-5xl font-bold text-champagne-gold mb-8">Our Story</h1>
                    <div className="prose prose-invert lg:prose-xl mx-auto text-gray-300">
                        <p>
                            Founded on the principle of radiance, GLITTER was born from a desire to bring professional-grade sparkle to every makeup lover.
                        </p>
                        <p>
                            Our products are curated for the bold, the dreamers, and those who aren't afraid to shine bright. We use only the finest ethically sourced ingredients to ensure your glow is as kind as it is beautiful.
                        </p>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
