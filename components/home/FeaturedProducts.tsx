"use client";

import * as React from "react";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { featuredProducts } from "@/lib/data/products";
import Link from "next/link";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

export default function FeaturedProducts() {
    return (
        <section className="py-16 md:py-24 bg-pearl-white relative overflow-hidden">
            {/* Subtle Glitter Background */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[url('/images/subtle-glitter.png')] bg-repeat opacity-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeInOnScroll>
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-dark-luxury mb-4">Bestsellers</h2>
                        <p className="text-warm-gray text-lg max-w-2xl mx-auto">
                            Our most loved products, curated just for you. Discover the sparkle that everyone is talking about.
                        </p>
                    </div>
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <ProductGrid products={featuredProducts} />
                </FadeInOnScroll>

                <div className="mt-12 text-center">
                    <Link href="/collections/all">
                        <Button variant="outline" size="lg" className="min-w-[200px]">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
