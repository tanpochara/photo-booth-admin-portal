import { PaymentService } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkCouponDistributed = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (couponCodes: string[]) => {
            return PaymentService.paymentControllerDistributeCoupon({ couponCodes });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["active-coupons"] });
        },
    });
};