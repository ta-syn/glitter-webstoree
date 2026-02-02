"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
    {
        variants: {
            variant: {
                primary: "bg-champagne-gold text-dark-luxury hover:bg-champagne-gold-dark shadow-luxury text-white", // Adjusted for contrast
                secondary: "bg-dark-luxury text-white hover:bg-black",
                outline: "border border-dark-luxury bg-transparent hover:bg-dark-luxury hover:text-white",
                ghost: "hover:bg-gray-100 hover:text-dark-luxury",
                link: "text-dark-luxury underline-offset-4 hover:underline",
                luxury: "bg-gradient-to-r from-champagne-gold via-white/50 to-champagne-gold text-dark-luxury border border-white/20 shadow-luxury-glow hover:shadow-luxury-lg bg-[length:200%_100%] animate-shimmer",
                sale: "bg-error text-white hover:bg-red-700",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-12 rounded-md px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, ...props }, ref) => {

        // Simple ripple effect logic can be added here if needed, 
        // but specific CSS active states are often cleaner for performance. 
        // Let's add a subtle motion tap effect.

        return (
            <motion.button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                whileTap={{ scale: 0.98 }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(props as any)} // Cast to any to avoid conflict between React.HTMLAttributes and MotionProps spread
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

                {/* Shimmer overlay for primary luxury buttons on hover */}
                {(variant === 'primary' || variant === 'luxury') && (
                    <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer-slide skew-x-12 z-0" />
                )}

                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
