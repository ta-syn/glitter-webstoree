"use client";

import * as React from "react";
import { Product } from "@/types";
import ProductGrid from "@/components/products/ProductGrid";
import CollectionHero from "@/components/collections/CollectionHero";
import FilterSidebar from "@/components/collections/FilterSidebar";
import MobileFilterBar from "@/components/collections/MobileFilterBar";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { ArrowUpDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";

interface CollectionClientPageProps {
    category: string;
    collectionInfo: {
        title: string;
        description: string;
        image: string;
    };
    products: Product[];
}

export default function CollectionClientPage({ category, collectionInfo, products }: CollectionClientPageProps) {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
        category !== 'all' && category !== 'new-arrivals' && !['party', 'bridal', 'night'].includes(category)
            ? [category]
            : []
    );
    const [selectedPrice, setSelectedPrice] = React.useState<string | null>(null);
    const [sortBy, setSortBy] = React.useState<string>("featured");

    const filteredProducts = React.useMemo(() => {
        let result = [...products];

        // Apply Category Filter (only if we have selections and we aren't in a special collection that should override)
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category.toLowerCase()));
        }

        // Apply Price Filter
        if (selectedPrice) {
            if (selectedPrice === "0-25") result = result.filter(p => p.price < 25);
            else if (selectedPrice === "25-50") result = result.filter(p => p.price >= 25 && p.price <= 50);
            else if (selectedPrice === "50-100") result = result.filter(p => p.price >= 50 && p.price <= 100);
            else if (selectedPrice === "100+") result = result.filter(p => p.price > 100);
        }

        // Apply Sorting
        switch (sortBy) {
            case "price-low-high":
                result.sort((a, b) => {
                    const priceA = a.salePrice ?? a.price;
                    const priceB = b.salePrice ?? b.price;
                    return priceA - priceB;
                });
                break;
            case "price-high-low":
                result.sort((a, b) => {
                    const priceA = a.salePrice ?? a.price;
                    const priceB = b.salePrice ?? b.price;
                    return priceB - priceA;
                });
                break;
            case "rating":
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case "newest":
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            default:
                // Default order from data
                break;
        }

        return result;
    }, [products, selectedCategories, selectedPrice, sortBy]);

    const handleClearAll = () => {
        setSelectedCategories([]);
        setSelectedPrice(null);
        setSortBy("featured");
    };

    return (
        <div className="min-h-screen bg-pearl-white pb-20">
            <CollectionHero
                title={collectionInfo.title}
                description={collectionInfo.description}
                image={collectionInfo.image}
            />

            <MobileFilterBar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onClearAll={handleClearAll}
            />

            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24">
                            <FilterSidebar
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                selectedPrice={selectedPrice}
                                setSelectedPrice={setSelectedPrice}
                                onClearAll={handleClearAll}
                            />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-warm-gray text-sm">
                                Showing <span className="text-dark-luxury font-bold">{filteredProducts.length}</span> products
                            </p>

                            {/* Desktop Sort - Only show on lg screens and above */}
                            <div className="hidden lg:flex items-center gap-2">
                                <span className="text-sm text-warm-gray flex items-center gap-1">
                                    <ArrowUpDown size={14} /> Sort by:
                                </span>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-[180px] bg-white border-gray-200">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="featured">Featured</SelectItem>
                                        <SelectItem value="newest">Newest Arrivals</SelectItem>
                                        <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                                        <SelectItem value="rating">Top Rated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <FadeInOnScroll>
                                <ProductGrid products={filteredProducts} />
                            </FadeInOnScroll>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                                <p className="text-warm-gray mb-4">No products match your selected filters.</p>
                                <button
                                    onClick={handleClearAll}
                                    className="text-dark-luxury font-bold underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
