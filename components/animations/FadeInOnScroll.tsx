"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FadeInOnScrollProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    viewportAmount?: number;
}

export default function FadeInOnScroll({
    children,
    delay = 0,
    duration = 0.6,
    className,
    viewportAmount = 0.1
}: FadeInOnScrollProps) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: viewportAmount,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
