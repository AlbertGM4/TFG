// src/components/header.jsx

"use client";
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import cartGif from '@/public/gifs/cart.gif';
import profileGif from '@/public/gifs/profile.gif';
import searchGif from '@/public/gifs/search.gif';

import './Components.css';


const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Cambia según tu lógica de autenticación
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            setShowAuthPopup(true);
        } else {
            // Navega al perfil
        }
    };

    return (
        <header id='header' className="flex items-center justify-between bg-white p-5">

            <div id='left_header' className="font-bold m-2">
                <Link href="/">
                    <h1 id='site_name'>Laura Algarra | Crochet Designer</h1>
                </Link>
            </div>

            <div id="header_right">
                <ul className="flex list-none">
                    <Link href="/search">
                        <li className='mx-4'><Image src={searchGif} alt="Search" className="w-7 h-7" /></li>
                    </Link>
                    <Link href="/cart">
                        <li className='mx-4'><Image src={cartGif} alt="Cart" className="w-7 h-7" /></li>
                    </Link>
                    <Link href="/profile">
                        <li className='mx-4' onClick={handleProfileClick}><Image src={profileGif} alt="9" className="w-7 h-7" /></li>
                    </Link>
                </ul>
            </div>

        </header>
    );
};

export default Header;