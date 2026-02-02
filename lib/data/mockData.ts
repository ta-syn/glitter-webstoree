import { Product } from "@/types";

export const featuredProducts: Product[] = [
    {
        id: "1",
        name: "Golden Hour Shimmer Pot",
        price: 32.00,
        image: "/images/products/product_glitter_gold_01.png",
        category: "Eyes",
        rating: 4.8,
        isNew: true,
    },
    {
        id: "2",
        name: "Rose Quartz Lustre Lip",
        price: 28.00,
        image: "/images/products/product_glitter_rose_02.png",
        category: "Lips",
        rating: 4.9,
        onSale: true,
        salePrice: 24.00,
    },
    {
        id: "3",
        name: "Starlight Body Glitter",
        price: 45.00,
        image: "/images/products/product_glitter_silver_03.png",
        category: "Body",
        rating: 4.7,
    },
    {
        id: "4",
        name: "Midnight Sparkle Palette",
        price: 58.00,
        image: "/images/products/product_glitter_gold_01.png",
        category: "Eyes",
        rating: 5.0,
        isNew: true,
    },
    {
        id: "5",
        name: "Diamond Dust Highlighter",
        price: 38.00,
        image: "/images/products/product_glitter_rose_02.png",
        category: "Face",
        rating: 4.6,
    },
    {
        id: "6",
        name: "Champagne Pop Gel",
        price: 22.00,
        image: "/images/products/product_glitter_silver_03.png",
        category: "Eyes",
        rating: 4.5,
    },
    {
        id: "7",
        name: "Crystal Clear Gloss",
        price: 26.00,
        image: "/images/products/product_glitter_rose_02.png",
        category: "Lips",
        rating: 4.8,
    },
    {
        id: "8",
        name: "Gilded Brush Set",
        price: 65.00,
        image: "/images/products/product_glitter_gold_01.png",
        category: "Tools",
        rating: 4.9,
        onSale: true,
        salePrice: 50.00,
    },
];

export const collections = [
    {
        title: "Party Glam",
        description: "Stand out at every celebration with our high-impact glitters.",
        image: "/images/collections/party.jpg",
        link: "/collections/party",
    },
    {
        title: "Bridal Elegance",
        description: "Subtle, romantic shimmer for your special day.",
        image: "/images/collections/bridal.jpg",
        link: "/collections/bridal",
    },
    {
        title: "Night Out Luxe",
        description: "Bold, dramatic looks that own the night.",
        image: "/images/collections/night.jpg",
        link: "/collections/night",
    },
];

export const testimonials = [
    {
        name: "Sophia V.",
        quote: "The pivot to this brand changed my makeup game forever. The glitter stays on all night!",
        rating: 5,
    },
    {
        name: "Amelia R.",
        quote: "Absolutely stunning packaging and the product quality is unmatched. Worth every penny.",
        rating: 5,
    },
    {
        name: "Isabella L.",
        quote: "I wore the Rose Quartz Lustre for my wedding and felt like a princess. Highly recommend.",
        rating: 5,
    },
];
