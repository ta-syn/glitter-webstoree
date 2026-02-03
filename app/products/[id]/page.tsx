import * as React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { products as featuredProducts, getProductById } from "@/lib/data/products";
import ProductSchema from "@/components/seo/ProductSchema";
import ClientProductPage from "./ClientProductPage";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const product = getProductById(id);
    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | Glitter`,
        description: `Shop ${product.name} - ${product.description || "Premium luxury cosmetics"}`,
        openGraph: {
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    // Find related products (excluding current)
    const relatedProducts = featuredProducts.filter(p => p.id !== id).slice(0, 4);

    return (
        <>
            <ProductSchema product={product} />
            <ClientProductPage product={product} relatedProducts={relatedProducts} />
        </>
    );
}
