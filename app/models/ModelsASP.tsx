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
    categoryID: number;
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
    categoryID: number;
}

export interface User {
    userID: number;
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
    orderID: any;
    created: Date;
    subtotal: number;
    total: number;
    status: string;
    customerID: number;
    promotionID: number;
    orderLines: OrderLine[];
}

export interface OrderLine {
    qty: number;
    tax: number;
    discount: number;
    subTotal: number;
    total: number;
    orderID: number;
    productID: number;
}

export interface AllOrderData {
    orderID: number;
    orderStatus: string;
    orderLines: AllOrderLineData[];
    subTotal: number;
    total: number;
}

export interface AllOrderLineData {
    productName: string;
    productQty: number;
    productPrice: number;
    subTotal: number;
}