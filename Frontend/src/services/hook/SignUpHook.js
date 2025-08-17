import { useQuery,useMutation } from "@tanstack/react-query";
import { SignUpAPI } from "../api/SignUpAPI";


// export const useSignUp = () => {
//     return useMutation(
//         {
//             mutationKey: ['Auth/SignUp'],
//             mutationFn: ({ email, password,username }) => SignUpAPI({ email, password,username }),
            
//         }
//     )
// }

export const useSignUp = () => {
  return useMutation({
    mutationKey: ['Auth/SignUp'],
    mutationFn: ({ email, password, username }) =>
      SignUpAPI({ email, password, username }),
  });
};

