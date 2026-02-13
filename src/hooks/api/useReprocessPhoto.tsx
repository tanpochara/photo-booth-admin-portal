import { useMutation } from "@tanstack/react-query";
import {
  PhotosService,
  type ReprocessPhotoRequestDto,
  type UploadPhotoResponseDto,
} from "@/api";

interface ReprocessPhotoParams {
  jobId: string;
  date: string;
}

export const useReprocessPhoto = () => {
  return useMutation<UploadPhotoResponseDto, Error, ReprocessPhotoParams>({
    mutationKey: ["reprocess-photo"],
    mutationFn: async ({ jobId, date }: ReprocessPhotoParams) => {
      const apiKey = import.meta.env.VITE_ADMIN_API_KEY;
      const requestBody: ReprocessPhotoRequestDto = {
        date,
      };
      return PhotosService.photosControllerReprocessPhoto(
        jobId,
        apiKey,
        requestBody
      );
    },
  });
};
