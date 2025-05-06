import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const VerifyOtp = async ({userId, otp}) => {
    
       
        const response = await axios.post(`${BASE_URL}/auth/verify-OTP`, { userId, otp });
        return response.data;
    
}

export const ResendOtp = async ({userId}) => {
        try{
            const response = await axios.post(`${BASE_URL}/auth/resend-OTP`, { userId });
            return response.data;
        }
        catch (error) {
            console.error("Error during resend OTP:", error);
            return error.message;
        }
    
};