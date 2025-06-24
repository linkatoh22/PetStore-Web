import { useQuery,useMutation } from "@tanstack/react-query";
import { getOrderFetch } from "../api/InfoAPI";

export const useGetOrder = ()=>useQuery({
    queryKey:['Cart/GetCart'],
    queryFn:()=>getOrderFetch()
})