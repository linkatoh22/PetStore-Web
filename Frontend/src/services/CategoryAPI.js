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

export const petQueryFetchFilter = async (gender,color,maxPrice,minPrice,sort,breed) =>{
    try{
        var queryParams = {}; 
        if(gender !== "")
            queryParams.gender = gender;
        if(Array.isArray(color) && color.length > 0)
            queryParams.color = color;
        if(maxPrice!=="")
            queryParams.maxPrice = maxPrice;
        if(minPrice!=="")
            queryParams.minPrice = minPrice
        if(sort)
            queryParams.sort = sort;
        queryParams.breed=breed;
        console.log("Filter NE",queryParams)
        const response  = await axios.get(BASE_URL+`pet-query`,{params:queryParams})
        console.log("KET QUA NE", response.data)
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];
    }

}