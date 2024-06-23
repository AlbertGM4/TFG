// Home/components/HomeCategories.jsx
"use client";

import { useEffect, useState } from 'react';
import { fetchCategories } from '@/app/services/DataASP';
import { Category } from '@/app/models/ModelsASP';

import '../Home.css';
import Image from 'next/image';
import Link from 'next/link';


const Categories = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCategories() {
            try {
                const result = await fetchCategories();
                setCategories(result);
            } catch (error) {
                console.error('Error fetching categories', error);
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
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
            <h2 className="text-4xl font-bold text-center my-8">Categorias</h2>
            <div className="flex justify-center">
                <div className="flex flex-wrap w-full justify-around gap-8 max-w-screen-xl p-4">
                    {categories.map((category) => (
                        <div className="category-card relative p-4 border border-solid rounded-lg shadow-xl flex flex-col items-center overflow-hidden bg-slate-100 transition-transform hover:bg-white hover:translate-y-2.5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 cursor-pointer" >
                            <Link href={`/category/${encodeURIComponent(category.categoryName)}`}>
                                <div className="category-image relative w-full h-48 flex items-center justify-center overflow-hidden mb-4">
                                    <Image
                                        src={category.categoryImagesRoute}
                                        alt={category.categoryName}
                                        className="object-cover"
                                        layout="fill"
                                    />
                                </div>
                                <h2 className="text-xl font-bold mb-2 text-center">{category.categoryName}</h2>
                                <p className="text-center">{category.categoryDescription}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default Categories;

{
    /*
    <section>
            <h2 className="text-4xl font-bold text-center my-8">Categorias</h2>
            <div className="flex justify-center">
                <div className="flex flex-wrap w-full justify-around gap-8 max-w-screen-xl p-4">
                    {
                        <>
                            {categories.map((category, index) => (

                                <div key={index}
                                    className="relative p-8 border border-solid rounded-lg shadow-xl flex flex-col items-left overflow-hidden bg-slate-100 transition-transform hover:bg-white hover:translate-y-2.5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" >

                                    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={category.categoryImagesRoute}
                                            alt={category.categoryName}
                                            className="object-cover"
                                            width={200}
                                            height={200}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                    </div>
                                    <h2 className="text-xl font-bold mb-2 text-left">{category.categoryName}</h2>
                                    <p className="text-left">{category.categoryDescription}</p>

                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        </section>
     */
}