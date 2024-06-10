// app/components/LoginForm.tsx

import Link from 'next/link';
import { useState } from 'react';

import './Components.css';
import { useRouter } from 'next/router';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {/*
            const response = await axios.post('/api/auth/login', {
                username,
                password
            });

            const { token, user } = response.data;

            // Almacenar el token y la información del usuario en el almacenamiento local
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            */

            useRouter().push('/profile');

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-3xl font-bold mb-6'>Iniciar sesión</h2>
            <form onSubmit={handleLogin} className='w-full max-w-sm'>
                <div className='mb-4'>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    />
                </div>
                <div className='mb-6'>
                    <button type="submit"
                        className='w-full bg-black text-white px-4 py-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring focus:border-blue-300'>
                        Login
                    </button>
                </div>
            </form>
            <div className='text-center text-blue-500'>
                <p>¿No tienes una cuenta?</p>
                <Link href="/register">
                    <p className='underline'>Registrarse</p>
                </Link>
            </div>
        </div>

    );
};

export default LoginForm;
