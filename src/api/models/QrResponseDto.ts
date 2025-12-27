/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QrResponseDto = {
    /**
     * Transaction ID for payment tracking
     */
    transactionId: string;
    /**
     * QR code as base64 data URL
     */
    qrCodeDataUrl: string;
    /**
     * Payment amount in THB
     */
    amount: number;
    /**
     * PromptPay phone number or ID
     */
    promptPayId: string;
};

