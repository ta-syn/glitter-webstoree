"use client";

import * as React from "react";
import { SlidersHorizontal, ArrowUpDown, X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MobileFilterBarProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    selectedPrice: string | null;
    setSelectedPrice: (price: string | null) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    onClearAll: () => void;
}

const priceRanges = [
    { id: "0-25", label: "Under $25" },
    { id: "25-50", label: "$25 - $50" },
    { id: "50-100", label: "$50 - $100" },
    { id: "100+", label: "$100+" },
];

const categories = [
    { id: "eyes", label: "Eyes" },
    { id: "lips", label: "Lips" },
    { id: "face", label: "Face" },
    { id: "body", label: "Body" },
    { id: "tools", label: "Tools" },
];

const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "newest", label: "Newest Arrivals" },
    { id: "price-low-high", label: "Price: Low to High" },
    { id: "price-high-low", label: "Price: High to Low" },
    { id: "rating", label: "Top Rated" },
];

export default function MobileFilterBar({
    selectedCategories,
    setSelectedCategories,
    selectedPrice,
    setSelectedPrice,
    sortBy,
    setSortBy,
    onClearAll
}: MobileFilterBarProps) {
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [isSortOpen, setIsSortOpen] = React.useState(false);

    const toggleCategory = (id: string) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(c => c !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    const activeFilterCount = selectedCategories.length + (selectedPrice ? 1 : 0);

    return (
        <>
            <div className="lg:hidden sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        "flex-1 justify-center gap-2 border-gray-200 relative",
                        activeFilterCount > 0 && "border-dark-luxury text-dark-luxury bg-pearl-white"
                    )}
                    onClick={() => setIsFilterOpen(true)}
                >
                    <SlidersHorizontal size={16} /> Filters
                    {activeFilterCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-dark-luxury text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">
                            {activeFilterCount}
                        </span>
                    )}
                </Button>
                <div className="relative flex-1">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center gap-2 border-gray-200"
                        onClick={() => setIsSortOpen(true)}
                    >
                        <ArrowUpDown size={16} /> Sort
                    </Button>
                </div>
            </div>

            {/* Filter Drawer Shell */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 lg:hidden animate-in fade-in duration-300">
                    <div className="absolute right-0 top-0 h-full w-[85%] bg-white p-6 shadow-luxury-lg overflow-y-auto animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-heading text-xl font-bold">Filters</h2>
                            <button onClick={() => setIsFilterOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="font-heading text-lg font-bold mb-4">Category</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => toggleCategory(category.id)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-sm transition-all duration-200 border",
                                                selectedCategories.includes(category.id)
                                                    ? "bg-dark-luxury text-white border-dark-luxury"
                                                    : "bg-white text-warm-gray border-gray-200"
                                            )}
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-heading text-lg font-bold mb-4">Price</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {priceRanges.map((range) => (
                                        <button
                                            key={range.id}
                                            onClick={() => setSelectedPrice(selectedPrice === range.id ? null : range.id)}
                                            className={cn(
                                                "w-full text-left px-4 py-3 rounded-lg text-sm flex items-center justify-between border",
                                                selectedPrice === range.id
                                                    ? "border-dark-luxury bg-pearl-white text-dark-luxury font-bold"
                                                    : "border-gray-100 text-warm-gray"
                                            )}
                                        >
                                            {range.label}
                                            {selectedPrice === range.id && <Check size={16} className="text-champagne-gold" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 space-y-3">
                                <Button
                                    className="w-full bg-dark-luxury text-white"
                                    onClick={() => setIsFilterOpen(false)}
                                >
                                    Show Results
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full text-dark-luxury"
                                    onClick={onClearAll}
                                >
                                    Clear All
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sort Modal Shell */}
            {isSortOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 flex items-end lg:hidden animate-in fade-in duration-300">
                    <div className="w-full bg-white rounded-t-2xl p-6 shadow-luxury-lg animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-heading text-xl font-bold">Sort By</h2>
                            <button onClick={() => setIsSortOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-1">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.id}
                                    className={cn(
                                        "w-full text-left px-4 py-4 rounded-lg text-sm transition-colors flex items-center justify-between",
                                        sortBy === option.id ? "bg-pearl-white text-dark-luxury font-bold" : "text-warm-gray hover:bg-gray-50"
                                    )}
                                    onClick={() => {
                                        setSortBy(option.id);
                                        setIsSortOpen(false);
                                    }}
                                >
                                    {option.label}
                                    {sortBy === option.id && <Check size={18} className="text-champagne-gold" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
