import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SignUpAPI = async ({username,email,password}) => {
    try{
        const response = await axios.post(`${BASE_URL}/auth/signup`, {
            username,
            email,
            password});
        return response.data;
    }
    catch (error) {
        console.error("Error during sign up:", error);
        return error.message;
    }
}