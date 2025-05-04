import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const FetchPetSearch = async (keyword,page,limit,sort,species)=>{
    try{
        var queryParams = {};

        if(keyword!==""){
            queryParams.keyword=keyword;
        }
        if(species!==""){
            queryParams.species=species;
        }

        queryParams.sort=sort?sort:0;
        queryParams.limit=limit?limit:16;
        queryParams.page=page?page:1;

        
        const response = await axios.get(BASE_URL+`/pet/pet-search`,{params:queryParams});

        // console.log('Data pet search:',response.data)
        return response.data;

    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];
    }
}

export const FetchProductSearch = async (keyword,page,limit,sort)=>{
    try{
        var queryParams = {};

        if(keyword!==""){
            queryParams.keyword=keyword;
        }
        queryParams.sort=sort?sort:0;
        queryParams.limit=limit?limit:16;
        queryParams.page=page?page:1;

        
        const response = await axios.get(BASE_URL+`/product/product-search`,{params:queryParams});

        // console.log('Data pet search:',response.data)
        return response.data;

    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];
    }
}

export const FetchSearchAll = async (keyword,page,limit,sort)=>{
    try{
        var queryParams = {};

        if(keyword!==""){
            queryParams.keyword=keyword;
        }
        queryParams.sort=sort?sort:0;
        queryParams.limit=limit?limit:16;
        queryParams.page=page?page:1;

        
        const response = await axios.get(BASE_URL+`/product/search-all`,{params:queryParams});

        
        return response.data;

    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        return [];
    }
}