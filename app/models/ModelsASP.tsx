// Definición de interfaces

import { ReactNode } from "react";
import { Cookie } from "universal-cookie";

export interface RootLayoutProps {
    children: React.ReactNode;
}

export interface ProviderProps {
    children: ReactNode;
}

export interface UseProps {
    redirect: (url: string) => void;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    cookies: Cookie
    login: (token: string) => void;
    logout: () => void;
}

export interface CartItem {
    productId: number;
    productName: string;
    quantity: number;
    productPrice: number;
    productImageRoute: string;
}

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

export interface Category {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
    categoryImagesRoute: string,
}

export interface Product {
    productID: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productImagesRoute: string;
    productStock: number;
    CategoryID: number;
}

export interface User {
    profileImageRoute: string;
    userName: string;
    userEmail: string;
    address?: string;
    billingAddress?: string;
    phone?: string;
    aCoins: number;
    orders?: any[];
    payment?: { number?: string };
}

export interface Order {
    Created: Date;
    Subtotal: number;
    Total: number;
    Status: string;
    CustomerID: number;
    PromotionID: number;
    OrderLines: OrderLine[];
}

export interface OrderLine {
    Qty: number;
    Tax: number;
    Discount: number;
    SubTotal: number;
    Total: number;
    OrderID: number;
    ProductID: number;
}

export interface AllOrderData {
    OrderID: number;
    OrderStatus: string;
    OrderLines: AllOrderLineData[];
    SubTotal: number;
    Total: number;
}

export interface AllOrderLineData {
    ProductName: string;
    ProductQty: number;
    ProductPrice: number;
    SubTotal: number;
}