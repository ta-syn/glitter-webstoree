"use client";

import Link from "next/link";
import * as React from "react";
import { Instagram, Facebook, CreditCard, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";

const SocialIcon = ({ path }: { path: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d={path} />
    </svg>
);

const TikTokPath = "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z";
const PinterestPath = "M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.8-.16-2.02.03-2.88l.6-2.6c-.15-.43-.37-1.09-.37-1.09s.2-.4.4-.4c1.47 0 2.5 1.58 2.5 3.3 0 2.2-1.39 4.34-3.5 3.82-1.74-.42-1.22-3.82 1.1-5.96 1.48-1.4 3.34-1.25 3.02 1.9-.3 2.97-1.8 3.5-1.93 2.58-.2-.9.5-2 .95-2.73.55-.9 2-.96 1.93.42-.09 1.8-.62 2.7-1.55 3.32-1.37.94-3.13-.3-3.23-2.7C8.2 13.9 10.2 10.9 13.3 11c3.54.1 3.52 5.06 1.1 7.2-1.1.97-2.75.52-2.75.52l-.65 2.5c-.19.74-.7 1.66-1.04 2.22l.52.1z";

function AccordionItem({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-champagne-gold/10 md:border-none">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 md:py-0 md:mb-6 text-left group"
            >
                <h4 className="font-heading text-lg font-bold text-champagne-gold relative inline-block group-hover:text-white transition-colors">
                    {title}
                    <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-champagne-gold/50 hidden md:block"></span>
                </h4>
                <ChevronDown
                    className={`md:hidden text-champagne-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden md:hidden"
                    >
                        <div className="pb-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="hidden md:block">
                {children}
            </div>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-dark-luxury text-white pt-10 md:pt-20 pb-8 border-t border-champagne-gold/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">

                    {/* COLUMN 1: Brand (Always Visible) */}
                    <div className="space-y-6 pb-6 md:pb-0 border-b border-champagne-gold/10 md:border-none">
                        <Link href="/" className="inline-block">
                            <h2 className="font-heading text-3xl font-bold tracking-wider text-champagne-gold hover:text-white transition-colors">
                                GLITTER
                            </h2>
                            <p className="text-xs tracking-[0.3em] uppercase text-warm-gray mt-1">
                                Illuminate Your Beauty
                            </p>
                        </Link>
                        <div className="flex gap-4">
                            {[
                                { icon: <Instagram size={20} />, href: "#" },
                                { icon: <Facebook size={20} />, href: "#" },
                                { icon: <SocialIcon path={TikTokPath} />, href: "#" },
                                { icon: <SocialIcon path={PinterestPath} />, href: "#" },
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="p-2 bg-white/5 rounded-full hover:bg-champagne-gold hover:text-dark-luxury transition-all duration-300 transform hover:scale-110">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 2: Quick Links */}
                    <AccordionItem title="Quick Links">
                        <ul className="space-y-3">
                            {['About Us', 'Contact', 'FAQs', 'Shipping & Returns', 'Privacy Policy', 'Terms & Conditions'].map((link) => (
                                <li key={link}>
                                    <Link href={`/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm py-1 md:py-0">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </AccordionItem>

                    {/* COLUMN 3: Collections */}
                    <AccordionItem title="Collections">
                        <ul className="space-y-3">
                            {[
                                { name: 'Party Collection', href: '/collections/party' },
                                { name: 'Bridal Collection', href: '/collections/bridal' },
                                { name: 'Night Glam Collection', href: '/collections/night' },
                                { name: 'New Arrivals', href: '/collections/new-arrivals' },
                                { name: 'Sale', href: '/collections/sale', className: 'text-rose-gold font-medium' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm py-1 md:py-0 ${link.className || ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </AccordionItem>

                    {/* COLUMN 4: Newsletter */}
                    <div className="md:block pt-6 md:pt-0">
                        <h4 className="font-heading text-lg font-bold mb-6 text-champagne-gold relative inline-block">
                            Stay Connected
                            <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-champagne-gold/50"></span>
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="space-y-3">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-champagne-gold h-12"
                            />
                            <Button className="w-full bg-champagne-gold text-dark-luxury hover:bg-white shadow-luxury-glow h-12">
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-xs text-gray-500 mt-4">
                            By subscribing, you agree to our <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
                        </p>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-sm text-gray-500 order-2 md:order-1">
                        &copy; {new Date().getFullYear()} Glitter Cosmetics. All rights reserved.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6 order-1 md:order-2">
                        <div className="flex gap-2 opacity-60 hover:opacity-100 transition-opacity">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                                    <CreditCard size={14} className="text-white/50" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 border border-white/10 px-3 py-1.5 rounded-full">
                            <ShieldCheck size={12} className="text-emerald-500" />
                            <span>SSL Secure</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
