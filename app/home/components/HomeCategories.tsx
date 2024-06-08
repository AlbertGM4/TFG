// src/pages/Home/components/HomeCategories.jsx

import LA_all from '@/public/images/LA_all.png';
import LA_patrones from '@/public/images/LA_patrones.png';
import La_accesories from '@/public/images/LA_accesories.png';

import '../Home.css';
import Image from 'next/image';


const Categories = () => {

    // Cambiar por solicitud API
    const categories = [
        {
            image: LA_all,
            title: 'Todas',
            description: 'Todos los productos que puedes necesitar',
        },
        {
            image: LA_patrones,
            title: 'Patrones Digitales',
            description: 'Productos de patrones digitales',
        },
        {
            image: La_accesories,
            title: 'Accesorios Crochet',
            description: 'Accesorios de crochet',
        },
        {
            image: La_accesories,
            title: 'Accesorios Crochet',
            description: 'Accesorios de crochet',
        },
        {
            image: La_accesories,
            title: 'Accesorios Crochet',
            description: 'Accesorios de crochet',
        },

    ];

    return (
        <section>
            <h2 className="text-4xl font-bold text-center my-8">Categorias</h2>
            <div className="flex justify-center">
                <div className="flex flex-wrap w-full justify-around gap-8 max-w-screen-xl p-4">
                    {categories.map((category, index) => (
                        <div key={index}
                            className="p-8 border border-solid rounded-lg shadow-xl flex flex-col items-left overflow-hidden bg-slate-100 transition-transform w-1/5 hover:bg-white hover:translate-y-2.5" >
                            <Image src={category.image} alt={category.title} className="object-cover w-full h-full" />
                            <h2 className="text-xl font-bold mb-2 text-left">{category.title}</h2>
                            <p className="text-left">{category.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
