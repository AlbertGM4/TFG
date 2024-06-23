// src/components/CartList.jsx

import React from 'react';

import { useCart } from '@/app/context/CartContext';

import Image from 'next/image';
import Link from 'next/link';


const CartList = ({ isOpen }: any) => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    // Función para calcular el subtotal y el total
    const calculateTotal = () => {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.productPrice * item.quantity; // Ajusta según la estructura de tus productos en el carrito
        });
        return {
            subtotal: subtotal,
            total: (subtotal * 1.16).toFixed(2) // Ejemplo de impuesto del 16%, ajusta según necesites
        };
    };

    // Renderiza la lista de productos del carrito
    const renderCartItems = () => {
        return cartItems.map(item => (
            <li key={item.productId} className="flex items-center space-x-2 py-2">
                <div className="w-12 h-12">
                    <Image
                        src={item.productImageRoute}
                        alt={item.productName}
                        width={100}
                        height={100}
                    />
                </div>
                <div className="flex-1">
                    <p className="font-bold">{item.productName}</p>
                    <p className="text-sm text-gray-500">Precio Unitario: {item.productPrice.toFixed(2)} €</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity} unidades</p>
                    <button
                        onClick={() => removeFromCart(item.productId)}
                        className="cursor-pointer text-white mt-4 bg-red-600 hover:bg-red-700 rounded-md px-3 py-1"                    >
                        Eliminar
                    </button>
                </div>
            </li>
        ));
    };

    const { subtotal, total } = calculateTotal();

    return (
        <div className={`absolute top-0 right-0 w-1/5 bg-white shadow-md p-4 rounded-lg ${isOpen ? 'block' : 'hidden'}`}>
            <h1 className="text-xl font-bold mb-4">Tus Productos</h1>
            <hr />
            <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {renderCartItems()}
            </ul>
            <hr />
            <div className="mt-4">
                <p className="font-bold">Subtotal: {subtotal} €</p>
                <p className="text-sm text-gray-500">Impuesto (16%): {(subtotal * 0.16).toFixed(2)} €</p>
                <p className="font-bold mt-2">Total: {total} €</p>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={clearCart}
                    className="cursor-pointer text-white mt-4 bg-red-600 hover:bg-red-700 rounded-md px-3 py-1"            >
                    Vaciar Carrito
                </button>
                <Link href="/cart">
                    <button className="cursor-pointer text-white mt-4 bg-green-600 hover:bg-green-700 rounded-md px-3 py-1">
                        Finalizar compra
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CartList;
