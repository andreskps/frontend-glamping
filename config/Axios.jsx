import axios from "axios";
import { useAuthStore } from "../src/store/authStore";
const clienteAxios = axios.create({
    
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    
})

clienteAxios.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers ={
            Authorization: `Bearer ${token}`,
        }
    }
    return config;
});


export default clienteAxios;