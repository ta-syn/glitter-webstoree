"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Context to share state between Select components
const SelectContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    value: string;
    onValueChange: (value: string) => void;
} | null>(null);

export const Select = ({ children, value, onValueChange }: any) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <SelectContext.Provider value={{ isOpen, setIsOpen, value, onValueChange }}>
            <div className="relative inline-block w-full" ref={containerRef}>
                {children}
            </div>
        </SelectContext.Provider>
    );
};

export const SelectTrigger = ({ children, className }: any) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectTrigger must be used within Select");

    return (
        <button
            type="button"
            className={cn(
                "flex items-center justify-between w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-dark-luxury focus:outline-none transition-all duration-200",
                className
            )}
            onClick={() => context.setIsOpen(!context.isOpen)}
        >
            {children}
            <ChevronDown size={14} className="ml-2 text-warm-gray" />
        </button>
    );
};

export const SelectValue = ({ placeholder }: any) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectValue must be used within Select");

    // Find the label for the current value
    const selectElement = React.useContext(SelectContext);

    return <span className="truncate">{context.value || placeholder}</span>;
};

export const SelectContent = ({ children }: any) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectContent must be used within Select");

    if (!context.isOpen) return null;

    return (
        <div
            className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-luxury-lg overflow-hidden animate-in fade-in zoom-in duration-200"
            style={{ minWidth: "180px" }}
        >
            <div className="py-1">
                {children}
            </div>
        </div>
    );
};

export const SelectItem = ({ children, value }: any) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectItem must be used within Select");

    const isActive = value === context.value;

    return (
        <button
            type="button"
            className={cn(
                "flex items-center justify-between w-full px-4 py-2.5 text-sm text-left transition-colors",
                isActive ? "bg-pearl-white text-dark-luxury font-bold" : "text-warm-gray hover:bg-pearl-white hover:text-dark-luxury"
            )}
            onClick={() => {
                context.onValueChange(value);
                context.setIsOpen(false);
            }}
        >
            {children}
            {isActive && <Check size={14} className="text-champagne-gold" />}
        </button>
    );
};
