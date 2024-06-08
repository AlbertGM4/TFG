"use client";
import { useEffect, useState } from 'react';

import LA_billing_address from '@/public/images/LA_billing_address.png';

import Image from 'next/image';


const AllOrdersPage = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Lógica para obtener todos los pedidos, podría ser una llamada a una API
        const fetchOrders = async () => {
            try {
                const response = await fetch('URL para obtener todos los pedidos');
                const data = await response.json();

                // Por ahora                 

                setOrders(data.orders); // Suponiendo que los pedidos están en un objeto 'orders'
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const ordersSample = [
        {
            order_number: 1234,
            status: 'En proceso',
            items: [
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
            ],
            subtotal: 15.,
            total: 19.
        },
        {
            order_number: 5678,
            status: 'Donete',
            items: [
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
            ],
            subtotal: 15.,
            total: 19.
        },
        {
            order_number: 9123,
            status: 'Reparto',
            items: [
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
                {
                    name: 'Algodon',
                    price: 4.5,
                    qty: 2,
                },
                {
                    name: 'Algodon',
                    price: 4.5,
                    qty: 2,
                },
            ],
            subtotal: 15.,
            total: 19.
        },
    ]

    return (
        <section>
            <h2 className="text-4xl font-bold text-center my-8">Pedidos</h2>
            <div className="flex justify-center">
                <div className="flex flex-wrap w-full justify-around gap-8 max-w-screen-xl p-4">
                    {ordersSample.map((order, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-left border rounded-lg shadow-xl overflow-hidden bg-slate-50 transition-transform hover:bg-white hover:translate-y-2.5 p-4 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
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
                            <div className="mt-auto w-full">
                                <hr className="border-t-2 border-gray-300 my-4" />
                                <div className="self-end mt-auto">
                                    <p>Subtotal : {order.subtotal} €</p>
                                    <p>Total: {order.total} €</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default AllOrdersPage;
