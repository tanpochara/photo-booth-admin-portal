import { useMutation } from "@tanstack/react-query";
import { MerchantsService, type LinkMerchantFrameRequestDto } from "@/api";

export const useUnlinkMerchantFrame = () => {
  const apiKey = import.meta.env.VITE_ADMIN_API_KEY;

  return useMutation({
    mutationKey: ["unlink-merchant-frame"],
    mutationFn: async ({ merchantId, body }: { merchantId: string; body: LinkMerchantFrameRequestDto }) => {
      return MerchantsService.merchantsControllerUnlinkFrame(merchantId, apiKey, body);
    },
  });
};
