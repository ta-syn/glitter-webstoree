import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "gold" | "rose" | "dark" | "outline" | "sale" | "new";
    size?: "sm" | "md";
    shape?: "pill" | "square";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = "gold", size = "md", shape = "pill", ...props }, ref) => {
        const variants = {
            gold: "bg-champagne-gold text-dark-luxury border-transparent",
            rose: "bg-rose-gold text-dark-luxury border-transparent",
            dark: "bg-dark-luxury text-champagne-gold border-transparent",
            outline: "text-dark-luxury border-champagne-gold",
            sale: "bg-error text-white border-transparent shadow-sm",
            new: "bg-success text-white border-transparent",
        };

        const sizes = {
            sm: "text-[10px] px-2 py-0.5",
            md: "text-xs px-2.5 py-0.5",
        };

        const shapes = {
            pill: "rounded-full",
            square: "rounded-sm",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-wider",
                    variants[variant],
                    sizes[size],
                    shapes[shape],
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = "Badge";

export { Badge };
