// product/[categoryName].tsx

'use client'

import { Product } from '@/app/models/ModelsASP';
import { fetchProducts } from '@/app/services/DataASP';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

const CategoryPage = ({ params }: { params: { categoryName: string } }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            try {
                const productsData = await fetchProducts(decodeURIComponent(params.categoryName));
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl">Cargando...</p>
            </div>
        );
    }

    return (
        <section>
            <h2 className="text-4xl font-bold text-center my-8">{decodeURIComponent(params.categoryName)}</h2>
            <div className="flex justify-center">
                <div className="flex flex-wrap w-full justify-around gap-8 max-w-screen-xl p-4">
                    {products.map((product, index) => (
                        <div key={index} className="relative p-8 border border-solid rounded-lg shadow-xl flex flex-col items-left overflow-hidden bg-slate-100 transition-transform hover:bg-white hover:translate-y-2.5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                            <Link href={`/product/${encodeURIComponent(product.productID)}`}>
                                <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={product.productImagesRoute}
                                        alt={product.productName}
                                        className="object-cover"
                                        layout="fill"
                                    />
                                </div>
                                <h2 className="text-xl font-bold mb-2 text-left">{product.productName}</h2>
                                <p className="text-left">Price: {product.productPrice} €</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;
