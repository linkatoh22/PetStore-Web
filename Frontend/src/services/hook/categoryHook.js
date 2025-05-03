import { useQuery } from "@tanstack/react-query";
import { petQueryFetch,petQueryFetchFilter } from "../api/CategoryAPI";

export const usePetQueryFetch =(query)=>useQuery({
    queryKey:['Category/PetFetch'],
    queryFn: ()=>petQueryFetch(query),
    keepPreviousData: true,
})

export const usePetQueryFetchFilter =({gender,color,maxPrice,minPrice,sort,breed,species,page,limit})=>useQuery({
    queryKey:['Category/PetQueryFetchFilter',gender,color,maxPrice,minPrice,sort,breed,species,page,limit],
    queryFn: ()=>petQueryFetchFilter(gender,color,maxPrice,minPrice,sort,breed,species,page,limit),
    keepPreviousData: true,
})