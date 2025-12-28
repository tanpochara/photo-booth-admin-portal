import { FramesService, type EditOverviewRequestDto } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useEditFrameOverview = () => {
    return useMutation({
        mutationKey: ['edit-frame-overview'],
        mutationFn: async ({ frameId, overview }: { frameId: string, overview: EditOverviewRequestDto }) => {
            return FramesService.framesControllerEditOverview(frameId, overview);
        }
    });
};