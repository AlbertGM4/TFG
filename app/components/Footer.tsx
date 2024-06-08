// src/components/footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

import './Components.css';

const Footer = () => {

    return (

        <footer className="left-0 right-0 bg-gray-100">
            <div id='footer' className="flex justify-between p-10">

                <div id='footer_column_contact' className="flex flex-col">
                    <div id='footer_copyright' className="font-bold">
                        <h1>Laura Algarra | Crochet Designer</h1>
                        <p>© 2021 by Laura Algarra. Todos los derechos reservados.</p>
                    </div>

                    <div id='footer_social_networks' className="flex mt-auto">
                        <a href="https://facebook.com/tupagina" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/lauraalgarra/" target="_blank" rel="noopener noreferrer" className='mx-4'>
                            <FaInstagram />
                        </a>
                        <a href="https://www.youtube.com/@lauraalgarra_" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                <div id="footer_column_pages" className="flex gap-x-40 text-start pr-10">
                    <div id='footer_subcolumn_projects' className="footer-subcolumn">
                        <h4 className='font-bold'>Projectos</h4>
                        <p>Ver projectos</p>
                    </div>

                    <div id="footer_subcolumn_categories" className="footer-subcolumn">
                        <h4 className='font-bold'>Categorias</h4>
                        <p>Todas</p>
                        <p>Patrones Digitales</p>
                        <p>Accesorios Crochet</p>
                    </div>

                    <div id="footer_subcolumn_featured" className="footer-subcolumn">
                        <h4 className='font-bold'>Destacados</h4>
                        <p>Talleres Online, Eventos y Clases</p>
                        <p>Blog</p>
                        <p>Contenido a coste Cero</p>
                    </div>

                    <div id="footer_subcolumn_info" className="footer-subcolumn">
                        <h4 className='font-bold'>Info</h4>
                        <p>Podcast</p>
                        <p>Sobre mi</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;