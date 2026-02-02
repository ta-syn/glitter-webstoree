"use client";

import * as React from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
    products: Product[];
    isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-md overflow-hidden animate-pulse">
                        <div className="aspect-[3/4] bg-gray-200" />
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-1/3" />
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="font-heading text-2xl text-dark-luxury mb-2">No products found</p>
                <p className="text-warm-gray mb-6">Try adjusting your filters or search criteria.</p>
                <Button variant="outline">Clear Filters</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filter & Sort Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-champagne-gold/20">
                <p className="text-sm text-warm-gray">Showing {products.length} results</p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <SlidersHorizontal size={16} /> Filter
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowUpDown size={16} /> Sort
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
