import axiosClient from "../interceptor/axiosClient"
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getOrderFetch = async(accessToken)=>{
    try{
        
        const response = await axiosClient.get(`/order/get-all-order`,
            {
                useAuth:true
            },
        )

        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch Data: ",error);
        return [];
    }
}

export const getDetailOrderFetch = async(orderId)=>{
    try{
        var queryParams = {}
        queryParams.orderId=orderId;
        const response = await axiosClient.get(`/order/get-detail-order`,{
            params:queryParams,
            useAuth:true

        }
        )

        return response.data;
    }
    catch(error){
         console.error("Lỗi khi fetch Data: ",error);
        return [];
    }

}

export const CancelOrder = async({orderId})=>{
    try{
        var queryParams = {}
        queryParams.orderId=orderId;
        const response = await axiosClient.put(`/order/update-order-status/${orderId}`,
            {
                status:"Đã hủy",
            },
            {
                useAuth:true
            }
        )

        return response.data;
    }
    catch(error){
         console.error("Lỗi khi fetch Data: ",error);
        return [];
    }

}