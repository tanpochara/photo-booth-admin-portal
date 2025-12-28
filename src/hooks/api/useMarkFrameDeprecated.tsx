import { FramesService } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useMarkFrameDeprecated = () => {
    return useMutation({
        mutationKey: ['mark-frame-deprecated'],
        mutationFn: async (frameId: string) => {
            return FramesService.framesControllerDeprecateChildFrame(frameId);
        },
    });
};