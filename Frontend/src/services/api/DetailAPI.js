import axios from "axios";
import axiosClient from "../interceptor/axiosClient";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const GetDetailPet = async (id)=>{
    try{
        // console.log("HERE")
        var queryParams = {}
        queryParams.id=id;
        // console.log("ID NE: ",id)
        const response = await axios.get(`${BASE_URL}/pet/detail-pet`,{params:queryParams})
        console.log("KET QUA NE", response.data.PetDetail)
        return response.data
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];
    }
}

export const AddToCart = async({ itemType, item, variant, quantity }, accessToken)=>{
    try{
        
        var reqBody={};
        if (itemType) reqBody.itemType=itemType;
        if(item) reqBody.item = item;
        if (quantity) reqBody.quantity =quantity;
        if (variant) reqBody.variant = variant;

        const response = await axiosClient.post(`/cart/add-to-cart`,
            reqBody,
            {
                useAuth: true
            }
        );
        console.log("DAT HANG THANH CONG", response.data);
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        throw error;
    }
}