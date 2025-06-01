import { useQuery,useMutation } from "@tanstack/react-query";
import { LogoutAPI } from "../api/LogoutAPI";

export const useLogOut = ()=>{
    return useMutation({
        mutationKey:['Auth/Logout'],
        mutationFn: ()=>LogoutAPI()
    })
}