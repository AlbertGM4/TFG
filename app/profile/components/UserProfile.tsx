// components/UserProfile.tsx
"use client";

import { useEffect, useState } from 'react';

import Pepe from '@/public/images/pepeProfile.jpg';

import LA_email from '@/public/images/LA_mail.png';
import LA_location from '@/public/images/LA_location.png';
import LA_billing_address from '@/public/images/LA_billing_address.png';
import LA_phone from '@/public/images/LA_phone.png';
import LA_coins from '@/public/images/LA_coins.png';
import LA_credit_card from '@/public/images/LA_credit_card.png';

import Image from 'next/image';
import Link from 'next/link';


const UserProfile = () => {

    // Custom Data
    const products_1 = [{ name: 'Lana', price: 2.5, qty: 4 }, { name: 'Algodon', price: 4.5, qty: 2 },];

    const products_2 = [{ name: 'Accesorio', price: 1.5, qty: 6, }, { name: 'Patron', price: 12.5, qty: 1, },];

    const orders = [
        { order_number: 1234, status: 'En proceso', items: products_1, subtotal: 15., total: 19. },
        { order_number: 5678, status: 'Donete', items: products_2, subtotal: 15., total: 19. },
        { order_number: 9123, status: 'Reparto', items: products_2, subtotal: 15., total: 19. },
    ];

    const card = { type: 'credit', number: '123456789' }

    const userSample = {
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

    // Getting User from storage
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtener la información del usuario del almacenamiento local
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    // Form
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(userSample);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(formData);
        setIsEditing(false);
    };

    return (

        <div className='flex flex-row'>
            { /* Perfil de Usuario */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-1/2 p-6 mx-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-2"> Perfil </h2>
                <div className="w-full flex justify-center mt-4 relative group">
                    <Image className="rounded-full" src={formData.profileImage} alt="Profile" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold">Editar imagen</span>
                    </div>
                </div>
                <div className="p-6">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            { /* Name */}
                            <div className="mb-4">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Image src={LA_email} className="w-7 h-7" alt="Email Icon" />
                                    <p className="whitespace-nowrap text-gray-600"> {formData.email}</p>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Nombre"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            { /* Email */}
                            <div className="mb-4">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Image src={LA_email} className="w-7 h-7" alt="Email Icon" />
                                    <p className="whitespace-nowrap text-gray-600"> {formData.email}</p>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Nombre"
                                        name="name"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            { /* Address */}
                            <div className="mb-4">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Image src={LA_location} className="w-7 h-7" alt="Location Icon" />
                                    <p className="whitespace-nowrap text-gray-700 mb-2"> {formData.address}</p>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Nombre"
                                        name="name"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            { /* Billing Address */}
                            <div className="mb-4">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Image src={LA_billing_address} className="w-7 h-7" alt="Billing Icon" />
                                    <p className="whitespace-nowrap text-gray-700 mb-2"> {formData.billingAddress}</p>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Nombre"
                                        name="name"
                                        value={formData.billingAddress}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            { /* Phone Number */}
                            <div className="mb-4">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Image src={LA_phone} className="w-7 h-7" alt="Phone Icon" />
                                    <p className="whitespace-nowrap text-gray-700 mb-2"> {formData.phone}</p>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Nombre"
                                        name="name"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            { /* Algarra Coins */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Algarra Coins
                                </label>
                                <div className="flex items-center space-x-2 mb-4">
                                    <Image src={LA_coins} className="w-7 h-7" alt="Email Icon" />
                                    <p className="text-gray-700 mb-2"> {formData.aCoins}</p>
                                </div>
                            </div>
                            {/* Add additional fields for editing */}
                            <div className='w-fit h-fit content-center text-left text-white text-4xl mb-5 w-full h-3/4'>
                                <button
                                    className="cursor-pointer bg-black hover:bg-slate-700 border-none rounded-xl text-base px-5 py-2.5"
                                    type="submit"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2"> {formData.name}</h2>
                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_email} className="w-7 h-7" alt="Email Icon" />
                                <p className="text-gray-600"> {formData.email}</p>
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_location} className="w-7 h-7" alt="Location Icon" />
                                <p className="text-gray-700 mb-2"> {formData.address}</p>
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_billing_address} className="w-7 h-7" alt="Billing Icon" />
                                <p className="text-gray-700 mb-2"> {formData.billingAddress}</p>
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_phone} className="w-7 h-7" alt="Phone Icon" />
                                <p className="text-gray-700 mb-2"> {formData.phone}</p>
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                                <Image src={LA_coins} className="w-7 h-7" alt="Email Icon" />
                                <p className="text-gray-700 mb-2"> {formData.aCoins}</p>
                            </div>

                            <div className='w-fit h-fit content-center text-left text-white text-4xl mb-5 w-full h-3/4'>
                                <button
                                    className="cursor-pointer bg-black hover:bg-slate-700 border-none rounded-xl text-base px-5 py-2.5"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Editar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Pedidos */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-1/2 p-6 mx-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-2"> Últimos Pedidos </h2>
                {formData.orders.slice(0, 2).map((order: any, index: number) => (
                    <div key={index}
                        className="flex flex-col items-left border rounded-lg shadow-xl overflow-hidden bg-slate-50 transition-transform hover:bg-white hover:translate-y-2.5 p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <Image src={LA_billing_address} className="w-7 h-7" alt="Billing Icon" />
                            <p className="text-gray-700">Pedido #{order.order_number} - {order.status}</p>
                        </div>
                        <div className="ml-9">
                            {order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between mb-1">
                                    <span>{item.name} (x{item.qty})</span>
                                    <span>{item.price.toFixed(2)} €</span>
                                </div>
                            ))}
                        </div>
                        <div className="self-end mb-1">
                            <p>Subtotal : {order.subtotal} €</p>
                            <p>Total: {order.total} €</p>
                        </div>
                    </div>
                ))}
                <Link href="/orders">
                    <button
                        className="cursor-pointer text-white bg-black hover:bg-slate-700 border-none rounded-xl text-base px-5 py-2.5">
                        Ver más...
                    </button>
                </Link>

                <h2 className="text-xl font-semibold text-gray-800 mb-2"> Metodos de Pago </h2>
                <div
                    className="flex flex-col items-left border rounded-lg shadow-xl overflow-hidden bg-slate-50 transition-transform hover:bg-white hover:translate-y-2.5 p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Image src={LA_credit_card} className="w-7 h-7" alt="Credit Card Icon" />
                        <p className="text-gray-700">Tarjeta ...{formData.payment.number}</p>
                    </div>
                    <div className="ml-9">
                        <p className="text-gray-700">{formData.name}</p>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default UserProfile;

