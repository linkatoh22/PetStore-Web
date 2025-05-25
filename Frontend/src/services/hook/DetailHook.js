import { useQuery } from "@tanstack/react-query";
import { GetDetailPet,AddToCart } from "../api/DetailAPI";

export const useGetDetailPet = (id)=>useQuery({
    queryKey:['Detail/Pet',id],
    queryFn:()=>GetDetailPet(id),
    keepPreviousData:true
})
export const useAddToCart = ({itemType,item,variant,quantity})=>useQuery({
    queryKey:['Detail/Add-To-Cart'],
    queryFn:()=>AddToCart({itemType,item,variant,quantity}),
})
