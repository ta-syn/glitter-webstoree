"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { collections } from "@/lib/data/products";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

export default function CollectionShowcase() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <FadeInOnScroll>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-dark-luxury text-center mb-12 sm:mb-16">
                        Curated Collections
                    </h2>
                </FadeInOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <FadeInOnScroll key={index}>
                            <div className="group relative h-[500px] w-full overflow-hidden rounded-lg cursor-pointer">
                                {/* Background Image */}
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:via-black/40" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0.8 }}
                                        whileHover={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="font-heading text-3xl font-bold mb-2">{collection.title}</h3>
                                        <p className="text-gray-200 mb-6 max-w-xs">{collection.description}</p>

                                        <Link href={collection.link}>
                                            <Button variant="primary" className="bg-white text-dark-luxury hover:bg-champagne-gold border-none">
                                                Shop Collection
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
