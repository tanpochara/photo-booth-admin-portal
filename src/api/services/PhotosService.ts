/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetResultsRequestDto } from '../models/GetResultsRequestDto';
import type { GetResultsResponseDto } from '../models/GetResultsResponseDto';
import type { JobStatusResponseDto } from '../models/JobStatusResponseDto';
import type { ReprocessPhotoRequestDto } from '../models/ReprocessPhotoRequestDto';
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
    /**
     * Get photo processing results
     * Retrieve payment tokens with associated job IDs and metadata. Admin-only endpoint for analytics and reporting. Excludes coupon-based payments.
     * @param xAdminApiKey Admin API key for authentication
     * @param requestBody
     * @returns GetResultsResponseDto Results retrieved successfully
     * @throws ApiError
     */
    public static photosControllerGetPhotoResults(
        xAdminApiKey: string,
        requestBody: GetResultsRequestDto,
    ): CancelablePromise<GetResultsResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/photos/results',
            headers: {
                'x-admin-api-key': xAdminApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid date format or parameters`,
                401: `Unauthorized - invalid or missing admin API key`,
            },
        });
    }
    /**
     * Reprocess a photo job
     * Re-enqueue a previously uploaded photo job for reprocessing with fresh frame configuration. Uses original photos from object storage without re-uploading. Primary lookup via BullMQ job data; falls back to storage listing + DB lookup when the original job has expired from Redis (requires "date" in body). Admin-only endpoint.
     * @param jobId Original job ID to reprocess
     * @param xAdminApiKey Admin API key for authentication
     * @param requestBody Optional parameters for fallback recovery. "date" is required when the BullMQ job has expired. "screenOrientation" overrides the default portrait (1) orientation during fallback.
     * @returns UploadPhotoResponseDto Job successfully re-enqueued for processing
     * @throws ApiError
     */
    public static photosControllerReprocessPhoto(
        jobId: string,
        xAdminApiKey: string,
        requestBody?: ReprocessPhotoRequestDto,
    ): CancelablePromise<UploadPhotoResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/photos/{jobId}/reprocess',
            path: {
                'jobId': jobId,
            },
            headers: {
                'x-admin-api-key': xAdminApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized - invalid or missing admin API key`,
                404: `Original job not found in queue and no date provided, or no photos found in storage, or no payment record linked to this job.`,
            },
        });
    }
}
