import { Product } from "@/types";

export const products: Product[] = [
    // --- EYES ---
    {
        id: "glitter-gold-001",
        name: "Golden Hour Shimmer Pot",
        price: 32.00,
        image: "/images/products/gold-pot.jpg",
        images: ["/images/products/gold-pot.jpg", "/images/products/gold-pot-2.jpg", "/images/products/gold-pot-swatch.jpg"],
        category: "Eyes",
        rating: 4.9,
        reviews: 245,
        isNew: true,
        description: "A creamy, highly pigmented gold shimmer that melts onto the lid for an ethereal glow.",
        stock: 'in-stock',
        colors: ['#D4AF37', '#FFD700'],
        size: '5g'
    },
    {
        id: "glitter-eyes-002",
        name: "Midnight Sparkle Palette",
        price: 58.00,
        image: "/images/products/palette.jpg",
        images: ["/images/products/palette.jpg", "/images/products/palette-open.jpg"],
        category: "Eyes",
        rating: 5.0,
        reviews: 89,
        isNew: true,
        description: "Deep, starry-night blues and silvers in a blendable, long-wear formula.",
        stock: 'in-stock',
        size: '12g'
    },
    {
        id: "glitter-eyes-003",
        name: "Champagne Pop Gel",
        price: 22.00,
        image: "/images/products/gel.jpg",
        category: "Eyes",
        rating: 4.5,
        reviews: 112,
        description: "A quick-drying glitter gel that adds instant party vibes to any look.",
        stock: 'in-stock',
        colors: ['#F7E7CE'],
        size: '8ml'
    },
    {
        id: "glitter-eyes-004",
        name: "Emerald City Liner",
        price: 24.00,
        salePrice: 19.00,
        onSale: true,
        image: "/images/products/liner.jpg",
        category: "Eyes",
        rating: 4.6,
        reviews: 78,
        description: "Metallic green liquid liner with micro-glitter particles.",
        stock: 'low-stock',
        colors: ['#50C878'],
        size: '2ml'
    },
    {
        id: "glitter-eyes-005",
        name: "Stardust Loose Pigment",
        price: 18.00,
        image: "/images/products/stardust.jpg",
        category: "Eyes",
        rating: 4.4,
        reviews: 56,
        description: "Ultra-fine loose glitter pigment for a high-intensity sparkle.",
        stock: 'in-stock',
        colors: ['#E6E6FA', '#FFC0CB'],
        size: '3g'
    },
    {
        id: "glitter-eyes-006",
        name: "Holographic Eye Topper",
        price: 26.00,
        image: "/images/products/holo-eye.jpg",
        category: "Eyes",
        rating: 4.7,
        reviews: 134,
        description: "Translucent holographic topper that transforms any eyeshadow.",
        stock: 'in-stock',
        size: '4ml'
    },

    // --- LIPS ---
    {
        id: "glitter-lips-001",
        name: "Rose Quartz Lustre Lip",
        price: 28.00,
        salePrice: 24.00,
        onSale: true,
        image: "/images/products/rose-lip.jpg",
        images: ["/images/products/rose-lip.jpg", "/images/products/rose-lip-swatch.jpg"],
        category: "Lips",
        rating: 4.9,
        reviews: 320,
        description: "A hydrating, non-sticky gloss infused with rose quartz crystals.",
        stock: 'in-stock',
        colors: ['#F4C2C2'],
        size: '6ml'
    },
    {
        id: "glitter-lips-002",
        name: "Crystal Clear Gloss",
        price: 26.00,
        image: "/images/products/gloss.jpg",
        category: "Lips",
        rating: 4.8,
        reviews: 156,
        description: "High-shine, glass-like finish that can be worn alone or over lipstick.",
        stock: 'in-stock',
        size: '6ml'
    },
    {
        id: "glitter-lips-003",
        name: "Ruby Dust Lipstick",
        price: 34.00,
        image: "/images/products/lipstick.jpg",
        category: "Lips",
        rating: 4.7,
        reviews: 98,
        description: "Rich red matte lipstick with a subtle gold glitter overlay.",
        stock: 'low-stock',
        colors: ['#E0115F'],
        size: '3.5g'
    },
    {
        id: "glitter-lips-004",
        name: "Diamond Drip Lip Oil",
        price: 25.00,
        image: "/images/products/lip-oil.jpg",
        category: "Lips",
        rating: 4.8,
        reviews: 210,
        isNew: true,
        description: "Nourishing lip oil with suspended diamond-like particles.",
        stock: 'in-stock',
        size: '5ml'
    },
    {
        id: "glitter-lips-005",
        name: "Sunset Shimmer Balm",
        price: 20.00,
        image: "/images/products/balm.jpg",
        category: "Lips",
        rating: 4.5,
        reviews: 67,
        description: "Tinted balm with a golden hour glow.",
        stock: 'in-stock',
        colors: ['#FF7F50'],
        size: '4g'
    },

    // --- FACE ---
    {
        id: "glitter-face-001",
        name: "Diamond Dust Highlighter",
        price: 38.00,
        image: "/images/products/highlighter.jpg",
        category: "Face",
        rating: 4.6,
        reviews: 189,
        description: "Finely milled highlighting powder for a blinding, wet-look glow.",
        stock: 'in-stock',
        colors: ['#FFFDD0'],
        size: '8g'
    },
    {
        id: "glitter-face-002",
        name: "Pearl Setting Spray",
        price: 30.00,
        image: "/images/products/spray.jpg",
        category: "Face",
        rating: 4.4,
        reviews: 115,
        description: "Sets makeup while adding a luminous, dewy finish.",
        stock: 'in-stock',
        size: '100ml'
    },
    {
        id: "glitter-face-003",
        name: "Glow Primer Serum",
        price: 42.00,
        image: "/images/products/primer.jpg",
        category: "Face",
        rating: 4.8,
        reviews: 256,
        isNew: true,
        description: "Illuminating primer that blurs imperfections and adds radiance.",
        stock: 'in-stock',
        size: '30ml'
    },
    {
        id: "glitter-face-004",
        name: "Bronzed Beauty Drops",
        price: 36.00,
        image: "/images/products/bronzer.jpg",
        category: "Face",
        rating: 4.7,
        reviews: 145,
        description: "Liquid bronzer with gold flecks used to mix with foundation.",
        stock: 'low-stock',
        colors: ['#CD7F32'],
        size: '15ml'
    },

    // --- BODY ---
    {
        id: "glitter-body-001",
        name: "Starlight Body Glitter",
        price: 45.00,
        image: "/images/products/body-glitter.jpg",
        category: "Body",
        rating: 4.7,
        reviews: 88,
        description: "Loose glitter for body and hair, perfect for festivals and parties.",
        stock: 'in-stock',
        size: '10g'
    },
    {
        id: "glitter-body-002",
        name: "Bronze Goddess Oil",
        price: 42.00,
        image: "/images/products/oil.jpg",
        category: "Body",
        rating: 4.9,
        reviews: 312,
        isNew: true,
        description: "Shimmering body oil that leaves skin glowing and scented like summer.",
        stock: 'in-stock',
        size: '100ml'
    },
    {
        id: "glitter-body-003",
        name: "Shimmer Body Lotion",
        price: 28.00,
        image: "/images/products/lotion.jpg",
        category: "Body",
        rating: 4.5,
        reviews: 95,
        description: "Hydrating lotion infused with subtle micro-shimmer.",
        stock: 'in-stock',
        size: '200ml'
    },
    {
        id: "glitter-body-004",
        name: "Festival Chunky Glitter",
        price: 15.00,
        image: "/images/products/chunky-glitter.jpg",
        category: "Body",
        rating: 4.3,
        reviews: 45,
        description: "Biodegradable chunky glitter for bold statement looks.",
        stock: 'in-stock',
        colors: ['#FF00FF', '#00FFFF', '#FFFF00'],
        size: '10g'
    },

    // --- TOOLS ---
    {
        id: "glitter-tools-001",
        name: "Gilded Brush Set",
        price: 65.00,
        salePrice: 50.00,
        onSale: true,
        image: "/images/products/brushes.jpg",
        category: "Tools",
        rating: 4.9,
        reviews: 178,
        description: "Synthetic, cruelty-free brushes with gold-plated handles.",
        stock: 'in-stock',
        size: 'Set of 10'
    },
    {
        id: "glitter-tools-002",
        name: "Precision Glitter Glue",
        price: 18.00,
        image: "/images/products/glue.jpg",
        category: "Tools",
        rating: 4.6,
        reviews: 230,
        description: "Long-wear adhesive specifically designed for loose glitter.",
        stock: 'in-stock',
        size: '10ml'
    },
    {
        id: "glitter-tools-003",
        name: "Luxury Makeup Bag",
        price: 40.00,
        image: "/images/products/bag.jpg",
        category: "Tools",
        rating: 4.8,
        reviews: 65,
        description: "Velvet makeup bag with gold zipper and sequin details.",
        stock: 'out-of-stock',
        colors: ['#000000', '#800020'],
        size: 'Medium'
    }
];

export const collectionsData = {
    "party": {
        title: "Party Collection",
        description: "Be the life of the party with high-impact glitters that never fade.",
        image: "/images/collections/party.jpg"
    },
    "bridal": {
        title: "Bridal Collection",
        description: "Soft, romantic shimmer for your special day.",
        image: "/images/collections/bridal.jpg"
    },
    "night": {
        title: "Night Glam",
        description: "Bold, dramatic looks for the ultimate night out.",
        image: "/images/collections/night.jpg"
    },
    "new-arrivals": {
        title: "New Arrivals",
        description: "The latest luxury drops. Be the first to shine.",
        image: "/images/collections/new.jpg"
    },
    "eyes": {
        title: "Eye Makeup",
        description: "Captivate with our range of glitter eyeshadows and liners.",
        image: "/images/collections/eyes-hero.jpg"
    },
    "lips": {
        title: "Lip Products",
        description: "Lustrous glosses and shimmering lipsticks.",
        image: "/images/collections/lips-hero.jpg"
    },
    "face": {
        title: "Face Products",
        description: "Illuminate your complexion with our highlighters and sprays.",
        image: "/images/collections/face-hero.jpg"
    },
    "default": {
        title: "Collection",
        description: "Explore our premium range of glitter cosmetics.",
        image: "/images/hero/hero-bg.jpg"
    }
};

export const testimonials = [
    {
        id: "t1",
        name: "Sophia V.",
        rating: 5,
        quote: "The pivot to this brand changed my makeup game forever. The glitter stays on all night!",
        date: "2 Days ago"
    },
    {
        id: "t2",
        name: "Amelia R.",
        rating: 5,
        quote: "Absolutely stunning packaging and the product quality is unmatched. Worth every penny.",
        date: "1 Week ago"
    },
    {
        id: "t3",
        name: "Isabella L.",
        rating: 5,
        quote: "I wore the Rose Quartz Lustre for my wedding and felt like a princess. Highly recommend.",
        date: "2 Weeks ago"
    },
    {
        id: "t4",
        name: "Charlotte M.",
        rating: 4,
        quote: "Love the highlighter, a little goes a long way. The packaging is to die for.",
        date: "3 Weeks ago"
    }
];

// --- HELPER FUNCTIONS ---

export function getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
    // Return products with high rating or manually selected
    return products.filter(product => (product.rating || 0) >= 4.8).slice(0, 8);
}

export function getRelatedProducts(currentProductId: string, category: string): Product[] {
    return products
        .filter(product => product.category.toLowerCase() === category.toLowerCase() && product.id !== currentProductId)
        .slice(0, 4);
}

export function getNewArrivals(): Product[] {
    return products.filter(product => product.isNew).slice(0, 4);
}
