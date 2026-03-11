/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DetailedMerchantChildFrameDto } from './DetailedMerchantChildFrameDto';
import type { MerchantLocationResponseDto } from './MerchantLocationResponseDto';
export type DetailedMerchantResponseDto = {
    id: string;
    name: string;
    slug: string;
    backgroundUrl?: string | null;
    avatarUrl?: string | null;
    allowedRadiusMeter: number;
    location: MerchantLocationResponseDto;
    childFrames: Array<DetailedMerchantChildFrameDto>;
};

