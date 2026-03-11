import { MerchantsService } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMerchantsDetailed = () => {
  const apiKey = import.meta.env.VITE_ADMIN_API_KEY;

  return useQuery({
    queryKey: ["merchants-detailed"],
    queryFn: async () => {
      return MerchantsService.merchantsControllerGetDetailedMerchants(apiKey);
    },
  });
};
