import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SkipToContent from "@/components/layout/SkipToContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Glitter - Luxury Cosmetics",
        template: "%s | Glitter Cosmetics",
    },
    description: "Experience the ultimate luxury in glitter cosmetics. Premium formulas for eyes, lips, and body.",
    keywords: ["glitter makeup", "luxury cosmetics", "gold highlighter", "shimmer lips"],
    authors: [{ name: "Glitter Cosmetics" }],
    creator: "Glitter Cosmetics",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://glitter-luxury.com",
        title: "Glitter - Luxury Cosmetics",
        description: "Experience the ultimate luxury in glitter cosmetics. Premium formulas for eyes, lips, and body.",
        siteName: "Glitter Cosmetics",
        images: [
            {
                url: "/images/hero/hero_glitter_hero_01.png",
                width: 1200,
                height: 630,
                alt: "Glitter Luxury Cosmetics",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Glitter - Luxury Cosmetics",
        description: "Experience the ultimate luxury in glitter cosmetics.",
        images: ["/images/hero/hero_glitter_hero_01.png"],
        creator: "@glittercosmetics",
    },
    icons: {
        icon: "/images/hero/hero_glitter_hero_01.png", // Fallback for now
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(playfair.variable, inter.variable, cormorant.variable)}>
            <body className="font-body bg-pearl-white text-dark-luxury antialiased">
                <SkipToContent />
                <CartProvider>
                    <Header />
                    <main id="main-content">
                        {children}
                    </main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}
