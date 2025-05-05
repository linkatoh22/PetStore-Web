import { useQuery } from "@tanstack/react-query";
import { SignUpAPI } from "../api/SignUpAPI";

export const useSignUp = ({ username, email, password  }) => {
    return useQuery({
        queryKey: ['Auth/SignUp', username, email, password],
        queryFn: () => SignUpAPI({ username, email, password }),
        enabled: !!username && !!email && !!password,
        keepPreviousData: true,
    });
}