"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';

interface CartItem extends Product {
    quantity: number;
    selectedVariant?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addItem: (product: Product, quantity?: number, variant?: string) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial load
    useEffect(() => {
        const savedCart = localStorage.getItem('glitter_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from localStorage', e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('glitter_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isInitialized]);

    const addItem = (product: Product, quantity = 1, variant?: string) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.selectedVariant === variant);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id && item.selectedVariant === variant
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, selectedVariant: variant }];
        });
    };

    const removeItem = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => {
        const price = item.onSale && item.salePrice ? item.salePrice : item.price;
        return total + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
