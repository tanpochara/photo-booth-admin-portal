/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
     * @returns FrameResponseDto Frames retrieved successfully
     * @throws ApiError
     */
    public static framesControllerGetFrames(): CancelablePromise<Array<FrameResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/frames',
        });
    }
    /**
     * Get all detailed frames
     * Returns all detailed frames
     * @returns DetailedFrameResponseDto Detailed frames retrieved successfully
     * @throws ApiError
     */
    public static framesControllerGetDetailedFrames(): CancelablePromise<Array<DetailedFrameResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/frames/detailed',
        });
    }
    /**
     * Get config by child frame id
     * Returns the config for a child frame
     * @param childFrameId The id of the child frame
     * @param isBackgroundReplacementOptOut Whether to opt out of background replacement
     * @returns any Config retrieved successfully
     * @throws ApiError
     */
    public static framesControllerGetConfigByChildFrameId(
        childFrameId: string,
        isBackgroundReplacementOptOut?: boolean,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/frames/{childFrameId}/config',
            path: {
                'childFrameId': childFrameId,
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
     * @returns any Overview edited successfully
     * @throws ApiError
     */
    public static framesControllerEditOverview(
        childFrameId: string,
        requestBody: EditOverviewRequestDto,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/overview',
            path: {
                'childFrameId': childFrameId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Edit the assets of a child frame
     * Edits the assets of a child frame
     * @param childFrameId
     * @param requestBody
     * @returns any Assets edited successfully
     * @throws ApiError
     */
    public static framesControllerEditAssets(
        childFrameId: string,
        requestBody: EditAssetsRequestDto,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/assets',
            path: {
                'childFrameId': childFrameId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Edit the image coordinates of a child frame
     * Edits the image coordinates of a child frame
     * @param childFrameId
     * @param requestBody
     * @returns any Image coordinates edited successfully
     * @throws ApiError
     */
    public static framesControllerEditImageCoordinates(
        childFrameId: string,
        requestBody: EditImageCoordinatesRequestDto,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/image-coordinates',
            path: {
                'childFrameId': childFrameId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Toggle the active status of a child frame
     * Deprecates a child frame
     * @param childFrameId
     * @returns any Child frame active status toggled successfully
     * @throws ApiError
     */
    public static framesControllerToggleActiveStatus(
        childFrameId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/frames/{childFrameId}/toggle-active-status',
            path: {
                'childFrameId': childFrameId,
            },
        });
    }
}
