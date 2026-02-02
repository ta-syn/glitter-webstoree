"use client";

import { motion } from "framer-motion";

interface CollectionHeroProps {
    title: string;
    description: string;
    image: string;
}

export default function CollectionHero({ title, description, image }: CollectionHeroProps) {
    return (
        <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden flex items-center justify-center bg-dark-luxury">
            {/* Background Image Placeholder since we don't have real images yet, using a gradient backup */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: `url(${image})`, backgroundColor: '#1A1A1A' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-luxury/90 via-dark-luxury/20 to-transparent" />

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-gray-200 font-light"
                >
                    {description}
                </motion.p>
            </div>
        </div>
    );
}
