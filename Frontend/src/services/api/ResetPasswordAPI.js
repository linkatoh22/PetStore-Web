import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SendLinkToEmail = async ({email})=>{
    try{
        
        const response = await axios.post(`${BASE_URL}/forget-password/send-link-to-email`,{email:email})
        return response.data
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        throw error;
    }
    
}

export const ResetPassword = async ({token,password})=>{
    try{
        const response = await axios.post(`${BASE_URL}/forget-password/reset-password/${token}`,{password:password})
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        throw error;
    }
    
}