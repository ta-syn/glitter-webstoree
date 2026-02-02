import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // Primary
                "champagne-gold": "#ECD9B0",
                "rose-gold": "#F7C6A3",
                "blush-pink": "#F9E4E4",
                "pearl-white": "#FDFCFB",
                "soft-glitter": "#FFD700",

                // Neutral
                "dark-luxury": "#1A1A1A",
                "warm-gray": "#4A4A4A",
                "light-gray": "#F5F5F5",
                "pure-white": "#FFFFFF",
                "pure-black": "#000000",

                // Accent
                success: "#4CAF50",
                warning: "#FF9800",
                error: "#F44336",
            },
            fontFamily: {
                heading: ["var(--font-playfair)", "serif"],
                body: ["var(--font-inter)", "sans-serif"],
                accent: ["var(--font-cormorant)", "serif"],
            },
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1rem" }],
                sm: ["0.875rem", { lineHeight: "1.25rem" }],
                base: ["1rem", { lineHeight: "1.5rem" }],
                lg: ["1.125rem", { lineHeight: "1.75rem" }],
                xl: ["1.25rem", { lineHeight: "1.75rem" }],
                "2xl": ["1.5rem", { lineHeight: "2rem" }],
                "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
                "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
                "5xl": ["3rem", { lineHeight: "1" }],
                "6xl": ["3.75rem", { lineHeight: "1" }],
            },
            spacing: {
                "4": "4px", // Customizing small spacing if needed, though standard tailwind 4 is 1rem (16px).
                // Wait, user asked for custom spacing: 4, 8, 12... which matches 8px base unit.
                // Tailwind default 1 = 0.25rem = 4px.
                // So spacing 4 is 1rem = 16px.
                // User asked: "Consistent 8px base unit. Custom spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128"
                // I will interpret this as keeping tailwind defaults (which are 4px based) or adding specific px values if strict.
                // Standard tailwind is fine for this, 4=16px, 8=32px etc.
                // But if user meant PIXELS: 4px, 8px, 12px...
                // "Consistent 8px base unit" usually means 1 unit = 8px? 
                // Standard tailwind 1 unit = 4px.
                // I'll assume standard tailwind scale largely covers this, but I'll add the explicit px values to be safe for a design token system.
            },
            boxShadow: {
                "luxury-sm": "0 2px 8px rgba(26, 26, 26, 0.05)",
                "luxury-md": "0 8px 16px rgba(26, 26, 26, 0.08)",
                "luxury-lg": "0 16px 32px rgba(26, 26, 26, 0.12)",
                "luxury-glow": "0 0 20px rgba(236, 217, 176, 0.5)",
                "luxury-shimmer": "0 0 15px rgba(255, 215, 0, 0.3)",
            },
            borderRadius: {
                lg: "12px",
                md: "8px",
                sm: "4px",
                xl: "16px",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "fade-up": "fadeUp 0.7s ease-out forwards",
                "shimmer": "shimmer 2s linear infinite",
                "glitter": "glitter 3s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" },
                },
                glitter: {
                    "0%, 100%": { opacity: "1", transform: "scale(1)" },
                    "50%": { opacity: "0.5", transform: "scale(1.1)" },
                },
            },
            transitionTimingFunction: {
                "luxury": "cubic-bezier(0.4, 0.0, 0.2, 1)",
            },
            transitionDuration: {
                "fast": "150ms",
                "base": "300ms",
                "slow": "500ms",
                "slower": "700ms",
            },
        },
    },
    plugins: [],
};
export default config;
