// context/CartContext.tsx

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

import { CartContextType, CartItem, ProviderProps } from '@/app/models/ModelsASP';


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {

        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cartItems');
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: CartItem) => {
        setCartItems(prevItems => {
            const existingProduct = prevItems.find(
                item => item.productId === product.productId
            );
            if (existingProduct) {
                return prevItems.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prevItems, product];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prevCartItems => prevCartItems.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser utilizado dentro de un CartProvider');
    }
    return context;
};
