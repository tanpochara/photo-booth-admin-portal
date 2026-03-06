/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ActiveCouponResponseDto = {
    /**
     * Coupon code
     */
    code: string;
    /**
     * Coupon used at
     */
    usedAt?: string;
    /**
     * Coupon created at
     */
    createdAt: string;
    /**
     * Coupon status
     */
    couponStatus: ActiveCouponResponseDto.couponStatus;
};
export namespace ActiveCouponResponseDto {
    /**
     * Coupon status
     */
    export enum couponStatus {
        ACTIVE = 'ACTIVE',
        DISTRIBUTED = 'DISTRIBUTED',
        USED = 'USED',
    }
}

