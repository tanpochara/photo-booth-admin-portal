import { FramesService } from "@/api";
import { useFrameStore } from "@/lib/store/frameStore";
import { useQuery } from "@tanstack/react-query";

export const useGetFrameDetailed = () => {
    const { setFrames } = useFrameStore();
    const result = useQuery({
        queryKey: ['frame-detailed'],
        queryFn: async () => {
            const response = await FramesService.framesControllerGetDetailedFrames();
            setFrames(response);
            return response;
        }
    });

    return result;
};