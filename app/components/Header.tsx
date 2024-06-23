// src/components/header.jsx

"use client";

import { useState } from 'react';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SignInForm from '@/app/profile/components/SignInProfile';
import SignUpForm from '@/app/profile/components/SignUpProfile';
import CartList from '@/app/cart/components/CartList';

import cartGif from '@/public/gifs/cart.gif';
import profileGif from '@/public/gifs/profile.gif';
import searchGif from '@/public/gifs/search.gif';

import './Components.css';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { searchProduct } from '@/app/services/DataASP';


const Header = () => {
    const [showSignPopup, setshowSignPopup] = useState(false); // For Login display
    const [isSignIn, setIsSignIn] = useState(true);
    const [showSearchField, setShowSearchField] = useState(false); // For search input display
    const [showCartList, setShowCartList] = useState(false); // For Cart display
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    // Login
    const handleProfileClick = () => {
        if (isLoggedIn) {
            // Si el usuario está logueado, redirigir al perfil
            router.push('/profile');
        } else {
            // Si no está logueado, mostrar el formulario de login
            setshowSignPopup(!showSignPopup);
        }
    };

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    const handleClosePopup = () => {
        setshowSignPopup(false);
        setIsSignIn(true);
    };

    // Input
    const handleSearchClick = () => {
        setShowSearchField(true);
        // Aplicar un fondo oscuro semi-transparente a la página
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.body.style.overflow = 'hidden'; // Evitar el desplazamiento de la página cuando está oscurecida
    };

    const handleSearch = async () => {
        // Realiza la petición a la API para obtener el productID basado en searchTerm
        try {
            const response = await searchProduct(searchTerm);
            console.log("Response: ", response)

            if (response.productID) {
                // Redirige a la página del producto usando el productID
                router.push(`/product/${response.productID}`);
            } else {
                // Manejo de caso cuando no se encuentra el producto
                alert('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCloseSearch = () => {
        setShowSearchField(false);
        // Restaurar el fondo normal y el desplazamiento de la página
        document.body.style.backgroundColor = '';
        document.body.style.overflow = '';
    };

    // Cart
    const handleCartClick = () => {
        setShowCartList(!showCartList); // Toggle para mostrar/ocultar la lista del carrito
    };

    const handleCloseCart = () => {
        setShowCartList(false);
    };

    return (
        <header id='header' className="flex flex-col md:flex-row items-center justify-between bg-white p-5">
            <div id='left_header' className="font-bold m-2">
                <Link href="/">
                    <h1 id='site_name' className="text-center md:text-left">Laura Algarra | Crochet Designer</h1>
                </Link>
            </div>
            <div id="header_right">
                <ul className="flex list-none justify-center md:justify-end relative items-center">
                    {showSearchField && (
                        <>
                            <div className="overlay" onClick={handleCloseSearch} />
                            <li className='inputHeader'>
                                <input
                                    type="text"
                                    placeholder="¿Qué deseas buscar?"
                                    className="border border-gray-300 p-2 rounded-md pl-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </li>
                        </>
                    )}
                    <li className="mx-4 searchIcon" onClick={handleSearchClick}>
                        <Image
                            src={searchGif}
                            alt="Search"
                            className="w-7 h-7"
                        />
                    </li>
                    <li className='mx-4' onClick={handleCartClick}>
                        <Image
                            src={cartGif}
                            alt="Cart"
                            className="w-7 h-7 static-gif hover:animate-gif"
                        />
                    </li>
                    <li className='mx-4' onClick={handleProfileClick}>
                        <Image
                            src={profileGif}
                            alt="Profile"
                            className="w-7 h-7 static-gif hover:animate-gif"
                        />
                    </li>
                </ul>
            </div>
            {showSignPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleClosePopup}>
                    <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        {isSignIn ? (
                            <SignInForm toggleForm={toggleForm} />
                        ) : (
                            <SignUpForm toggleForm={toggleForm} />
                        )}
                    </div>
                </div>
            )}
            {showCartList && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleCloseCart}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <CartList isOpen={showCartList} onClose={handleCloseCart} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;