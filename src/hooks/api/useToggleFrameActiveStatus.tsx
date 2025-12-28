import { FramesService } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useToggleFrameActiveStatus = () => {
    return useMutation({
        mutationKey: ['toggle-frame-active-status'],
        mutationFn: async (frameId: string) => {
            return FramesService.framesControllerToggleActiveStatus(frameId);
        },
    });
};