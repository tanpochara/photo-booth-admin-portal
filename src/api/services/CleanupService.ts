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
     * @returns any Returns cleanup configuration and current run state
     * @throws ApiError
     */
    public static cleanupControllerGetStatus(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cleanup/status',
        });
    }
    /**
     * Manually trigger photo cleanup
     * @returns any Returns cleanup results with file counts and duration
     * @throws ApiError
     */
    public static cleanupControllerTriggerCleanup(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cleanup/run',
        });
    }
}
