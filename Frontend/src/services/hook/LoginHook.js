import { useQuery,useMutation } from "@tanstack/react-query";
import { LoginAPI } from "../api/LoginAPI";

export const useLogin = () => {
    return useMutation(
        {
            mutationKey: ['Auth/Login'],
            mutationFn: ({ email, password }) => LoginAPI({ email, password }),
            
        }
    )
}