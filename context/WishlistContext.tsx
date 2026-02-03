"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';

interface WishlistContextType {
    wishlistItems: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial load
    useEffect(() => {
        const savedWishlist = localStorage.getItem('glitter_wishlist');
        if (savedWishlist) {
            try {
                setWishlistItems(JSON.parse(savedWishlist));
            } catch (e) {
                console.error('Failed to parse wishlist from localStorage', e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('glitter_wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, isInitialized]);

    const addToWishlist = (product: Product) => {
        setWishlistItems(prev => {
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlistItems(prev => prev.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some(item => item.id === productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            wishlistCount: wishlistItems.length
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
