"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, ArrowRight, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

const MotionImage = motion(Image);

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-pearl-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero/hero_glitter_hero_01.png"
                        alt="Luxury Cosmetics Background"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-dark-luxury/60 via-transparent to-pearl-white" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 mb-6 text-sm font-bold tracking-[0.2em] uppercase text-champagne-gold bg-dark-luxury/30 backdrop-blur-sm rounded-full">
                            Since 2024
                        </span>
                        <h1 className="font-heading text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-xl">
                            Our Story
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-200 font-accent italic">
                            &quot;Bringing professional-grade radiance to those who dare to shine.&quot;
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-pearl-white">
                <div className="container px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury-lg"
                            >
                                <Image
                                    src="/images/products/product_glitter_gold_01.png"
                                    alt="Glitter Philosophy"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-dark-luxury/10 rounded-2xl" />
                            </motion.div>
                        </div>

                        <div className="w-full lg:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-luxury mb-6">
                                    The GLITTER Philosophy
                                </h2>
                                <div className="space-y-6 text-lg text-warm-gray leading-relaxed">
                                    <p>
                                        Founded on the principle of radiance, GLITTER was born from a desire to bring professional-grade sparkle to every makeup lover. We believe that glitter isn&apos;t just an accessory—it&apos;s a statement of confidence.
                                    </p>
                                    <p>
                                        Our formulas are meticulously crafted in small batches to ensure maximum pigment payoff and zero fallout. We spent years researching the perfect balance between high-impact shine and comfortable, long-lasting wear.
                                    </p>
                                    <p>
                                        Today, GLITTER is more than a brand; it&apos;s a community of dreamers, artists, and rebels who aren&apos;t afraid to stand out in a world that often asks us to blend in.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-8 pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-champagne-gold/20 flex items-center justify-center text-champagne-gold">
                                            <Zap size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-dark-luxury">High Impact</p>
                                            <p className="text-sm text-warm-gray">Maximum radiance</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-rose-gold/20 flex items-center justify-center text-rose-gold">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-dark-luxury">Ethically Sourced</p>
                                            <p className="text-sm text-warm-gray">Kind to you & earth</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Commitment */}
            <section className="py-24 bg-dark-luxury text-white">
                <div className="container px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-champagne-gold mb-6">
                            Our Commitment
                        </h2>
                        <p className="text-xl text-gray-400">
                            We are dedicated to excellence in every sparkle, ensuring that your glow is as sustainable as it is stunning.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Globe className="text-champagne-gold" size={32} />,
                                title: "Sustainability",
                                desc: "100% biodegradable glitter options and eco-friendly packaging designed to minimize our footprint."
                            },
                            {
                                icon: <Heart className="text-rose-gold" size={32} />,
                                title: "Cruelty Free",
                                desc: "No animal testing, ever. We are proud to be PETA-certified and 100% vegan across our entire range."
                            },
                            {
                                icon: <Sparkles className="text-white" size={32} />,
                                title: "Pro Performance",
                                desc: "Tested by industry professionals to withstand the harshest stage lights and longest nights."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group"
                            >
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-champagne-gold/10 -z-10" />
                <div className="container px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-luxury mb-8">
                            Ready to shine bright?
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link href="/collections/all">
                                <Button size="lg" className="w-full sm:w-auto px-12 h-14 text-lg shadow-luxury-glow">
                                    Shop Collection <ArrowRight size={20} className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto px-12 h-14 text-lg border-dark-luxury hover:bg-dark-luxury hover:text-white">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
