import axios from "axios";
import axiosClient from "../interceptor/axiosClient";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getTinhThanh = async()=>{
    try{
        const response = await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`)
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch Data: ",error);
        return [];
    }
}

export const getQuanHuyen = async({TinhThanhId})=>{
    try{
        
        const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${TinhThanhId}.htm`)
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch Data: ",error);
        return [];
    }
}

export const getPhuongXa = async({QuanHuyenId})=>{
    try{
        const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${QuanHuyenId}.htm`)
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch Data: ",error);
        return [];
    }
}

export const CheckOut = async ({items,shippingInfo})=>{
    try{
        const response  = await axiosClient.post(
            `${BASE_URL}/order/create-order`,
            {
                items,
                shippingInfo
            },
            {
                useAuth:true
            }
        )
        return response.data;
    }
    catch(error){
        const message = error.response?.data?.message || error.message;
        throw new Error(message);
    }
}