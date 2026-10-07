import { FramesService } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteFrame = () => {
  return useMutation({
    mutationKey: ["delete-frame"],
    mutationFn: async (frameId: string) => {
      return FramesService.framesControllerDeleteFrame(frameId);
    },
  });
};
