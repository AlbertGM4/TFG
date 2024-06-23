// app/cart/page.tsx

'use client'

import Image from 'next/image';
import useOrder from '@/app/hooks/UseOrder';
import { useState } from 'react';
import SignInForm from '../profile/components/SignInProfile';


const CartPage = () => {
    const [showCheckoutPopup, setCheckoutPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false); // Estado para controlar el popup de login
    const { cartItems, totals, isMounted, message, handleMessage, handlePlaceOrder } = useOrder({
        redirect: (url: string) => {
            window.location.href = url; // Redirige usando el navegador
        },
        onLoginRequired: () => setShowLoginPopup(true) // Mostrar el popup de login si es necesario
    });

    const handleClosePopup = () => {
        setCheckoutPopup(false);
        handleMessage();
    };

    const handleCloseLoginPopup = () => {
        setShowLoginPopup(false);
    };

    if (!isMounted) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Resumen de Compra</h1>
            <ul className="divide-y divide-gray-200">
                {cartItems.map(item => (
                    <li key={item.productId} className="flex items-start space-x-4 py-4">
                        <div className="w-32 h-32 flex-shrink-0 relative">
                            <Image
                                src={item.productImageRoute}
                                alt={item.productName}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex-1 pl-4">
                            <p className="font-bold">{item.productName}</p>
                            <p className="text-sm text-gray-500">Precio Unitario: {item.productPrice.toFixed(2)} €</p>
                            <p className="text-sm text-gray-500">Cantidad: {item.quantity} unidades</p>
                        </div>
                        <p className="font-bold">{(item.productPrice * item.quantity).toFixed(2)} €</p>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <div className="flex justify-end">
                    <div className="text-right">
                        <p className="font-bold">Subtotal: {totals.subtotal.toFixed(2)} €</p>
                        <p className="text-sm text-gray-500">Impuesto (16%): {(totals.subtotal * 0.16).toFixed(2)} €</p>
                        <p className="font-bold mt-2">Total: {totals.total.toFixed(2)} €</p>
                    </div>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    className="cursor-pointer mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-700 block w-full text-center"
                >
                    Realizar Pedido
                </button>
            </div>
            {message &&
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleClosePopup}>
                    <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='text-green-500 mb-4'>{message}</div>
                        </div>
                    </div>
                </div>
            }
            {showLoginPopup &&
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleCloseLoginPopup}>
                    <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <SignInForm toggleForm={handleCloseLoginPopup} />
                    </div>
                </div>
            }
        </div>
    );
};

export default CartPage;
