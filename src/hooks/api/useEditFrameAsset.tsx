import { FramesService, type EditAssetsRequestDto } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useEditFrameAsset = () => {
    return useMutation({
        mutationKey: ['edit-frame-asset'],
        mutationFn: async ({ frameId, asset }: { frameId: string, asset: EditAssetsRequestDto }) => {
            return FramesService.framesControllerEditAssets(frameId, asset);
        }
    });
};