import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL;
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

export const petQueryFetchFilter = async (gender,color,maxPrice,minPrice,sort,breed,species,page,limit) =>{
    try{
        var queryParams = {}; 
        if(species!=="")
            queryParams.species = species
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
        queryParams.page=page;
        queryParams.limit=limit;
        
        // console.log("Filter NE",queryParams)

        // console.log(BASE_URL+`pet-query`,{params:queryParams})
        const response  = await axios.get(BASE_URL+`/pet/pet-query`,{params:queryParams})
        console.log("KET QUA NE", response.data)
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];
    }

}