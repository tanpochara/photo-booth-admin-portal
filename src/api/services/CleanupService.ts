/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CleanupService {
    /**
     * Get cleanup job status
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Returns cleanup configuration and current run state
     * @throws ApiError
     */
    public static cleanupControllerGetStatus(
        xDeviceId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cleanup/status',
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
    /**
     * Manually trigger photo cleanup
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Returns cleanup results with file counts and duration
     * @throws ApiError
     */
    public static cleanupControllerTriggerCleanup(
        xDeviceId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cleanup/run',
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
}
