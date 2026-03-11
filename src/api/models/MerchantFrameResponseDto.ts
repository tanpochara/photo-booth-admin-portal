/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MerchantChildFrameResponseDto } from './MerchantChildFrameResponseDto';
export type MerchantFrameResponseDto = {
    /**
     * Parent frame ID
     */
    id: string;
    /**
     * Frame name
     */
    name: string;
    /**
     * Frame description
     */
    description?: string;
    /**
     * Sample image URL
     */
    sampleImageUrl?: string;
    /**
     * Number of images required
     */
    imagesCount: number;
    /**
     * Layout string
     */
    layout?: string;
    /**
     * Child frames linked to this merchant
     */
    childFrames: Array<MerchantChildFrameResponseDto>;
};

