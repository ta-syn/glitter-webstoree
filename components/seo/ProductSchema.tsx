import { Product } from "@/types";

export default function ProductSchema({ product }: { product: Product }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image,
        description: product.description,
        brand: {
            "@type": "Brand",
            name: "Glitter"
        },
        offers: {
            "@type": "Offer",
            url: `https://glitter-luxury.com/products/${product.id}`,
            priceCurrency: "USD",
            price: product.onSale && product.salePrice ? product.salePrice : product.price,
            availability: product.stock === 'out-of-stock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition"
        },
        aggregateRating: product.rating ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews || 0
        } : undefined
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
