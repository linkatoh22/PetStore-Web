import { useQuery,useMutation } from "@tanstack/react-query";
import { GetDetailPet,AddToCart,GetDetailProduct } from "../api/DetailAPI";

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
