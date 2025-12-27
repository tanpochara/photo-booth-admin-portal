/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobStatusResponseDto } from '../models/JobStatusResponseDto';
import type { UploadPhotoDto } from '../models/UploadPhotoDto';
import type { UploadPhotoResponseDto } from '../models/UploadPhotoResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PhotosService {
    /**
     * Upload photos for processing
     * Upload up to 10 photos to be processed with filters and effects. Requires a valid payment token in the Authorization header. Returns a job ID for tracking the processing status.
     * @param formData Photos and processing options
     * @returns UploadPhotoResponseDto Photos successfully uploaded and queued for processing
     * @throws ApiError
     */
    public static photosControllerUploadPhoto(
        formData: UploadPhotoDto,
    ): CancelablePromise<UploadPhotoResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/photos',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad request - invalid input or file count`,
                401: `Unauthorized - invalid or missing payment token`,
            },
        });
    }
    /**
     * Get job processing status
     * Check the status of a photo processing job using the job ID returned from the upload endpoint.
     * @param jobId Unique job identifier
     * @returns JobStatusResponseDto Job status retrieved successfully
     * @throws ApiError
     */
    public static photosControllerGetJobStatus(
        jobId: string,
    ): CancelablePromise<JobStatusResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/photos/{jobId}',
            path: {
                'jobId': jobId,
            },
            errors: {
                404: `Job not found`,
            },
        });
    }
    /**
     * Download processed photo
     * Download the processed photo file once the job status is "done". Returns the image file directly.
     * @param jobId Unique job identifier
     * @returns binary Processed photo file
     * @throws ApiError
     */
    public static photosControllerDownloadPhoto(
        jobId: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/photos/{jobId}/download',
            path: {
                'jobId': jobId,
            },
            errors: {
                404: `Processed photo not found or not ready yet`,
            },
        });
    }
    /**
     * Download processed GIF
     * Download the processed GIF file once the job status is "done". Returns the GIF file directly.
     * @param jobId Unique job identifier
     * @returns binary Processed GIF file
     * @throws ApiError
     */
    public static photosControllerDownloadGif(
        jobId: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/photos/{jobId}/download-gif',
            path: {
                'jobId': jobId,
            },
            errors: {
                404: `Processed GIF not found or not ready yet`,
            },
        });
    }
}
