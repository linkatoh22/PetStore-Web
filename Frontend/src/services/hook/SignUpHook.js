import { useQuery,useMutation } from "@tanstack/react-query";
import { SignUpAPI } from "../api/SignUpAPI";

// export const useSignUp = ({ username, email, password  }) => {
//     return useQuery({
//         queryKey: ['Auth/SignUp', username, email, password],
//         queryFn: () => SignUpAPI({ username, email, password }),
//         enabled: !!username && !!email && !!password,
//         keepPreviousData: true,
//     });
// }

export const useSignUp = () => {
    return useMutation(
        {
            mutationKey: ['Auth/Log in'],
            mutationFn: ({ email, password }) => SignUpAPI({ email, password }),
            
        }
    )
}


