import { useQuery,useMutation } from "@tanstack/react-query";
import { GetDetailPet,AddToCart } from "../api/DetailAPI";

export const useGetDetailPet = (id)=>useQuery({
    queryKey:['Detail/Pet',id],
    queryFn:()=>GetDetailPet(id),
    keepPreviousData:true
})
export const useAddToCart = (accessToken)=>{
    
    return useMutation(
    {
        mutationKey:['Detail/Add-To-Cart'],
        mutationFn:({ itemType, item, variant, quantity })=>AddToCart({ itemType, item, variant, quantity }, accessToken)
    }
)}
