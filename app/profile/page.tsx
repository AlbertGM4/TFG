// pages/UserProfilePage.tsx
import React from 'react';

import UserProfile from './components/UserProfile';
import Pepe from '@/public/images/pepeProfile.jpg';


export default function UserProfilePage() {

    const products_1 = [
        {
            name: 'Lana',
            price: 2.5,
            qty: 4,
        },
        {
            name: 'Algodon',
            price: 4.5,
            qty: 2,
        },
    ];

    const products_2 = [
        {
            name: 'Accesorio',
            price: 1.5,
            qty: 6,
        },
        {
            name: 'Patron',
            price: 12.5,
            qty: 1,
        },
    ];

    const orders = [
        {
            order_number: 1234,
            status: 'En proceso',
            items: products_1,
            subtotal: 15.,
            total: 19.
        },
        {
            order_number: 5678,
            status: 'Donete',
            items: products_2,
            subtotal: 15.,
            total: 19.
        },
        {
            order_number: 9123,
            status: 'Reparto',
            items: products_2,
            subtotal: 15.,
            total: 19.
        },
    ];

    const card = {
        type: 'credit',
        number: '123456789'
    }

    const user = {
        profileImage: Pepe,
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St',
        billingAddress: 'Billing 123 Main St',
        phone: '123456789',
        aCoins: 0,
        payment: card,
        orders: orders,
    };

    return (
        <div>
            <UserProfile user={user} />
        </div>
    );
};

