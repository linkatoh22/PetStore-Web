import axios from "axios";
const BASE_URL =import.meta.env.VITE_BASE_URL;
export const PetFetch = async()=>{
    try{
        const response = await axios.get(`${BASE_URL}/pet/pet-most-sold`);
        // console.log('Data ne:',response.data)
        return response.data.pets;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];

    }
}

export const ProductFetch = async ()=>{
    try{
        const response =  await axios.get(`${BASE_URL}/product/product-most-sold`);
        // console.log('Data pRODUCT ne:',response.data)
        return response.data.products;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];
    }

}