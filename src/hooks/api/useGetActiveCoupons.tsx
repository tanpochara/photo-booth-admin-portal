import { PaymentService } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveCoupons = () => {
    const result = useQuery({
        queryKey: ['active-coupons'],
        queryFn: async () => {
            const response = await PaymentService.paymentControllerGetActiveCoupons();
            return response;
        }
    });

    return result;
};
