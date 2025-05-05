import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const VerifyOtp = async (userId, otp) => {
    try{
        const response = await axios.post(`${BASE_URL}/auth/verify-OTP`, { userId, otp });
        return response.data;
    }
    catch(error){
        console.error("Error during OTP verification:", error);
        return error.message;
    }
}

export const ResendOtp = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/resend-OTP`, { email });
        return response.data;
    } catch (error) {
        console.error("Error during OTP resend:", error);
        return error.message;
    }
};