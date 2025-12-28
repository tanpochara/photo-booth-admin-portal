import { OpenAPI } from "@/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useEditFrameAsset = () => {
  return useMutation({
    mutationKey: ["edit-frame-asset"],
    mutationFn: async ({ frameId, formData }: { frameId: string; formData: FormData }) => {
      const base = OpenAPI.BASE ?? "";
      const url = `${base}/frames/${encodeURIComponent(frameId)}/assets`;

      // IMPORTANT:
      // - Do NOT set Content-Type manually; axios will set the multipart boundary.
      // - Keep your admin api key header.
      const res = await axios.patch(url, formData, {
        headers: {
          ...(OpenAPI.HEADERS as Record<string, string>),
        },
      });

      return res.data;
    },
  });
};