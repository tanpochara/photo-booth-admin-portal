import { useMutation } from "@tanstack/react-query";
import { FramesService, type CreateFrameRequestDto } from "@/api";

export const useCreateFrame = () => {
    return useMutation({
        mutationKey: ['create-frame'],
        mutationFn: async (frame: CreateFrameRequestDto) => {
            return FramesService.framesControllerCreateFrame(frame);
        }
    });
};