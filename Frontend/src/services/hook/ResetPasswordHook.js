import { useQuery,useMutation } from "@tanstack/react-query";
import { ResetPassword,SendLinkToEmail } from "../api/ResetPasswordAPI";

export const useSendLinkToEmail =()=>{
    return useMutation(
        {
            mutationKey:['ForgotPassword/SendLinkToEmail'],
            mutationFn:({email})=>SendLinkToEmail({email})
        }
    )

}

export const useResetPassword =()=>{
    return useMutation(
        {
            mutationKey:['ForgotPassword/ResetPassword'],
            mutationFn:({token,password})=>ResetPassword({token,password})
        }
    )

}