import { useQuery } from "@tanstack/react-query";
import { productQueryFetch } from "../api/CategoryProductAPI";

export const useProductQueryFetchFilter = ({subcategory,category,sort,limit,page,species})=>useQuery({
    queryKey:['Category/ProductQueryFetchFilter',subcategory,category,sort,limit,page,species],
    queryFn: ()=>productQueryFetch(subcategory,category,sort,limit,page,species),
    keepPreviousData: true,
})