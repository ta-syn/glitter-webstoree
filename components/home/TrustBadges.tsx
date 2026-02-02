import { Truck, ShieldCheck, RefreshCw, MessageCircle } from "lucide-react";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

const badges = [
    { icon: Truck, label: "Free Shipping", desc: "On all orders over $75" },
    { icon: ShieldCheck, label: "Secure Payment", desc: "100% secure checkout" },
    { icon: RefreshCw, label: "Easy Returns", desc: "30-day return policy" },
    { icon: MessageCircle, label: "24/7 Support", desc: "Expert beauty advice" },
];

export default function TrustBadges() {
    return (
        <section className="py-12 border-t border-b border-champagne-gold/10 bg-pearl-white">
            <div className="container mx-auto px-4">
                <FadeInOnScroll>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {badges.map((badge, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                <div className="w-12 h-12 mb-4 rounded-full bg-champagne-gold/10 flex items-center justify-center text-dark-luxury group-hover:bg-champagne-gold group-hover:text-white transition-colors duration-300">
                                    <badge.icon size={24} />
                                </div>
                                <h4 className="font-heading font-bold text-dark-luxury mb-1">{badge.label}</h4>
                                <p className="text-xs text-warm-gray uppercase tracking-widest">{badge.desc}</p>
                            </div>
                        ))}
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
}
