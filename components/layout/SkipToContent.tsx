"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function SkipToContent() {
    return (
        <a
            href="#main-content"
            className={cn(
                "fixed top-4 left-4 z-[100] -translate-y-[150%] transition-transform duration-200 focus:translate-y-0",
                "bg-champagne-gold text-dark-luxury font-bold px-6 py-3 rounded-md shadow-luxury-lg",
                "outline-none ring-4 ring-offset-2 ring-champagne-gold-dark"
            )}
        >
            Skip to main content
        </a>
    );
}
