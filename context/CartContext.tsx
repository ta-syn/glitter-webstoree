"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';
import { getProductById } from '@/lib/data/products';

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
                const parsedCart: CartItem[] = JSON.parse(savedCart);

                const idMapping: { [key: string]: string } = {
                    "glitter-gold-001": "glitter-eyes-001",
                    "face-glitter-001": "glitter-face-001",
                    "lib-001": "glitter-lips-001",
                    "tools-001": "glitter-tools-001",
                };

                const migratedItemsMap = new Map<string, CartItem>();

                parsedCart.forEach((item: CartItem) => {
                    const newId = idMapping[item.id] || item.id;
                    const freshProduct = getProductById(newId); // Get fresh product data for the new ID

                    let targetItem: CartItem;
                    if (freshProduct) {
                        // Merge existing item data with fresh product data, prioritizing fresh product details
                        // but keeping original quantity and selectedVariant
                        targetItem = {
                            ...freshProduct, // All properties from the fresh product
                            ...item,        // Override with item's specific properties if they exist (like name, price if different)
                            id: newId,      // Ensure the new ID is set
                            quantity: item.quantity,
                            selectedVariant: item.selectedVariant
                        };
                    } else {
                        // If product not found, keep original item but update ID if mapped
                        targetItem = { ...item, id: newId };
                    }

                    const itemKey = `${targetItem.id}-${targetItem.selectedVariant || 'default'}`;
                    const existing = migratedItemsMap.get(itemKey);

                    if (existing) {
                        existing.quantity += targetItem.quantity;
                    } else {
                        migratedItemsMap.set(itemKey, { ...targetItem });
                    }
                });

                const migratedItems = Array.from(migratedItemsMap.values());
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setCartItems(migratedItems);
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
