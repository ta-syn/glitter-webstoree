import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-dark-luxury">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-11 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-pearl-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-warm-gray/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ease-luxury",
                            error
                                ? "border-error focus-visible:ring-error"
                                : "border-champagne-gold/30 hover:border-champagne-gold",
                            icon && "pl-10",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs text-error animate-fade-in">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
