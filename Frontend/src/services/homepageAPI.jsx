import axios from "axios";
export const PetFetch = async()=>{
    try{
        const response = await axios.get("http://localhost:3000/api/pet/pet-most-sold")
        
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];

    }
}