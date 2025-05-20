import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const GetDetailPet = async (id)=>{
    try{
        var queryParams = {}
        queryParams.id=id;
        console.log("ID NE: ",id)
        const response = await axios.get(`${BASE_URL}/pet/detail-pet`,{params:queryParams})
        console.log("KET QUA NE", response.data.PetDetail)
        return response.data
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];
    }
}