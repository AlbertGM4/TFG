"use client";

import { useEffect, useState } from 'react';
import LA_billing_address from '@/public/images/LA_billing_address.png';
import useOrder from '@/app/hooks/UseOrder';
import { AllOrderData, Order, OrderLine, Product, User } from '@/app/models/ModelsASP';
import Image from 'next/image';

const AllOrdersPage = () => {
    const { getAllOrderData } = useOrder({
        redirect: (url: string) => {
            window.location.href = url; // Redirige usando el navegador
        }
    });

    const [orders, setOrders] = useState<AllOrderData[]>([]);


    useEffect(() => {
        const fetchUserOrders = async () => {
            const ordersData = await getAllOrderData();
            setOrders(ordersData);
        };

        fetchUserOrders();
    }, []);

    return (
        <section>
            <h2 className="text-4xl font-bold text-center my-8">Pedidos</h2>
            <div className="flex justify-center">
                <div className="flex flex-wrap w-full justify-around gap-8 max-w-screen-xl p-4">
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-left border rounded-lg shadow-xl overflow-hidden bg-slate-50 transition-transform hover:bg-white hover:translate-y-2.5 p-4 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <div className="flex items-center space-x-2 mb-2">
                                <Image src={LA_billing_address} className="w-7 h-7" alt="Billing Icon" />
                                <p className="text-gray-700">Pedido #{order.OrderID} - {order.OrderStatus}</p>
                            </div>
                            <div className="">
                                {order.OrderLines.map((orderLine, idx: number) => {
                                    return (
                                        <div key={idx} className="flex justify-between mb-1">
                                            <span>{orderLine.ProductName} (x{orderLine.ProductQty})</span>
                                            <span className="flex-grow text-right min-w-16">{orderLine.ProductPrice} €</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-auto w-full">
                                <hr className="border-t-2 border-gray-300 my-4" />
                                <div className="self-end mt-auto">
                                    <p>Subtotal: {order.SubTotal} €</p>
                                    <p>Total: {order.Total} €</p>
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
