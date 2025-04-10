import axios from "axios"
const BASE_URL = "http://localhost:3000/api/pet/"
export const petQueryFetch =async(query) =>{
    try{
        const response = await axios.get(BASE_URL+`pet-query?${query}`);
        return response.data;
    }

    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];

    }
}