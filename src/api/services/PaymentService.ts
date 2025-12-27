/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenerateQrDto } from '../models/GenerateQrDto';
import type { QrResponseDto } from '../models/QrResponseDto';
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
     * Validate payment and generate one-time token
     * Validate a payment by uploading a payment slip. If validation is successful, returns a one-time JWT token for photo upload authorization.
     * @param formData Payment transaction ID and optional payment slip image
     * @returns ValidatePaymentResponseDto Payment validated successfully, token generated
     * @throws ApiError
     */
    public static paymentControllerValidatePayment(
        formData: {
            /**
             * Payment transaction ID from QR generation
             */
            transactionId: string;
            /**
             * Payment slip image (optional)
             */
            paymentSlip?: Blob;
        },
    ): CancelablePromise<ValidatePaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payment/validate',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Payment validation failed`,
                404: `Payment transaction not found`,
            },
        });
    }
}
