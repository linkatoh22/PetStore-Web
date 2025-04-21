import axios from "axios";
const BASE_URL ="http://localhost:3000/api";
export const PetFetch = async()=>{
    try{
        const response = await axios.get(`${BASE_URL}/pet/pet-most-sold`);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];

    }
}

export const ProductFetch = async ()=>{
    try{
        const response =  await axios.get(`${BASE_URL}/product/product-most-sold`);
        console.log("response",response.data)
        return response.data;
    }
    catch(error){

    }

}