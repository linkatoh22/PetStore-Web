import axios from "axios";
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

export const AddToCart = async({itemType,item,variant,quantity})=>{
    try{
        var reqBody;
        if (itemType) reqBody.itemType=itemType;
        if(item) reqBody.item = item;
        if(variant) reqBody.quantity =quantity;

        const response = await axios.post(`${BASE_URL}/cart/add-to-cart`,reqBody);
        return response.data;
    }
    catch{
        console.error("Lỗi khi fetch data:",error);
        return [];
    }
}