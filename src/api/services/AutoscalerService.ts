/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AutoscalerService {
    /**
     * Get autoscaler status
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Returns current autoscaler status including queue depth and worker counts
     * @throws ApiError
     */
    public static autoscalerControllerGetStatus(
        xDeviceId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/autoscaler/status',
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
}
