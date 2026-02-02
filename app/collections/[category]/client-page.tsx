"use client";

import * as React from "react";
import { Product } from "@/types";
import ProductGrid from "@/components/products/ProductGrid";
import CollectionHero from "@/components/collections/CollectionHero";
import FilterSidebar from "@/components/collections/FilterSidebar";
import MobileFilterBar from "@/components/collections/MobileFilterBar";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

interface CollectionClientPageProps {
    category: string;
    collectionInfo: {
        title: string;
        description: string;
        image: string;
    };
    products: Product[];
}

export default function CollectionClientPage({ collectionInfo, products }: CollectionClientPageProps) {
    return (
        <div className="min-h-screen bg-pearl-white pb-20">
            <CollectionHero
                title={collectionInfo.title}
                description={collectionInfo.description}
                image={collectionInfo.image}
            />

            <MobileFilterBar />

            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        <FadeInOnScroll>
                            <ProductGrid products={products} />
                        </FadeInOnScroll>
                    </main>
                </div>
            </div>
        </div>
    );
}
