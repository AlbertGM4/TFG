// hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext'; // Importa el contexto de autenticación
import { fetchOrdersData, fetchUser, updateUser } from '@/app/services/DataASP';
import { User } from '../models/ModelsASP';
import { UseProps } from '@/app/models/ModelsASP';

import * as jwtDecode from 'jwt-decode'; // Forma alternativa


const useUserProfile = ({ redirect }: UseProps) => {
    // Custom Data    
    const card = { type: 'credit', number: '123456789' }
    // Custom Data

    const { cookies } = useAuth(); // Obtén el usuario del contexto de autenticación
    const [user, setUser] = useState<User>({
        userID: 0,
        profileImageRoute: '',
        userName: '',
        userEmail: '',
        address: '',
        billingAddress: '',
        phone: '',
        aCoins: 0,
        orders: [],
        payment: card,
    });

    const [originalUser, setOriginalUser] = useState<User>(user);
    const [isEditing, setIsEditing] = useState(false);
    const [tokenExpired, setTokenExpired] = useState(''); // Estado para manejar el token expirado

    useEffect(() => {
        const loadUserProfile = async () => {
            const token = cookies.get('token');

            if (!token) {
                // Si no hay token, manejar la situación
                console.log('No se encontró un token válido.');
                setTokenExpired('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'); // Mostrar mensaje de token expirado o inválido
                setTimeout(() => {
                    redirect('/'); // Utiliza la función de redirección
                }, 2000); // Redirige después de 2 segundos
                return;
            }

            try {
                const decodedToken: any = jwtDecode.jwtDecode(token); // Decodificar el token JWT
                // Comprueba si el token ha expirado
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    console.log('Token expirado');
                    setTokenExpired('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'); // Mostrar mensaje de token expirado o inválido
                    setTimeout(() => {
                        redirect('/'); // Utiliza la función de redirección
                    }, 2000); // Redirige después de 2 segundos
                    return;
                }

                const responseUser = await fetchUser(decodedToken["unique_name"]);
                var { fetchedOrders: orderResponse, fetchedOrderLines: orderLineResponse } = await fetchOrdersData();

                orderResponse = orderResponse.filter(
                    order => order.customerID === responseUser.userID
                );

                setUser(prevUser => ({
                    ...prevUser,
                    profileImageRoute: responseUser.profileImageRoute ?? '',
                    userName: responseUser.userName ?? '',
                    userEmail: responseUser.userEmail ?? '',
                    address: responseUser.address ?? '',
                    billingAddress: responseUser.billingAddress ?? '',
                    phone: responseUser.phone ?? '',
                    aCoins: responseUser.aCoins ?? 0,
                    orders: orderResponse ?? [],
                }));
                // Guardar el usuario original
                setOriginalUser({
                    ...responseUser,
                    payment: card // Aquí deberías ajustar según el modelo de payment que tengas
                });
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };

        loadUserProfile();

    }, [cookies]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleDiscard = () => {
        setUser(originalUser);
        setIsEditing(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsEditing(false);
            const token = cookies.get('token');
            const decodedToken: any = jwtDecode.jwtDecode(token);
            const response = await updateUser(decodedToken["unique_name"], user); // Pasas los datos actualizados a la función updateUser
            console.log("Usuario actualizado:", response);
            // Puedes hacer algo con la respuesta si lo necesitas
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            // Maneja el error de manera adecuada
        }
    };

    return { user, isEditing, setIsEditing, handleChange, handleDiscard, handleSubmit, tokenExpired };
};

export default useUserProfile;
