// app/components/LoginForm.tsx
'use client'

import { useState } from 'react';
import useAuthentication from '@/app/hooks/UseAuthentication';


const SignUpForm: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [phone, setPhone] = useState('');

    const { error, success, credentialError, handleRegister } = useAuthentication({
        redirect: (url: string) => {
            window.location.href = url; // Redirige usando el navegador
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleRegister(username, password, email, address, billingAddress, phone);
        } catch (error) {
            // handle error
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            {success && <div className='text-green-500 mb-4'>{success}</div>}
            {!success && (
                <>
                    <h2 className='text-3xl font-bold mb-6'>Iniciar sesión</h2>
                    {error && <div className='text-red-500 mb-4'>{error}</div>}
                    <form onSubmit={handleSubmit} className='w-full max-w-sm'>
                        { /* Username */}
                        <div className='mb-4'>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${credentialError ? 'border-rose-600' : 'focus:border-blue-300'}`}
                            />
                        </div>
                        { /* Password */}
                        <div className='mb-4'>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${credentialError ? 'border-rose-600' : 'focus:border-blue-300'}`}
                            />
                        </div>
                        { /* Email */}
                        <div className='mb-4'>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${credentialError ? 'border-rose-600' : 'focus:border-blue-300'}`}
                            />
                        </div>
                        { /* Direccion */}
                        <div className='mb-4'>
                            <input
                                type="text"
                                placeholder="Direccion"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${credentialError ? 'border-rose-600' : 'focus:border-blue-300'}`}
                            />
                        </div>
                        { /* Direccion de facturacion */}
                        <div className='mb-4'>
                            <input
                                type="text"
                                placeholder="Direccion de Facturacion"
                                value={billingAddress}
                                onChange={(e) => setBillingAddress(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${credentialError ? 'border-rose-600' : 'focus:border-blue-300'}`}
                            />
                        </div>
                        { /* Numero de telefono */}
                        <div className='mb-4'>
                            <input
                                type="text"
                                placeholder="Telefono"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${credentialError ? 'border-rose-600' : 'focus:border-blue-300'}`}
                            />
                        </div>
                        { /* Submit */}
                        <div className='mb-6'>
                            <button type="submit"
                                className='w-full bg-black text-white px-4 py-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring focus:border-blue-300'>
                                Registrar
                            </button>
                        </div>
                    </form>
                    <div className='text-center text-blue-500'>
                        <p>¿Ya tienes una cuenta?</p>
                        <button onClick={toggleForm} className='underline'>Iniciar sesión</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SignUpForm;
