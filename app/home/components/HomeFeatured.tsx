// tejedor/app/home/components/HomeFeatured.tsx
import React from 'react';

import WorkshopImg from '@/public/images/LA_workshop.png';
import BlogImg from '@/public/images/LA_blog.png';
import ContentZeroImg from '@/public/images/LA_content_zero.png';

import '../Home.css';
import Image from 'next/image';


const HomeFeatured = () => {
    /* Revisar estilos */
    return (

        <section className="bg-gray-100 p-5 mt-10">
            <h2 className='text-center text-4xl text-black mb-5'>Destacados</h2>
            <div className="home-featured-container grid">
                <div className="home-featured-big">
                    <div className="featured-big-image-container">
                        <Image src={WorkshopImg} alt="Talleres Online, Eventos y Clases" className="featured-image" />
                    </div>
                    <div className="featured-big-content">
                        <h2 className="featured-title">Talleres Online, Eventos y Clases</h2>
                        <p className="featured-description">No te pierdas las clases online y presenciales para tejedoras y crafters</p>
                    </div>
                </div>
                <div className="home-featured-list">
                    <div className="featured-item">
                        <div className="featured-image-container">
                            <Image src={BlogImg} alt="Blog" className="featured-image" />
                        </div>
                        <div className="featured-content">
                            <h2 className="featured-title">Blog</h2>
                            <p className="featured-description">Consejos e ideas para tejedoras para llevar tu crochet a otro nivel y convertirte en Tejedora Consciente</p>
                        </div>
                    </div>
                    <div className="featured-item">
                        <div className="featured-image-container">
                            <Image src={ContentZeroImg} alt="Contenido a coste Cero" className="featured-image" />
                        </div>
                        <div className="featured-content">
                            <h2 className="featured-title">Contenido a coste Cero</h2>
                            <p className="featured-description">Si disfrutas del contenido puedes hacer tu donación</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeFeatured;
