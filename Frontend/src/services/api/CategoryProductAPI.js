import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const productQueryFetch = async(subcategory,category,sort,limit,page,species)=>{
    try{
        var queryParams = {};
        if(subcategory!==""){
            queryParams.subcategory = subcategory;
        }
        if(category!==""){
            queryParams.category=category;
        }
        if(species!==""){
            queryParams.species=species;
        }
        queryParams.sort=sort?sort:0;
        queryParams.limit=limit?limit:16;
        queryParams.page=page?page:1;
        
        const response = await axios.get(BASE_URL+'/product/product-query',{params:queryParams})
        
        return response.data;
    }
    catch{
        console.error("Lỗi khi fetch data:",error);
        return [];
    }

}