/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DetailedFrameResponseDto } from '../models/DetailedFrameResponseDto';
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
}
