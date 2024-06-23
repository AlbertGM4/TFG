import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5188', // o https://localhost:7037 si prefieres usar HTTPS
    withCredentials: true // Asegura que las cookies se envíen con cada solicitud
});

export default api;
