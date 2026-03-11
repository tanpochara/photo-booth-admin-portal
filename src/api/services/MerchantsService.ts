/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMerchantRequestDto } from '../models/CreateMerchantRequestDto';
import type { DetailedMerchantResponseDto } from '../models/DetailedMerchantResponseDto';
import type { EditMerchantAssetsRequestDto } from '../models/EditMerchantAssetsRequestDto';
import type { LinkMerchantFrameRequestDto } from '../models/LinkMerchantFrameRequestDto';
import type { MerchantFrameResponseDto } from '../models/MerchantFrameResponseDto';
import type { MerchantResponseDto } from '../models/MerchantResponseDto';
import type { NearbyMerchantResponseDto } from '../models/NearbyMerchantResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MerchantsService {
    /**
     * Create a new merchant
     * Creates a merchant with location data. Assets can be uploaded separately.
     * @param xAdminApiKey Admin API key for authentication
     * @param requestBody
     * @returns MerchantResponseDto Merchant created successfully
     * @throws ApiError
     */
    public static merchantsControllerCreateMerchant(
        xAdminApiKey: string,
        requestBody: CreateMerchantRequestDto,
    ): CancelablePromise<MerchantResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/merchants',
            headers: {
                'x-admin-api-key': xAdminApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                409: `Merchant with this slug already exists`,
            },
        });
    }
    /**
     * Upload merchant assets
     * Upload background and/or avatar images for a merchant.
     * @param merchantId Merchant ID
     * @param xAdminApiKey Admin API key for authentication
     * @param formData Merchant asset files
     * @returns MerchantResponseDto Assets updated successfully
     * @throws ApiError
     */
    public static merchantsControllerEditAssets(
        merchantId: string,
        xAdminApiKey: string,
        formData: EditMerchantAssetsRequestDto,
    ): CancelablePromise<MerchantResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/merchants/{merchantId}/assets',
            path: {
                'merchantId': merchantId,
            },
            headers: {
                'x-admin-api-key': xAdminApiKey,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Unauthorized`,
                404: `Merchant not found`,
            },
        });
    }
    /**
     * Link a frame to a merchant
     * Links an existing child frame to this merchant and sets its frameType to LOCATION. Throws an error if the frame is already linked to a merchant.
     * @param merchantId Merchant ID
     * @param xAdminApiKey Admin API key for authentication
     * @param requestBody
     * @returns any Frame linked successfully
     * @throws ApiError
     */
    public static merchantsControllerLinkFrame(
        merchantId: string,
        xAdminApiKey: string,
        requestBody: LinkMerchantFrameRequestDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/merchants/{merchantId}/link-frame',
            path: {
                'merchantId': merchantId,
            },
            headers: {
                'x-admin-api-key': xAdminApiKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Merchant or frame not found`,
                409: `Frame is already linked to a merchant`,
            },
        });
    }
    /**
     * Get all merchants with full details
     * Returns all merchants with all fields including linked child frames. For admin portal use.
     * @param xAdminApiKey Admin API key for authentication
     * @returns DetailedMerchantResponseDto Detailed merchants retrieved successfully
     * @throws ApiError
     */
    public static merchantsControllerGetDetailedMerchants(
        xAdminApiKey: string,
    ): CancelablePromise<Array<DetailedMerchantResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/merchants/detailed',
            headers: {
                'x-admin-api-key': xAdminApiKey,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get nearby merchants
     * Returns merchants whose location is within their allowed radius from the user.
     * @param lat User latitude
     * @param long User longitude
     * @returns NearbyMerchantResponseDto Nearby merchants retrieved successfully
     * @throws ApiError
     */
    public static merchantsControllerGetNearbyMerchants(
        lat: number,
        long: number,
    ): CancelablePromise<Array<NearbyMerchantResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/merchants/nearby',
            query: {
                'lat': lat,
                'long': long,
            },
        });
    }
    /**
     * Get merchant by ID
     * Returns merchant details including location.
     * @param merchantId Merchant ID
     * @returns MerchantResponseDto Merchant retrieved successfully
     * @throws ApiError
     */
    public static merchantsControllerGetMerchantById(
        merchantId: string,
    ): CancelablePromise<MerchantResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/merchants/{merchantId}',
            path: {
                'merchantId': merchantId,
            },
            errors: {
                404: `Merchant not found`,
            },
        });
    }
    /**
     * Get frames for a merchant
     * Returns all active frames linked to this merchant, grouped by parent frame.
     * @param merchantId Merchant ID
     * @returns MerchantFrameResponseDto Merchant frames retrieved successfully
     * @throws ApiError
     */
    public static merchantsControllerGetMerchantFrames(
        merchantId: string,
    ): CancelablePromise<Array<MerchantFrameResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/merchants/{merchantId}/frames',
            path: {
                'merchantId': merchantId,
            },
            errors: {
                404: `Merchant not found`,
            },
        });
    }
}
