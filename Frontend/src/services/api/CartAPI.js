import axiosClient from "../interceptor/axiosClient"
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCartFetch = async(accessToken)=>{
    try{
        
        const response = await axiosClient.get(`/cart/get-cart`,
            
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

export const getCartUnactive = async()=>{
    try{
        const response = await axiosClient.get(`/cart/get-cart-unactive`,
            
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
export const DeleteItem = async (ItemId,accessToken)=>{
    try{
        
        const response = await axiosClient.post(`/cart/delete-cart-item`,
            {
                cartItemId:ItemId.ItemId
            },
            {
                useAuth:true
            }
        );
    return response.data;
    }
    catch(error){
         const message = error.response?.data?.message || error.message;
        throw new Error(message);
    }

}
export const EditQuantity = async({amount,ItemId})=>{
    try{
        console.log(amount);
        console.log(ItemId);
        const queryParams ={};
        queryParams.amount=amount;
        queryParams.cartItem = ItemId;
        
        const response = await axiosClient.put(`${BASE_URL}/cart/edit-cart`,
            { },
            {
                params:queryParams,
                useAuth:true
            }
        );
        return response.data;
    }
    catch(error){
         const message = error.response?.data?.message || error.message;
        throw new Error(message);
    }

}