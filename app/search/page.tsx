"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { products as featuredProducts } from "@/lib/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { Sparkles, Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const results = React.useMemo(() => {
        if (!query.trim()) return [];
        return featuredProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    return (
        <div className="min-h-screen bg-pearl-white pb-20 pt-32">
            <div className="container mx-auto px-4">
                <FadeInOnScroll>
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne-gold/10 text-champagne-gold-dark text-sm font-bold uppercase tracking-widest mb-4">
                            <SearchIcon size={16} />
                            Search Results
                        </div>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold text-dark-luxury">
                            {query ? `Results for "${query}"` : "Search our collection"}
                        </h1>
                        <p className="text-warm-gray text-lg max-w-2xl mx-auto">
                            {results.length} {results.length === 1 ? 'sparkle' : 'sparkles'} found match your search.
                        </p>
                    </div>
                </FadeInOnScroll>

                {results.length > 0 ? (
                    <FadeInOnScroll>
                        <ProductGrid products={results} />
                    </FadeInOnScroll>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-luxury-sm">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                            <SearchIcon size={48} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-dark-luxury">No matches found</h2>
                            <p className="text-warm-gray">We couldn&apos;t find anything matching your search. Try different keywords or browse our best sellers.</p>
                        </div>
                        <div className="pt-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Popular Categories</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {["Eyes", "Lips", "Face", "New Arrivals"].map((cat) => (
                                    <a
                                        key={cat}
                                        href={`/collections/${cat.toLowerCase().replace(" ", "-")}`}
                                        className="px-6 py-3 bg-pearl-white rounded-full text-dark-luxury font-semibold hover:bg-champagne-gold/20 hover:text-champagne-gold-dark transition-all shadow-sm"
                                    >
                                        {cat}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Recommendations if few results */}
                {results.length < 4 && (
                    <div className="mt-32">
                        <FadeInOnScroll>
                            <div className="flex items-center gap-3 mb-12">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne-gold/30" />
                                <h2 className="font-heading text-3xl font-bold text-dark-luxury flex items-center gap-3">
                                    <Sparkles size={24} className="text-champagne-gold" />
                                    Bestsellers for You
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne-gold/30" />
                            </div>
                            <ProductGrid products={featuredProducts.slice(0, 4)} />
                        </FadeInOnScroll>
                    </div>
                )}
            </div>
        </div>
    );
}
