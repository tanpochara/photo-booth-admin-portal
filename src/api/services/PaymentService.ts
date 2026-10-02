/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActiveCouponResponseDto } from '../models/ActiveCouponResponseDto';
import type { DistributeCouponRequestDto } from '../models/DistributeCouponRequestDto';
import type { GenerateQrDto } from '../models/GenerateQrDto';
import type { PaymentStatusPendingDto } from '../models/PaymentStatusPendingDto';
import type { PaymentStatusRejectedDto } from '../models/PaymentStatusRejectedDto';
import type { PaymentStatusValidatedDto } from '../models/PaymentStatusValidatedDto';
import type { QrResponseDto } from '../models/QrResponseDto';
import type { RecoverPaymentFoundNoPhotosResponseDto } from '../models/RecoverPaymentFoundNoPhotosResponseDto';
import type { RecoverPhotoFoundResponseDto } from '../models/RecoverPhotoFoundResponseDto';
import type { RecoverRequestDto } from '../models/RecoverRequestDto';
import type { ValidateCouponRequestDto } from '../models/ValidateCouponRequestDto';
import type { ValidatePaymentDto } from '../models/ValidatePaymentDto';
import type { ValidatePaymentResponseDto } from '../models/ValidatePaymentResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentService {
    /**
     * Generate PromptPay QR code for payment
     * Generate a PromptPay QR code for a photo booth session. Returns the QR code as a base64 data URL and a transaction ID for tracking.
     * @param requestBody
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns QrResponseDto QR code generated successfully
     * @throws ApiError
     */
    public static paymentControllerGenerateQr(
        requestBody: GenerateQrDto,
        xDeviceId?: string,
    ): CancelablePromise<QrResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/qr',
            headers: {
                'X-Device-Id': xDeviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Child frame not found`,
            },
        });
    }
    /**
     * Get payment status
     * Get the status of a payment transaction.
     * @param transactionId The ID of the payment transaction
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Payment status retrieved successfully
     * @throws ApiError
     */
    public static paymentControllerGetPaymentStatus(
        transactionId: string,
        xDeviceId?: string,
    ): CancelablePromise<(PaymentStatusPendingDto | PaymentStatusValidatedDto | PaymentStatusRejectedDto)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/payment/status/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            headers: {
                'X-Device-Id': xDeviceId,
            },
            errors: {
                404: `Payment transaction not found`,
            },
        });
    }
    /**
     * Validate payment and generate one-time token
     * Validates a payment by checking its status with Beam payment gateway. If the payment has been completed (via webhook or polling), returns a one-time JWT token for photo upload authorization.
     * @param requestBody
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns ValidatePaymentResponseDto Payment validated successfully, token generated
     * @throws ApiError
     */
    public static paymentControllerValidatePayment(
        requestBody: ValidatePaymentDto,
        xDeviceId?: string,
    ): CancelablePromise<ValidatePaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/validate',
            headers: {
                'X-Device-Id': xDeviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Payment validation failed or not yet completed`,
                404: `Payment transaction not found`,
            },
        });
    }
    /**
     * Recover a photo session from a payment slip
     * Upload a PromptPay slip image. If the slip matches a paid transaction that already produced photos, returns the job ID. If it matches a payment with no photos yet, returns a one-time upload token.
     * @param formData
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any Slip matched a payment
     * @throws ApiError
     */
    public static paymentControllerRecover(
        formData: RecoverRequestDto,
        xDeviceId?: string,
    ): CancelablePromise<(RecoverPhotoFoundResponseDto | RecoverPaymentFoundNoPhotosResponseDto)> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/recover',
            headers: {
                'X-Device-Id': xDeviceId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Validate coupon and generate one-time token
     * Validate a coupon by providing a coupon code. If validation is successful, returns a one-time JWT token for photo upload authorization.
     * @param requestBody
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns ValidatePaymentResponseDto Coupon validated successfully, token generated
     * @throws ApiError
     */
    public static paymentControllerValidateCoupon(
        requestBody: ValidateCouponRequestDto,
        xDeviceId?: string,
    ): CancelablePromise<ValidatePaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/validate-coupon',
            headers: {
                'X-Device-Id': xDeviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get active coupons
     * Get all active coupons.
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns ActiveCouponResponseDto Active coupons retrieved successfully
     * @throws ApiError
     */
    public static paymentControllerGetActiveCoupons(
        xDeviceId?: string,
    ): CancelablePromise<Array<ActiveCouponResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/payment/active-coupons',
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
    /**
     * Mark coupon as distributed
     * Mark a coupon as distributed.
     * @param requestBody
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerDistributeCoupon(
        requestBody: DistributeCouponRequestDto,
        xDeviceId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/distribute-coupon',
            headers: {
                'X-Device-Id': xDeviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param xDeviceId Stable device identifier for debugging/analytics (observability only).
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerGenerateCoupon(
        xDeviceId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/generate-coupon',
            headers: {
                'X-Device-Id': xDeviceId,
            },
        });
    }
}
