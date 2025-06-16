import { useQuery,useMutation } from "@tanstack/react-query";
import { getTinhThanh,getPhuongXa,getQuanHuyen,CheckOut } from "../api/CheckoutAPI";


export const useGetTinhThanh = ()=>useQuery({
    queryKey:['Checkout/TinhThanh'],
    queryFn:()=>getTinhThanh()
})

export const useGetQuanHuyen = ()=>{
    return useMutation({
    mutationKey:['Checkout/QuanHuyen'],
    mutationFn:({TinhThanhId})=>getQuanHuyen({TinhThanhId})
})}

export const useGetPhuongXa = ()=>{
    return useMutation({
    mutationKey:['Checkout/PhuongXa'],
    mutationFn:({QuanHuyenId})=>getPhuongXa({QuanHuyenId})
})}

export const useCheckOut = ()=>{
    return useMutation({
    mutationKey:['Checkout/CreateOrder'],
    mutationFn:({items,shippingInfo})=>CheckOut({items,shippingInfo})
})}