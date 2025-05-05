import { useQuery } from "@tanstack/react-query";
import { LoginAPI } from "../api/LoginAPI";

export const useLogin = ({ email, password }) => {
    return useQuery({
        queryKey: ['Auth/Login', email, password],
        queryFn: () => LoginAPI({ email, password }),
        enabled: !!email && !!password,
        keepPreviousData: true,
    });
}