import { useMutation } from "@tanstack/react-query";
import {
  PhotosService,
  type GetResultsRequestDto,
  type GetResultsResponseDto,
} from "@/api";

export const useGetPhotoResults = () => {
  return useMutation<GetResultsResponseDto, Error, GetResultsRequestDto>({
    mutationKey: ["get-photo-results"],
    mutationFn: async (request: GetResultsRequestDto) => {
      const apiKey = import.meta.env.VITE_ADMIN_API_KEY;
      return PhotosService.photosControllerGetPhotoResults(apiKey, request);
    },
  });
};
