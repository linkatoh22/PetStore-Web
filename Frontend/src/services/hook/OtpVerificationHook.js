import { useQuery,useMutation } from "@tanstack/react-query";
import { VerifyOtp,ResendOtp } from "../api/OtpVerificationAPI";


export const useVerifyOtp = () => {
    return useMutation
    (
        {
            mutationKey: ['Auth/VerifyOtp'],
            mutationFn: ({userId, otp}) => VerifyOtp({userId, otp})
        }
    );
}

export const useResendOtp = () => {
    return useMutation(
        {
            mutationKey: ['Auth/ResendOtp'],
            mutationFn: ({userId}) => ResendOtp({userId}),
        }
);
}