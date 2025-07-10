import { useQuery,useMutation } from "@tanstack/react-query";
import { getOrderFetch, getDetailOrderFetch,CancelOrder } from "../api/InfoAPI";

export const useGetOrder = ()=>useQuery({
    queryKey:['Cart/GetAllOrder'],
    queryFn:()=>getOrderFetch()
})

export const useGetDetailOrderFetch = (orderId)=>useQuery({
    queryKey:['Cart/GetDetailOrder',orderId],
    queryFn:()=>getDetailOrderFetch(orderId)
})

export const useCancelOrder = ()=>{
    return useMutation({
        mutationKey:['Cart/CancelOrder'],
        mutationFn:({orderId})=>CancelOrder({orderId})

    })
}