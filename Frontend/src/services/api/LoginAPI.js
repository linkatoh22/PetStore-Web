import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LoginAPI = async ({ email, password }) => {
    
    const response = await axios.post(`${BASE_URL}/auth/log-in`, {
        email,
        password,
    },
    {
        withCredentials: true
    });
    console.log("Login response:", response.data);
    return response.data;

    
    
}
