// hooks/UseAuthentication.tsx

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext'; // Importa el contexto de autenticación
import { fetchLogin } from '@/app/services/DataASP'; // Importa la función de solicitud de inicio de sesión
import { fetchRegister } from '@/app/services/DataASP'; // Importa la función de solicitud de inicio de sesión
import { UseProps } from '@/app/models/ModelsASP';


const useAuthentication = ({ redirect }: UseProps) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [credentialError, setCredentialError] = useState(false);
    const { cookies, login, logout } = useAuth();

    const handleLogin = async (username: string, password: string) => {
        setError('');
        setSuccess('');
        setCredentialError(false);

        try {
            const response = await fetchLogin(username, password);

            if (response.status === 200) {
                setSuccess('Inicio de sesión exitoso. Redirigiendo a perfil...');
                login(response.data['token']); // Guarda el token usando el contexto de autenticación
                setTimeout(() => {
                    redirect('/profile'); // Utiliza la función de redirección
                }, 2000); // Redirige después de 2 segundos
            } else if (response.status === 500) {
                setError('Error del servidor, por favor intenta de nuevo más tarde.');
            } else if (response.status === 401) {
                setError('Credenciales incorrectas, por favor verifica tu usuario y contraseña.');
                setCredentialError(true);
            }
        } catch (error) {
            setError('Ocurrió un error inesperado, por favor intenta de nuevo.');
        }
    };

    const handleLogout = async () => {
        setError('');
        setSuccess('');
        setCredentialError(false);

        try {
            logout()
            setSuccess('Sesion cerrada. Redirigiendo a inicio...');
            setTimeout(() => {
                redirect('/');
            }, 2000); // Redirige después de 2 segundos
        } catch (error) {
            setError('Ocurrió un error inesperado, por favor intenta de nuevo.');
        }

    }

    const handleRegister =
        async (username: string, password: string, email: string, address: string, billingAddress: string, phone: string) => {
            setError('');
            setSuccess('');
            setCredentialError(false);

            try {
                const response = await fetchRegister(username, password, email, address, billingAddress, phone);

                if (response.status === 200) {
                    setSuccess('Inicio de sesión exitoso. Redirigiendo a perfil...');
                    login(response.data['token']); // Guarda el token usando el contexto de autenticación
                    setTimeout(() => {
                        redirect('/profile'); // Utiliza la función de redirección
                    }, 2000); // Redirige después de 2 segundos
                } else if (response.status === 500) {
                    setError('Error del servidor, por favor intenta de nuevo más tarde.');
                } else if (response.status === 401) {
                    setError('Credenciales incorrectas, por favor verifica tu usuario y contraseña.');
                    setCredentialError(true);
                }
            } catch (error) {
                setError('Ocurrió un error inesperado, por favor intenta de nuevo.');
            }
        };

    return { error, success, credentialError, cookies, handleLogin, handleLogout, handleRegister };
};

export default useAuthentication;
