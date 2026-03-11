import { MerchantsService, type EditMerchantOverviewRequestDto } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useEditMerchantOverview = () => {
  const apiKey = import.meta.env.VITE_ADMIN_API_KEY;

  return useMutation({
    mutationKey: ["edit-merchant-overview"],
    mutationFn: async ({ merchantId, overview }: { merchantId: string; overview: EditMerchantOverviewRequestDto }) => {
      return MerchantsService.merchantsControllerEditOverview(merchantId, apiKey, overview);
    },
  });
};
