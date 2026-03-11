/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DetailedMerchantChildFrameDto = {
    id: string;
    name: string;
    description?: string | null;
    sampleImageUrl?: string | null;
    frameDetailSampleImageUrl?: string | null;
    filterPath?: string | null;
    stripBackgroundPath?: string | null;
    gifFramePath?: string | null;
    price: number;
    aspectRatio: DetailedMerchantChildFrameDto.aspectRatio;
    frameType: DetailedMerchantChildFrameDto.frameType;
    sortOrder: number;
};
export namespace DetailedMerchantChildFrameDto {
    export enum aspectRatio {
        ONE_TO_ONE = 'ONE_TO_ONE',
        FOUR_TO_THREE = 'FOUR_TO_THREE',
        THREE_TO_FOUR = 'THREE_TO_FOUR',
        FOUR_TO_FIVE = 'FOUR_TO_FIVE',
        FIVE_TO_FOUR = 'FIVE_TO_FOUR',
    }
    export enum frameType {
        MONTHLY = 'MONTHLY',
        LOCATION = 'LOCATION',
    }
}

