import { useQuery,useMutation } from "@tanstack/react-query";
import { getOrderFetch, getDetailOrderFetch } from "../api/InfoAPI";

export const useGetOrder = ()=>useQuery({
    queryKey:['Cart/GetAllOrder'],
    queryFn:()=>getOrderFetch()
})

export const useGetDetailOrderFetch = (orderId)=>useQuery({
    queryKey:['Cart/GetDetailOrder',orderId],
    queryFn:()=>getDetailOrderFetch(orderId)
})