import { PaymentService } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGenerateCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return PaymentService.paymentControllerGenerateCoupon();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["active-coupons"] });
        },
    });
};
