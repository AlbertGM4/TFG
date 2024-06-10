// src/components/header.jsx

"use client";

import { useEffect, useRef, useState } from 'react';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import LoginForm from './LoginForm';
import cartGif from '@/public/gifs/cart.gif';
import profileGif from '@/public/gifs/profile.gif';
import searchGif from '@/public/gifs/search.gif';

import './Components.css';


const Header = () => {

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleProfileClick = () => {
        setShowLoginPopup(!showLoginPopup);
    };

    const handleClosePopup = () => {
        setShowLoginPopup(false);
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
                    <li className='mx-4' onClick={handleProfileClick}><Image src={profileGif} alt="Profile" className="w-7 h-7" /></li>
                </ul>
            </div>
            {showLoginPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleClosePopup}>
                    <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <LoginForm />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;