import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-pearl-white to-white">
            <div className="relative w-32 h-32 mx-auto mb-8 animate-pulse">
                <div className="absolute inset-0 bg-champagne-gold/20 rounded-full blur-xl" />
                <Sparkles size={64} className="relative z-10 text-champagne-gold mx-auto mt-8" />
            </div>

            <h1 className="font-heading text-8xl font-bold text-dark-luxury/20 mb-4 select-none">
                404
            </h1>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark-luxury mb-6">
                Lost in the Glitter?
            </h2>

            <p className="text-warm-gray text-lg max-w-md mx-auto mb-10 leading-relaxed">
                The page you are looking for seems to have faded away.
                But don&apos;t worry, there&apos;s plenty more sparkle to discover.
            </p>

            <Link href="/">
                <Button size="lg" className="shadow-luxury-glow">
                    <ArrowLeft size={18} className="mr-2" />
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
