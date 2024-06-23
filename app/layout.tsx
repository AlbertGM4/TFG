import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tejedor",
  description: "Web para amantes del tejido y la costura.",
};

import React from 'react';
import { AuthProvider } from "@/app/context/AuthContext";
import { CartProvider } from "@/app/context/CartContext";
import { RootLayoutProps } from '@/app/models/ModelsASP';

import Header from './components/Header';
import Footer from './components/Footer';

import "./globals.css";


const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (

    <html>
      <body>
        <div className="flex flex-col min-h-screen">
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="flex-grow py-14">{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>

  );
}

export default RootLayout;
