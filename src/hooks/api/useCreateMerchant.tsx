import { useMutation } from "@tanstack/react-query";
import { MerchantsService, type CreateMerchantRequestDto } from "@/api";

export const useCreateMerchant = () => {
  const apiKey = import.meta.env.VITE_ADMIN_API_KEY;

  return useMutation({
    mutationKey: ["create-merchant"],
    mutationFn: async (merchant: CreateMerchantRequestDto) => {
      return MerchantsService.merchantsControllerCreateMerchant(apiKey, merchant);
    },
  });
};
