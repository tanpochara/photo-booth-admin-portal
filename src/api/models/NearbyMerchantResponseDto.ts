/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MerchantLocationResponseDto } from './MerchantLocationResponseDto';
export type NearbyMerchantResponseDto = {
    /**
     * Merchant ID
     */
    id: string;
    /**
     * Merchant name
     */
    name: string;
    /**
     * URL-friendly slug
     */
    slug: string;
    /**
     * Background image URL
     */
    backgroundUrl?: string;
    /**
     * Avatar image URL
     */
    avatarUrl?: string;
    /**
     * Allowed radius in meters
     */
    allowedRadiusMeter: number;
    /**
     * Merchant location
     */
    location: MerchantLocationResponseDto;
    /**
     * Distance from user in meters
     */
    distanceMeters: number;
};

