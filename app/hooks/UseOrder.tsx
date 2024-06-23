// src/app/hooks/UseOrder.tsx

import { useEffect, useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { addOrder, addOrderLines, fetchOrdersData, fetchProduct, fetchUser } from '@/app/services/DataASP';
import { AllOrderData, Order, OrderLine, Product, UseProps } from '@/app/models/ModelsASP';
import { useAuth } from '@/app/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const useOrder = ({ redirect }: UseProps) => {
    const { cookies } = useAuth();
    const [message, setMessage] = useState('');
    const { cartItems, clearCart } = useCart();
    const [totals, setTotals] = useState({ subtotal: 0.00, total: 0.00 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const calculateTotal = () => {
            let subtotal = 0;
            cartItems.forEach(item => {
                subtotal += item.productPrice * item.quantity;
            });
            setTotals({
                subtotal: subtotal,
                total: subtotal * 1.16 // Ejemplo de impuesto del 16%, ajusta según necesites
            });
        };

        calculateTotal();
    }, [cartItems]);

    const handleMessage = async () => {
        setMessage('');
    }

    const handlePlaceOrder = async () => {

        try {
            const token = cookies.get('token');
            const decodedToken: any = jwtDecode(token);

            const newOrder: Order = {
                Created: new Date(),
                Subtotal: totals.subtotal,
                Total: totals.total,
                Status: 'Pendiente',
                CustomerID: 0,
                PromotionID: 1,
                OrderLines: []
            };

            const orderResponse = await addOrder((decodedToken["unique_name"]), newOrder);

            if (orderResponse.status !== 200) {
                console.log("Error on order")
                return setMessage('Hubo un problema al procesar tu pedido. Por favor, inténtalo de nuevo más tarde.');
            }

            const orderLines: OrderLine[] = cartItems.map(item => ({
                Qty: item.quantity,
                Tax: 0,
                Discount: 0,
                SubTotal: item.productPrice * item.quantity,
                Total: (item.productPrice * item.quantity) + (0) - (0), // Total = SubTotal + Tax - Discount
                OrderID: orderResponse.data,
                ProductID: item.productId
            }));

            const orderLinesResponse = await addOrderLines(orderLines)

            if (orderLinesResponse !== 200) {
                console.log("Error on orderLine")
                return setMessage('Hubo un problema al procesar tu pedido. Por favor, inténtalo de nuevo más tarde.');
            }

            clearCart();
            setMessage('Pedido realizado con éxito!');
            setTimeout(() => {
                redirect('/'); // Utiliza la función de redirección
            }, 2000); // Redirige después de 2 segundos
            return;
        } catch (error) {
            console.error('Error al agregar la orden', error);
            setMessage('Hubo un problema al procesar tu pedido. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const getAllOrderData = async (): Promise<AllOrderData[]> => {
        try {
            const token = cookies.get('token');
            const decodedToken: any = jwtDecode(token);

            const userResponse = await fetchUser(decodedToken["unique_name"]);
            var { fetchedOrders, fetchedOrderLines } = await fetchOrdersData();

            fetchedOrders = fetchedOrders.filter(
                order => order.customerID === userResponse.userID
            );
            console.log("fetchedOrders: ", fetchedOrders)

            // Preparar un mapa para almacenar las líneas de órdenes agrupadas por OrderID
            const orderLinesMap: Map<number, OrderLine[]> = new Map();
            const productMap: Map<number, Product[]> = new Map();

            // Llenar el mapa con las líneas de órdenes agrupadas por OrderID
            await Promise.all(fetchedOrderLines.map(async (orderLine) => {
                // Agregar la línea de orden al mapa orderLinesMap
                if (!orderLinesMap.has(orderLine.orderID)) {
                    orderLinesMap.set(orderLine.orderID, []);
                }
                orderLinesMap.get(orderLine.orderID)?.push(orderLine);

                // Buscar y agregar el producto al mapa productMap si aún no está presente
                if (!productMap.has(orderLine.ProductID)) {
                    const product = await fetchProduct(orderLine.productID);
                    productMap.set(orderLine.productID, product);
                }
            }));
            console.log("orderLinesMap: ", orderLinesMap)

            // Mapear fetchedOrders y construir AllOrderData
            const allOrderData: AllOrderData[] = fetchedOrders.map(order => ({
                OrderID: order.orderID,
                OrderStatus: order.status,
                SubTotal: order.subtotal,
                Total: order.total,
                OrderLines: (orderLinesMap.get(order.orderID) || []).map(
                    orderLine => ({
                        ProductName: productMap.get(orderLine.productID)?.productName || 'Producto no encontrado',
                        ProductQty: orderLine.Qty,
                        ProductPrice: productMap.get(orderLine.productID)?.productPrice,
                        SubTotal: orderLine.SubTotal
                    }))
            }));
            console.log("allOrderData: ", allOrderData)

            return allOrderData;
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    return { cartItems, totals, isMounted, message, handlePlaceOrder, handleMessage, getAllOrderData };
};

export default useOrder;
