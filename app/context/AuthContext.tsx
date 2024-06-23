// context/AuthContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';

import { AuthContextType, ProviderProps } from '@/app/models/ModelsASP';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);


    const login = async (token: string) => {
        cookies.set('token', token, { path: '/' }); // Guardar token en cookie
        setIsLoggedIn(true);
    };

    const logout = () => {
        cookies.remove('token'); // Eliminar la cookie del token
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, cookies, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };