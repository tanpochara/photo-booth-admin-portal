/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFrameRequestDto } from '../models/CreateFrameRequestDto';
import type { DetailedFrameResponseDto } from '../models/DetailedFrameResponseDto';
import type { EditAssetsRequestDto } from '../models/EditAssetsRequestDto';
import type { EditImageCoordinatesRequestDto } from '../models/EditImageCoordinatesRequestDto';
import type { EditOverviewRequestDto } from '../models/EditOverviewRequestDto';
import type { FrameResponseDto } from '../models/FrameResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FramesService {
    /**
     * Get all frames
     * Returns all frames
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns FrameResponseDto Frames retrieved successfully
     * @throws ApiError
     */
    public static framesControllerGetFrames(
        xDeviceId?: string,
    ): CancelablePromise<Array<FrameResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/frames',
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
    /**
     * Create a new frame
     * Creates a new frame
     * @param requestBody
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Frame created successfully
     * @throws ApiError
     */
    public static framesControllerCreateFrame(
        requestBody: CreateFrameRequestDto,
        xDeviceId?: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/frames',
            headers: {
                'X-Device-Id': xDeviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all detailed frames
     * Returns all detailed frames
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns DetailedFrameResponseDto Detailed frames retrieved successfully
     * @throws ApiError
     */
    public static framesControllerGetDetailedFrames(
        xDeviceId?: string,
    ): CancelablePromise<Array<DetailedFrameResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/frames/detailed',
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
    /**
     * Get config by child frame id
     * Returns the config for a child frame
     * @param childFrameId The id of the child frame
     * @param isBackgroundReplacementOptOut Whether to opt out of background replacement
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Config retrieved successfully
     * @throws ApiError
     */
    public static framesControllerGetConfigByChildFrameId(
        childFrameId: string,
        isBackgroundReplacementOptOut?: boolean,
        xDeviceId?: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/frames/{childFrameId}/config',
            path: {
                'childFrameId': childFrameId,
            },
            headers: {
                'X-Device-Id': xDeviceId,
            },
            query: {
                'isBackgroundReplacementOptOut': isBackgroundReplacementOptOut,
            },
        });
    }
    /**
     * Edit the overview of a child frame
     * Edits the overview of a child frame
     * @param childFrameId
     * @param requestBody
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Overview edited successfully
     * @throws ApiError
     */
    public static framesControllerEditOverview(
        childFrameId: string,
        requestBody: EditOverviewRequestDto,
        xDeviceId?: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/overview',
            path: {
                'childFrameId': childFrameId,
            },
            headers: {
                'X-Device-Id': xDeviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Edit the assets of a child frame
     * Edits the assets of a child frame
     * @param childFrameId
     * @param formData Assets
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Assets edited successfully
     * @throws ApiError
     */
    public static framesControllerEditAssets(
        childFrameId: string,
        formData: EditAssetsRequestDto,
        xDeviceId?: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/assets',
            path: {
                'childFrameId': childFrameId,
            },
            headers: {
                'X-Device-Id': xDeviceId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Edit the image coordinates of a child frame
     * Edits the image coordinates of a child frame
     * @param childFrameId
     * @param requestBody
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Image coordinates edited successfully
     * @throws ApiError
     */
    public static framesControllerEditImageCoordinates(
        childFrameId: string,
        requestBody: EditImageCoordinatesRequestDto,
        xDeviceId?: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/image-coordinates',
            path: {
                'childFrameId': childFrameId,
            },
            headers: {
                'X-Device-Id': xDeviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Toggle the active status of a child frame
     * Deprecates a child frame
     * @param childFrameId
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Child frame active status toggled successfully
     * @throws ApiError
     */
    public static framesControllerToggleActiveStatus(
        childFrameId: string,
        xDeviceId?: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/toggle-active-status',
            path: {
                'childFrameId': childFrameId,
            },
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
    /**
     * Remove the overlay of a child frame
     * Removes the overlay of a child frame
     * @param childFrameId
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Overlay removed successfully
     * @throws ApiError
     */
    public static framesControllerRemoveOverlay(
        childFrameId: string,
        xDeviceId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/remove-overlay',
            path: {
                'childFrameId': childFrameId,
            },
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
}
