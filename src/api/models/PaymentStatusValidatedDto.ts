/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentStatusValidatedDto = {
    /**
     * Payment status
     */
    status: PaymentStatusValidatedDto.status;
    /**
     * One-time payment token for photo upload
     */
    token: string;
    /**
     * Child frame ID for the photo booth session
     */
    childFrameId: string;
};
export namespace PaymentStatusValidatedDto {
    /**
     * Payment status
     */
    export enum status {
        VALIDATED = 'VALIDATED',
    }
}

