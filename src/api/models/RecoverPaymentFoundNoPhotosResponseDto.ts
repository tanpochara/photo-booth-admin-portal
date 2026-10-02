/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RecoverPaymentFoundNoPhotosResponseDto = {
    outcome: RecoverPaymentFoundNoPhotosResponseDto.outcome;
    /**
     * One-time payment token for photo upload
     */
    token: string;
    /**
     * Payment transaction ID
     */
    transactionId: string;
    /**
     * Child frame ID for the photo booth session
     */
    childFrameId: string;
};
export namespace RecoverPaymentFoundNoPhotosResponseDto {
    export enum outcome {
        PAYMENT_FOUND_NO_PHOTOS = 'PAYMENT_FOUND_NO_PHOTOS',
    }
}

