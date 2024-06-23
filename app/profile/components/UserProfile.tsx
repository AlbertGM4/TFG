// components/UserProfile.tsx
"use client";

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useUserProfile from '@/app/hooks/UseUserProfile';
import profileGif from '@/public/gifs/profile.gif';

import LA_email from '@/public/images/LA_mail.png';
import LA_location from '@/public/images/LA_location.png';
import LA_billing_address from '@/public/images/LA_billing_address.png';
import LA_phone from '@/public/images/LA_phone.png';
import LA_coins from '@/public/images/LA_coins.png';
import LA_credit_card from '@/public/images/LA_credit_card.png';
import useAuthentication from '@/app/hooks/UseAuthentication';



const UserProfile = () => {
    const [showSessionPopup, setshowSessionPopup] = useState(false);
    const { handleLogout } = useAuthentication({
        redirect: (url: string) => {
            window.location.href = url; // Redirige usando el navegador
        }
    });
    const { user, isEditing, setIsEditing, handleChange, handleDiscard, handleSubmit, tokenExpired } = useUserProfile({
        redirect: (url: string) => {
            window.location.href = url; // Redirige usando el navegador
        }
    });

    const handleClosePopup = () => {
        setshowSessionPopup(false);
    };

    if (tokenExpired) {
        // Si el token expiró, redirigir a la página de inicio o de login
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 text-lg">{tokenExpired}</p>
            </div>
        );
    }

    if (!user.userName) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row p-6">
            {/* Perfil de Usuario */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-1/2 p-6 my-4 lg:mx-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Perfil</h2>
                <div className="relative w-full flex justify-center mt-4">
                    <div className="relative">
                        <div className="group">
                            <Image
                                src={user?.profileImageRoute || profileGif}
                                alt={user?.userName || 'User Profile'}
                                className="rounded-full"
                                width={200}
                                height={200}
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full">
                                <span className="text-white font-bold">Editar imagen</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <h2 className="text-xl font-semibold text-gray-800 mb-2"> Nombre de usuario: {user?.userName}</h2>
                            {/* Email */}
                            <div className="mb-4 flex items-center">
                                <Image src={LA_email} className="w-7 h-7" alt="Email Icon" />
                                <label htmlFor="userEmail" className="block text-gray-700 text-sm font-bold mb-2 w-1/3 ml-2">Email</label>
                                <input
                                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                                    id="userEmail"
                                    type="text"
                                    placeholder="Email"
                                    name="userEmail"
                                    value={user?.userEmail || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Dirección */}
                            <div className="mb-4 flex items-center">
                                <Image src={LA_location} className="w-7 h-7" alt="Location Icon" />
                                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2 w-1/3 ml-2">Dirección</label>
                                <input
                                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                                    id="address"
                                    type="text"
                                    placeholder="Direccion"
                                    name="address"
                                    value={user?.address || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Dirección de facturación */}
                            <div className="mb-4 flex items-center">
                                <Image src={LA_billing_address} className="w-7 h-7" alt="Billing Icon" />
                                <label htmlFor="billingAddress" className="block text-gray-700 text-sm font-bold mb-2 w-1/3 ml-2">Dirección de facturación</label>
                                <input
                                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                                    id="billingAddress"
                                    type="text"
                                    placeholder="Direccion de facturacion"
                                    name="billingAddress"
                                    value={user?.billingAddress || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Número de teléfono */}
                            <div className="mb-4 flex items-center">
                                <Image src={LA_phone} className="w-7 h-7" alt="Phone Icon" />
                                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2 w-1/3 ml-2">Teléfono</label>
                                <input
                                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                                    id="phone"
                                    type="text"
                                    placeholder="Telefono"
                                    name="phone"
                                    value={user?.phone || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Algarra Coins */}
                            <div className="mb-4 flex items-center">
                                <Image src={LA_coins} className="w-7 h-7" alt="Coins Icon" />
                                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/3 ml-2">Algarra Coins</label>
                                <p className="text-gray-700 mb-2 w-2/3 ml-2">{user?.aCoins}</p>
                            </div>
                            <div className='w-full flex justify-end space-x-2'>
                                <button
                                    className="cursor-pointer bg-black hover:bg-slate-700 border-none rounded-xl text-white text-base px-5 py-2.5"
                                    type="submit"
                                >
                                    Guardar
                                </button>
                                <button
                                    className="cursor-pointer bg-red-600 hover:bg-red-700 border-none rounded-xl text-white text-base px-5 py-2.5"
                                    type="button"
                                    onClick={handleDiscard}
                                >
                                    Descartar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2"> {user?.userName}</h2>
                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_email} className="w-7 h-7" alt="Email Icon" />
                                <p className="text-gray-600"> {user?.userEmail}</p>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_location} className="w-7 h-7" alt="Location Icon" />
                                <p className="text-gray-700 mb-2"> {user?.address}</p>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_billing_address} className="w-7 h-7" alt="Billing Icon" />
                                <p className="text-gray-700 mb-2"> {user?.billingAddress}</p>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_phone} className="w-7 h-7" alt="Phone Icon" />
                                <p className="text-gray-700 mb-2"> {user?.phone}</p>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_coins} className="w-7 h-7" alt="Coins Icon" />
                                <p className="text-gray-700 mb-2"> {user?.aCoins}</p>
                            </div>
                            <div className='w-full flex justify-between'>
                                <button
                                    className="cursor-pointer bg-black hover:bg-slate-700 border-none rounded-xl text-white text-base px-5 py-2.5"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="cursor-pointer bg-red-600 hover:bg-red-700 border-none rounded-xl text-white text-base px-5 py-2.5"
                                    onClick={() => setshowSessionPopup(true)}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                            {showSessionPopup && (
                                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleClosePopup}>
                                    <div className="bg-white p-8 rounded-lg text-center" onClick={(e) => e.stopPropagation()}>
                                        <h2 className="text-3xl font-bold mb-6">¿Seguro que quieres cerrar sesión?</h2>
                                        <div className="flex justify-center">
                                            <button
                                                className="cursor-pointer bg-black hover:bg-slate-700 border-none rounded-xl text-white text-base px-5 py-2.5 mr-4"
                                                onClick={handleLogout}
                                            >
                                                Aceptar
                                            </button>
                                            <button
                                                className="cursor-pointer bg-red-600 hover:bg-red-700 border-none rounded-xl text-white text-base px-5 py-2.5 ml-4"
                                                onClick={handleClosePopup}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Últimos Pedidos */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-1/2 p-6 my-4 lg:mx-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Últimos Pedidos</h2>
                {user.orders?.slice(-2).map((order, index) => (
                    <div key={index} className="flex flex-col items-start border rounded-lg shadow-xl overflow-hidden bg-slate-50 transition-transform hover:bg-white hover:translate-y-2.5 p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <Image src={LA_billing_address} className="w-7 h-7" alt="Billing Icon" />
                            <p className="text-gray-700">Pedido #{order.orderID} - {order.status}</p>
                        </div>
                        <div className="self-end mb-1">
                            <p>Subtotal: {order.subtotal} €</p>
                            <p>Total: {order.total} €</p>
                        </div>
                    </div>
                ))}
                <Link href="/orders">
                    <button className="cursor-pointer text-white bg-black hover:bg-slate-700 border-none rounded-xl text-base px-5 py-2.5">
                        Ver más...
                    </button>
                </Link>

                {/* Métodos de Pago */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Métodos de Pago</h2>
                <div className="flex flex-col items-start border rounded-lg shadow-xl overflow-hidden bg-slate-50 transition-transform hover:bg-white hover:translate-y-2.5 p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Image src={LA_credit_card} className="w-7 h-7" alt="Credit Card Icon" />
                        <p className="text-gray-700">Tarjeta ...{user.payment?.number}</p>
                    </div>
                    <div className="ml-9">
                        <p className="text-gray-700">{user.userName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

