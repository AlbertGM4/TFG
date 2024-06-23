// product/[categoryName].tsx

'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useCart } from '@/app/context/CartContext';
import { CartItem, Product } from '@/app/models/ModelsASP';
import { fetchProduct } from '@/app/services/DataASP';

import Image from 'next/image';


const ProductPage = ({ params }: { params: { productID: number } }) => {
    const [product, setProduct] = useState<Product>();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [popupAddedCart, setPopupAddedCart] = useState(false);
    const { addToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        async function loadProduct() {
            try {
                const productData = await fetchProduct(params.productID);
                console.log("Products data: ", productData)
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, []);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const handleAddToCart = () => {
        if (product) {
            const cartItem: CartItem = {
                productId: product.productID,
                productName: product.productName,
                productPrice: product.productPrice,
                productImageRoute: product.productImagesRoute,
                quantity: quantity,
            };
            addToCart(cartItem);
            setPopupAddedCart(true); // Muestra el popup
            setTimeout(() => {
                setPopupAddedCart(false); // Oculta el popup después de 3 segundos
            }, 3000);
            console.log(`Añadido ${quantity} de ${product.productName} al carrito`);
        }
    }


    const handleBackClick = () => {
        router.back();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl">Cargando...</p>
            </div>
        );
    }

    return (
        <section className="flex justify-center items-center my-8">
            <button
                onClick={handleBackClick}
                className="self-start mb-4 p-2 bg-black text-white rounded-lg hover:bg-slate-700"
            >
                &#8592; {/* Unicode para la flecha hacia la izquierda */}
            </button>
            {
                product && (
                    <div className="flex flex-col md:flex-row max-w-screen-lg w-full p-4 border border-solid rounded-lg shadow-xl bg-slate-100">
                        <div className="relative w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center overflow-hidden mb-4 md:mb-0">
                            <Image
                                src={product.productImagesRoute}
                                alt={product.productName}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-4 flex flex-col">
                            <h2 className="text-2xl font-bold mb-4">{product.productName}</h2>
                            <p className="mb-4 text-justify whitespace-pre-wrap">{product.productDescription}</p>
                            <div className="flex-grow"></div> {/* Espacio flexible para empujar hacia abajo */}
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center">
                                    <p className="font-bold mr-4">Cantidad:</p>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="w-16 p-2 border border-gray-300 rounded-lg text-center"
                                    />
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-700"
                                >
                                    Add to Cart
                                </button>
                                {popupAddedCart && (
                                    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                                        ¡Producto añadido al carrito!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </section >
    );
};

export default ProductPage;
