import { useQuery } from "@tanstack/react-query";
import { GetDetailPet } from "../api/DetailAPI";

export const useGetDetailPet = (id)=>useQuery({
    queryKey:['Detail/Pet',id],
    queryFn:()=>GetDetailPet(id),
    keepPreviousData:true
})