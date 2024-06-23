import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tejedorapi.azurewebsites.net/',
    withCredentials: true
});

export default api;
