/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MerchantChildFrameResponseDto = {
    /**
     * Child frame ID
     */
    id: string;
    /**
     * Child frame name
     */
    name: string;
    /**
     * Description of the child frame
     */
    description?: string;
    /**
     * Sample image URL
     */
    sampleImageUrl?: string;
    /**
     * Frame detail sample image URL
     */
    frameDetailSampleImageUrl?: string;
    /**
     * Price in smallest currency unit
     */
    price: number;
    /**
     * Aspect ratio
     */
    aspectRatio: MerchantChildFrameResponseDto.aspectRatio;
};
export namespace MerchantChildFrameResponseDto {
    /**
     * Aspect ratio
     */
    export enum aspectRatio {
        ONE_TO_ONE = 'ONE_TO_ONE',
        FOUR_TO_THREE = 'FOUR_TO_THREE',
        THREE_TO_FOUR = 'THREE_TO_FOUR',
        FOUR_TO_FIVE = 'FOUR_TO_FIVE',
        FIVE_TO_FOUR = 'FIVE_TO_FOUR',
    }
}

