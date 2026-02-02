import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CollectionShowcase from "@/components/home/CollectionShowcase";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import TrustBadges from "@/components/home/TrustBadges";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col overflow-x-hidden">
            <HeroSection />
            <TrustBadges />
            <FeaturedProducts />
            <CollectionShowcase />
            <Testimonials />
            <Newsletter />
        </main>
    );
}
