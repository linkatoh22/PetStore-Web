import {useQuery} from '@tanstack/react-query'
import { FetchPetSearch,FetchProductSearch,FetchSearchAll } from "../api/CategorySearchAPI";

export const usePetSearch = ({keyword,page,limit,sort,species})=>useQuery({
    queryKey:['CategorySearch/PetSearch',keyword,page,limit,sort,species],
    queryFn: ()=>FetchPetSearch(keyword,page,limit,sort,species),
    keepPreviousData:true,
})

export const useProductSearch = ({keyword,page,limit,sort})=>useQuery({
    queryKey:['CategorySearch/ProductSearch',keyword,page,limit,sort],
    queryFn: ()=>FetchProductSearch(keyword,page,limit,sort),
    keepPreviousData:true,
})

export const useSearchAll = ({keyword,page,limit,sort})=>useQuery({
    queryKey:['CategorySearch/SearchAll',keyword,page,limit,sort],
    queryFn: ()=>FetchSearchAll(keyword,page,limit,sort),
    keepPreviousData:true,
})
