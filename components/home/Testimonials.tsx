"use client";

import * as React from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/products";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

export default function Testimonials() {
    return (
        <section className="py-16 md:py-24 bg-light-gray relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <FadeInOnScroll>
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl md:text-4xl text-dark-luxury mb-4">Loved by our Community</h2>
                        <div className="flex justify-center gap-1 text-champagne-gold">
                            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                        </div>
                    </div>
                </FadeInOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <FadeInOnScroll key={idx}>
                            <div className="bg-white p-8 rounded-lg shadow-luxury-md border border-champagne-gold/20 relative group hover:-translate-y-2 transition-transform duration-300">
                                <Quote className="absolute top-6 right-6 text-champagne-gold/20" size={48} />
                                <p className="text-warm-gray mb-6 relative z-10 italic">&quot;{testimonial.quote}&quot;</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-champagne-gold/30 flex items-center justify-center font-bold text-dark-luxury">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-dark-luxury">{testimonial.name}</p>
                                        <div className="flex gap-0.5 text-champagne-gold">
                                            {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
