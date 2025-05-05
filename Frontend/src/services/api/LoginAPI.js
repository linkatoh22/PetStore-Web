import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LoginAPI = async ({ email, password }) => {

    try{
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password,
        });
        console.log("Login response:", response.data);
        return response.data;

    }
    catch(error){
        console.error("Error during login:", error);
        return error.message;
    }
}
