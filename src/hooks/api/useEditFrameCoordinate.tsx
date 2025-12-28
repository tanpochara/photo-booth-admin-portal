import { FramesService, type EditImageCoordinatesRequestDto } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useEditFrameCoordinate = () => {
    return useMutation({
        mutationKey: ['edit-frame-coordinate'],
        mutationFn: async ({ frameId, coordinate }: { frameId: string, coordinate: EditImageCoordinatesRequestDto }) => {
            return FramesService.framesControllerEditImageCoordinates(frameId, coordinate);
        }
    });
};