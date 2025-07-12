import { useQuery,useMutation } from "@tanstack/react-query";
import { GetDetailPet,AddToCart,GetDetailProduct,RecommendPet,RecommendProduct } from "../api/DetailAPI";

export const useGetDetailPet = (id)=>useQuery({
    queryKey:['Detail/Pet',id],
    queryFn:()=>GetDetailPet(id)
})
export const useGetDetailProduct = (id)=>useQuery({
    queryKey:['Detail/Product',id],
    queryFn:()=>GetDetailProduct(id)
})
export const useAddToCart = (accessToken)=>{
    return useMutation(
    {
        mutationKey:['Detail/Add-To-Cart'],
        mutationFn:({ itemType, item, variant, quantity })=>AddToCart({ itemType, item, variant, quantity }, accessToken)
    }
)}

export const useRecommendPet = ({species,id})=>useQuery({
    queryKey:['Recommend/Pet',species,id],
    queryFn:()=>RecommendPet({species,id}),
    keepPreviousData: true,
})

export const useRecommendProduct = ({category,id})=>useQuery({
    queryKey:['Recommend/Product',category,id],
    queryFn:()=>RecommendProduct({category,id}),
    keepPreviousData: true,
})