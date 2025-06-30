import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SignUpAPI = async ({email,password,username}) => {
    try{
        const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
            email,
            username,
            password});
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error during sign up:", error);
        return error.message;
    }
}