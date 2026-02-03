import * as React from "react";
import { Metadata } from "next";
import { products, collectionsData } from "@/lib/data/products";
import CollectionClientPage from "./client-page";

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const info = collectionsData[category as keyof typeof collectionsData] || collectionsData["default"];

    return {
        title: `${info.title} | Glitter`,
        description: info.description,
    };
}

export default async function CollectionPage({ params }: PageProps) {
    const { category } = await params;
    const info = collectionsData[category as keyof typeof collectionsData];

    if (!info && category !== 'all') {
        // If strict checking is needed, we could 404. 
        // For now, let's allow 'all' or fallback to default if not found but valid route
    }

    const displayInfo = info || collectionsData["default"];

    // Filter products based on category logic
    let filteredProducts = products;
    if (category !== 'all') {
        if (category === 'new-arrivals') {
            filteredProducts = products.filter(p => p.isNew);
        } else if (category === 'best-sellers') {
            filteredProducts = products.filter(p => (p.reviews && p.reviews > 100) || (p.rating && p.rating >= 4.8));
        } else if (category === 'party' || category === 'bridal' || category === 'night') {
            // Mock logic: randomly select some products for these thematic collections
            // In a real app, products would have 'collections' tag
            filteredProducts = products.filter((_, i) => i % 2 === 0);
        } else {
            // Category match (lowercase)
            filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
    }

    // If no specific filtered products found (e.g. empty category match), just show all for demo
    if (filteredProducts.length === 0) filteredProducts = products;

    return (
        <CollectionClientPage
            category={category}
            collectionInfo={displayInfo}
            products={filteredProducts}
        />
    );
}

// Static params for SSG
export async function generateStaticParams() {
    return [
        { category: "all" },
        { category: "eyes" },
        { category: "lips" },
        { category: "face" },
        { category: "new-arrivals" },
        { category: "best-sellers" },
        { category: "party" },
        { category: "bridal" },
        { category: "night" },
    ];
}
