/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EditMerchantOverviewRequestDto = {
    /**
     * The name of the merchant
     */
    name?: string;
    /**
     * URL-friendly slug (must be unique)
     */
    slug?: string;
    /**
     * Allowed radius in meters for location-based access
     */
    allowedRadiusMeter?: number;
    /**
     * Latitude of the merchant location
     */
    lat?: number;
    /**
     * Longitude of the merchant location
     */
    long?: number;
};

