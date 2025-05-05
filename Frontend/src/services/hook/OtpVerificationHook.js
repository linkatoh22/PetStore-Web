import { useQuery } from "@tanstack/react-query";
import { VerifyOtp,ResendOtp } from "../api/OtpVerificationAPI";

export const useVerifyOtp = (userId, otp) => {
    return useQuery({
        queryKey: ['Auth/VerifyOtp', userId, otp],
        queryFn: () => VerifyOtp(userId, otp),
        enabled: !!userId && !!otp,
    });
}

export const useResendOtp = (email) => {
    return useQuery({
        queryKey: ['Auth/ResendOtp', email],
        queryFn: () => ResendOtp(email),
        enabled: !!email,
    });
}