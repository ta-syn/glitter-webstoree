"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import GlitterParticles from "@/components/animations/GlitterParticles";

export default function HeroSection() {
    const ref = React.useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden bg-dark-luxury">
            {/* Background Video */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-full z-0"
            >
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-luxury via-transparent to-transparent z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                    poster="/images/hero/hero_glitter_hero_01.png"
                    preload="auto"
                >
                    <source src="/animations/anim_hero_glitter_loop.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                {/* Glitter Particles Overlay */}
                <div className="absolute inset-0 z-20 opacity-60 pointer-events-none">
                    <GlitterParticles density={30} speed={0.5} />
                </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight overflow-hidden"
                >
                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-champagne-gold via-white to-champagne-gold animate-shimmer bg-[length:200%_100%]">
                        Illuminate Your Beauty
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl text-rose-gold/90 font-light max-w-2xl mb-10 leading-relaxed font-body"
                >
                    Premium glitter cosmetics crafted for unforgettable moments.
                    Experience the ultimate luxury.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
                >
                    <Link href="/collections/all" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            variant="primary"
                            className="w-full min-w-[180px] shadow-luxury-glow"
                        >
                            Shop Now
                        </Button>
                    </Link>
                    <Link href="/collections/all" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full min-w-[180px] text-white border-white/50 hover:bg-white/10 hover:border-champagne-gold"
                        >
                            Explore Collections
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="text-champagne-gold cursor-pointer"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </motion.div>
        </div>
    );
}
