import { useQuery,useMutation } from "@tanstack/react-query";
import { getCartFetch,DeleteItem,EditQuantity,getCartUnactive } from "../api/CartAPI";

export const useGetCart = (accessToken)=>useQuery({
    queryKey:['Cart/GetCart'],
    queryFn:()=>getCartFetch(accessToken)
})

export const useGetCartUnactive = ()=>useQuery({
    queryKey:['Cart/GetCartUnactive'],
    queryFn:()=>getCartUnactive()
})

export const useDeleteCartItem = (accessToken)=>{

    return useMutation({
        mutationKey:['Cart/DeleteCartItem'],
        mutationFn:(ItemId)=>DeleteItem(ItemId,accessToken)
    })
}

export const useEditCartItem = (accessToken)=> {
    
    return useMutation({
        mutationKey:['Cart/EditCartItem'],
        mutationFn:({amount,ItemId})=>EditQuantity({amount,ItemId})
    })
}