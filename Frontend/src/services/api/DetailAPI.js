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

export const AddToCart = async({ itemType, item, variant, quantity }, accessToken)=>{
    try{
        console.log("ACCESS TOKEN NE",accessToken);
        console.log("ADD TO CART NE",itemType,item,variant,quantity);
        var reqBody={};
        if (itemType) reqBody.itemType=itemType;
        if(item) reqBody.item = item;
        if (quantity) reqBody.quantity =quantity;
        if (variant) reqBody.variant = variant;

        const response = await axios.post(`${BASE_URL}/cart/add-to-cart`,
            reqBody,
            {
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
                ,
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