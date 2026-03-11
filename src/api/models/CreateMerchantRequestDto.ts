/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateMerchantRequestDto = {
    /**
     * The name of the merchant
     */
    name: string;
    /**
     * URL-friendly slug (must be unique)
     */
    slug: string;
    /**
     * Latitude of the merchant location
     */
    lat: number;
    /**
     * Longitude of the merchant location
     */
    long: number;
    /**
     * Allowed radius in meters for location-based access
     */
    allowedRadiusMeter: number;
    /**
     * Background image URL
     */
    backgroundUrl?: string;
    /**
     * Avatar image URL
     */
    avatarUrl?: string;
};

