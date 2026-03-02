import { FramesService } from "@/api/services/FramesService";
import { useMutation } from "@tanstack/react-query";

export const useRemoveOverlay = () => {
  return useMutation({
    mutationFn: async (frameId: string) => {
      return await FramesService.framesControllerRemoveOverlay(frameId);
    },
  });
};