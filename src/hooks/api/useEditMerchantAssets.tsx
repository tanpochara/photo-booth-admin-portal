import { OpenAPI } from "@/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useEditMerchantAssets = () => {
  return useMutation({
    mutationKey: ["edit-merchant-assets"],
    mutationFn: async ({ merchantId, formData }: { merchantId: string; formData: FormData }) => {
      const base = OpenAPI.BASE ?? "";
      const url = `${base}/merchants/${encodeURIComponent(merchantId)}/assets`;

      const res = await axios.patch(url, formData, {
        headers: {
          ...(OpenAPI.HEADERS as Record<string, string>),
        },
      });

      return res.data;
    },
  });
};
