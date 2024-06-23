import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tejedorapi.azure-api.net',
    withCredentials: true
});

export default api;
