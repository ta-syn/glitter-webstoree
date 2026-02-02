"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface FilterOption {
    id: string;
    label: string;
}

const priceRanges: FilterOption[] = [
    { id: "0-25", label: "Under $25" },
    { id: "25-50", label: "$25 - $50" },
    { id: "50-100", label: "$50 - $100" },
    { id: "100+", label: "$100+" },
];

const categories: FilterOption[] = [
    { id: "eyes", label: "Eyes" },
    { id: "lips", label: "Lips" },
    { id: "face", label: "Face" },
    { id: "body", label: "Body" },
    { id: "tools", label: "Tools" },
];

export default function FilterSidebar() {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = React.useState<string | null>(null);

    const toggleCategory = (id: string) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(c => c !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    return (
        <div className="space-y-8">
            {/* Categories */}
            <div>
                <h3 className="font-heading text-lg font-bold mb-4">Category</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="flex items-center gap-3 group"
                            >
                                <div className={cn(
                                    "w-5 h-5 border rounded-sm flex items-center justify-center transition-colors",
                                    selectedCategories.includes(category.id)
                                        ? "bg-dark-luxury border-dark-luxury text-champagne-gold"
                                        : "border-gray-300 group-hover:border-champagne-gold"
                                )}>
                                    {selectedCategories.includes(category.id) && <Check size={14} />}
                                </div>
                                <span className={cn(
                                    "text-sm transition-colors",
                                    selectedCategories.includes(category.id) ? "font-medium text-dark-luxury" : "text-warm-gray group-hover:text-dark-luxury"
                                )}>
                                    {category.label}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-champagne-gold/20" />

            {/* Price */}
            <div>
                <h3 className="font-heading text-lg font-bold mb-4">Price</h3>
                <div className="space-y-2">
                    {priceRanges.map((range) => (
                        <div key={range.id} className="flex items-center">
                            <button
                                onClick={() => setSelectedPrice(selectedPrice === range.id ? null : range.id)}
                                className="flex items-center gap-3 group"
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                    selectedPrice === range.id
                                        ? "border-dark-luxury"
                                        : "border-gray-300 group-hover:border-champagne-gold"
                                )}>
                                    {selectedPrice === range.id && <div className="w-2.5 h-2.5 rounded-full bg-dark-luxury" />}
                                </div>
                                <span className={cn(
                                    "text-sm transition-colors",
                                    selectedPrice === range.id ? "font-medium text-dark-luxury" : "text-warm-gray group-hover:text-dark-luxury"
                                )}>
                                    {range.label}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-champagne-gold/20" />

            <Button variant="outline" className="w-full text-xs">Clear All Filters</Button>
        </div>
    );
}
