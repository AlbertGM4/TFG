// src/pages/Home/components/HomeInfo.jsx
import React from 'react';
import PodcastImg from '@/public/images/LA_podcast.png';
import AboutImg from '@/public/images/LA_about.png';

import '../Home.css';
import Image from 'next/image';


const HomeInfo = () => {

    return (

        <section className="home-info">

            <div className="home-info-list">
                <div className="info-item">
                    <div className="info-image-container">
                        <Image src={PodcastImg} alt="Podcast" className="info-image" />
                    </div>
                    <div className="info-content">
                        <h2 className="info-title">Podcast</h2>
                        <p className="info-description">Escucha Craftivity, tu podcast de confianza para conocer el detrás de cámaras de proyectos dentro del mundo Craft y de Artesania. </p>
                    </div>
                </div>

                <div className="info-item">
                    <div className="info-image-container">
                        <Image src={AboutImg} alt="About me" className="info-image" />
                    </div>
                    <div className="info-content">
                        <h2 className="info-title">Sobre mi</h2>
                        <p className="info-description">Introvertida disfrazada de extrovertida. Diseñadora de crochet, educadora de formación y corazón. En general, ser humano feliz y bastante desastre a la vez.</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HomeInfo;
