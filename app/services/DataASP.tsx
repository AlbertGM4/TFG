// services/ApiASP.tsx

import api from './ApiASP';
import { Category, Order, OrderLine, Product, User } from '@/app/models/ModelsASP';

// AUTENTICACION / VALIDACION

// Para el inicio de sesion
export const fetchLogin = async (username: string, password: string) => {
    try {
        const response = await api.post('Auth/login', {
            UserName: username,
            UserPassword: password,
        });

        return response

    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.log("Error Response: ", error.response);
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.log("Error Request: ", error.request);
        } else {
            // Algo sucedió al configurar la solicitud que desencadenó un error
            console.log("Error Message: ", error.message);
        }
        return error.response;
    }
}

// Para el registro
export const fetchRegister =
    async (username: string, password: string, email: string, address: string, billingAddress: string, phone: string) => {
        try {
            const registerData = {
                UserName: username,
                UserEmail: email,
                UserPassword: password,
                Phone: phone,
                Address: address,
                BillingAddress: billingAddress,

            };
            console.log("registerData: ", registerData)
            const response = await api.post('Auth/register', registerData);

            return response

        } catch (error: any) {
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.log("Error Response: ", error.response);
            } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta
                console.log("Error Request: ", error.request);
            } else {
                // Algo sucedió al configurar la solicitud que desencadenó un error
                console.log("Error Message: ", error.message);
            }
            return error.response;
        }
    }


// CATEGORIAS

// Función para obtener categorías desde el backend
export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await api.get<Category[]>('Category/getCategories'); // Asegúrate de que este endpoint sea correcto
        return response.data;
    } catch (error) {
        console.error('Error fetching categories', error);
        throw error;
    }
};

// Función para agregar una categoría
export const addCategory = async (category: Category): Promise<Category> => {
    try {
        const response = await api.post<Category>('/categories', category);
        return response.data;
    } catch (error) {
        console.error('Error adding category', error);
        throw error;
    }
};


// PRODUCTOS
// Función para obtener 1 producto desde el backend (int)
export const fetchProduct = async (productID: number): Promise<Product> => {
    try {
        const response = await api.get<Product>(`Product/getProduct/${productID}`); // Asegúrate de que este endpoint sea correcto
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

// Función para obtener 1 producto desde el backend (string)
export const searchProduct = async (productName: string): Promise<Product> => {
    try {
        const response = await api.get<Product>(`Product/searchProduct/${productName}`); // Asegúrate de que este endpoint sea correcto
        console.log("res: ", response)
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

// Función para obtener productos desde el backend
export const fetchProducts = async (categoryName: any): Promise<Product[]> => {
    try {
        const responseCategories = (await api.get<Category[]>('Category/getCategories')).data;
        const categoryIds = responseCategories.filter(category => category.categoryName === categoryName)
            .map(category => category.categoryID);

        if (categoryIds.length === 0) {
            throw new Error(`No se encontró ninguna categoría con el nombre ${categoryName}`);
        }

        var responseProducts = (await api.get<Product[]>('/Product/getProducts')).data;

        if (categoryIds[0] != 2) {
            const filteredProducts = responseProducts.filter(product => product.categoryID === categoryIds[0]);
            responseProducts = filteredProducts
        }

        return responseProducts;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

// Función para agregar un producto
export const addProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await api.post<Product>('/products', product);
        return response.data;
    } catch (error) {
        console.error('Error adding product', error);
        throw error;
    }
};


// USUARIOS

// Para obtener usuario
export const fetchUser = async (token: any): Promise<User> => {
    try {
        const response = await api.get('/User/getUser', { headers: { Authorization: `${token}` } })
        return response.data;

    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.log("Error Response: ", error.response);
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.log("Error Request: ", error.request);
        } else {
            // Algo sucedió al configurar la solicitud que desencadenó un error
            console.log("Error Message: ", error.message);
        }
        console.log("Status: ", error.response)
        return error.response;
    }
}

// Para guardar usuario
export const updateUser = async (token: any, updatedInfo: any): Promise<User> => {
    try {
        const response = await api.put('/User/updateUser', updatedInfo, { headers: { Authorization: `${token}` } })
        console.log("Response: ", response)
        return response.data;

    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.log("Error Response: ", error.response);
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.log("Error Request: ", error.request);
        } else {
            // Algo sucedió al configurar la solicitud que desencadenó un error
            console.log("Error Message: ", error.message);
        }
        console.log("Status: ", error.response)
        return error.response || error.request || error.message;
    }
}


// Order

// Función para obtener una orden
export const fetchOrdersData = async (): Promise<{ fetchedOrders: Order[], fetchedOrderLines: OrderLine[] }> => {
    try {
        // Getting all customer Orders
        const orderResponse = (await api.get<Order[]>('Order/getOrders')).data;

        // Getting all customer OrderLines
        const orderLineResponse = (await api.get<OrderLine[]>('OrderLine/getOrderLines')).data;

        // Retornar o manejar la respuesta
        return { fetchedOrders: orderResponse, fetchedOrderLines: orderLineResponse };
    } catch (error) {
        // Manejar errores
        console.log("Data error: ", error)
        console.error('Error al agregar la orden:', error);
        throw error;
    }
};

// Función para agregar una orden
export const addOrder = async (customerName: string, orderData: Order) => {
    try {
        const userResponse = await api.get('/User/getUser', { headers: { Authorization: `${customerName}` } })

        orderData.customerID = userResponse.data.userID

        const orderResponse = await api.post('/Order/addOrder', orderData);

        // Retornar o manejar la respuesta
        return orderResponse;
    } catch (error) {
        // Manejar errores
        console.error('Error al agregar la orden:', error);
        throw error;
    }
};


// Order Line

// Función para agregar lineas de orden
export const addOrderLines = async (orderLinesData: OrderLine[]) => {
    try {
        const response = await api.post('/OrderLine/addOrderLines', orderLinesData)
        // Retornar o manejar la respuesta
        return response.status;
    } catch (error) {
        // Manejar errores
        console.error('Error al agregar la orden:', error);
        throw error;
    }
};
