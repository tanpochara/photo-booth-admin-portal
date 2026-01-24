/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenerateQrDto } from '../models/GenerateQrDto';
import type { PaymentStatusPendingDto } from '../models/PaymentStatusPendingDto';
import type { PaymentStatusRejectedDto } from '../models/PaymentStatusRejectedDto';
import type { PaymentStatusValidatedDto } from '../models/PaymentStatusValidatedDto';
import type { QrResponseDto } from '../models/QrResponseDto';
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
     * @returns QrResponseDto QR code generated successfully
     * @throws ApiError
     */
    public static paymentControllerGenerateQr(
        requestBody: GenerateQrDto,
    ): CancelablePromise<QrResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/qr',
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
     * @returns any Payment status retrieved successfully
     * @throws ApiError
     */
    public static paymentControllerGetPaymentStatus(
        transactionId: string,
    ): CancelablePromise<(PaymentStatusPendingDto | PaymentStatusValidatedDto | PaymentStatusRejectedDto)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/payment/status/{transactionId}',
            path: {
                'transactionId': transactionId,
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
     * @returns ValidatePaymentResponseDto Payment validated successfully, token generated
     * @throws ApiError
     */
    public static paymentControllerValidatePayment(
        requestBody: ValidatePaymentDto,
    ): CancelablePromise<ValidatePaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/validate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Payment validation failed or not yet completed`,
                404: `Payment transaction not found`,
            },
        });
    }
    /**
     * Validate coupon and generate one-time token
     * Validate a coupon by providing a coupon code. If validation is successful, returns a one-time JWT token for photo upload authorization.
     * @param requestBody
     * @returns ValidatePaymentResponseDto Coupon validated successfully, token generated
     * @throws ApiError
     */
    public static paymentControllerValidateCoupon(
        requestBody: ValidateCouponRequestDto,
    ): CancelablePromise<ValidatePaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/validate-coupon',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
