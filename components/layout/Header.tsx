"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collections/new-arrivals", label: "New Arrivals" },
    { href: "/collections/best-sellers", label: "Best Sellers" },
    { href: "/collections/eyes", label: "Eyes" },
    { href: "/collections/lips", label: "Lips" },
    { href: "/about", label: "Our Story" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { cartCount } = useCart();
    const pathname = usePathname();

    // Scroll detection
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    // Navigation color logic
    const isDarkBg = (pathname === "/" || pathname.startsWith("/collections/")) && !isScrolled;

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-md shadow-luxury-sm py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Mobile Menu Button */}
                        <button
                            className={cn(
                                "lg:hidden p-2 rounded-full transition-colors",
                                isDarkBg ? "text-white hover:bg-white/10" : "text-dark-luxury hover:bg-dark-luxury/5"
                            )}
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Logo */}
                        <Link
                            href="/"
                            className={cn(
                                "font-heading text-2xl lg:text-3xl font-bold tracking-[0.2em] transition-all duration-300 hover:scale-105",
                                isDarkBg ? "text-white" : "text-dark-luxury"
                            )}
                        >
                            GLITTER
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative text-[13px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 group",
                                        pathname === link.href
                                            ? (isDarkBg ? "text-champagne-gold" : "text-dark-luxury")
                                            : (isDarkBg ? "text-white/80 hover:text-white" : "text-warm-gray hover:text-dark-luxury")
                                    )}
                                >
                                    {link.label}
                                    <span className={cn(
                                        "absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-champagne-gold transition-all duration-300 -translate-x-1/2 group-hover:w-full",
                                        pathname === link.href ? "w-full" : ""
                                    )} />
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-1 lg:gap-3">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    isDarkBg ? "text-white hover:bg-white/10" : "text-dark-luxury hover:bg-dark-luxury/5"
                                )}
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </button>

                            <Link
                                href="/account"
                                className={cn(
                                    "hidden lg:block p-2 rounded-full transition-all duration-300",
                                    isDarkBg ? "text-white hover:bg-white/10" : "text-dark-luxury hover:bg-dark-luxury/5"
                                )}
                            >
                                <User size={20} />
                            </Link>

                            <Link
                                href="/cart"
                                className={cn(
                                    "relative flex items-center gap-2 p-2 px-3 rounded-full transition-all duration-300 group overflow-hidden",
                                    isDarkBg
                                        ? "bg-white/10 text-white hover:bg-white/20"
                                        : "bg-dark-luxury/5 text-dark-luxury hover:bg-dark-luxury/10"
                                )}
                                id="cart-button"
                            >
                                <ShoppingBag size={20} className="relative z-10" />
                                <span className={cn(
                                    "hidden sm:inline text-xs font-bold tracking-widest uppercase relative z-10",
                                    isDarkBg ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""
                                )}>Cart</span>

                                {cartCount > 0 && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne-gold text-[10px] font-black text-dark-luxury transition-transform group-hover:scale-110 shadow-sm relative z-10">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                            className="fixed top-0 bottom-0 left-0 w-[80%] max-w-sm bg-pearl-white z-50 shadow-luxury-lg lg:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-champagne-gold/20">
                                <span className="font-heading text-xl font-bold">MENU</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-dark-luxury hover:bg-champagne-gold/10 rounded-full"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-4">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "block text-lg font-medium py-3 border-b border-gray-100",
                                                pathname === link.href ? "text-champagne-gold-dark" : "text-dark-luxury"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                {/* Mobile Cart Link */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (navLinks.length) * 0.1 }}
                                >
                                    <Link
                                        href="/cart"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 text-lg font-bold py-4 text-champagne-gold-dark"
                                    >
                                        <ShoppingBag size={20} />
                                        Shopping Cart
                                        {cartCount > 0 && (
                                            <Badge variant="gold" className="ml-auto">{cartCount}</Badge>
                                        )}
                                    </Link>
                                </motion.div>
                            </nav>

                            <div className="p-6 bg-light-gray/50 border-t border-champagne-gold/20 space-y-4">
                                <Button variant="outline" className="w-full justify-start gap-3">
                                    <User size={18} /> My Account
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col items-center pt-32 px-4"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-6 right-6 p-2 text-dark-luxury hover:bg-gray-100 rounded-full"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-full max-w-2xl text-center space-y-8"
                        >
                            <h2 className="font-heading text-3xl md:text-4xl text-dark-luxury">What are you looking for?</h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products, collections..."
                                    className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-2xl md:text-3xl placeholder-gray-300 focus:outline-none focus:border-champagne-gold transition-colors text-center"
                                    autoFocus
                                />
                                <Button className="absolute right-0 top-1/2 -translate-y-1/2 p-2" variant="ghost">
                                    <Search size={24} />
                                </Button>
                            </div>

                            <div className="pt-8">
                                <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Popular Searches</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {["Glitter Gel", "Gold Palette", "Shimmer Lip Gloss", "Bridal Collection"].map((term) => (
                                        <Badge key={term} variant="outline" className="cursor-pointer hover:bg-champagne-gold/10 px-4 py-2">
                                            {term}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
