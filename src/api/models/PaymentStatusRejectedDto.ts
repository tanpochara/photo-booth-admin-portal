/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentStatusRejectedDto = {
    /**
     * Payment status
     */
    status: PaymentStatusRejectedDto.status;
    /**
     * Reason for rejection
     */
    reason: string;
};
export namespace PaymentStatusRejectedDto {
    /**
     * Payment status
     */
    export enum status {
        REJECTED = 'REJECTED',
    }
}

