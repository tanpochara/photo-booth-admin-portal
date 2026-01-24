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
     * Child frame ID for the photo booth session
     */
    childFrameId: string;
    /**
     * QR code as base64 data URL
     */
    qrCodeDataUrl: string;
    /**
     * Payment amount in THB
     */
    amount: number;
    /**
     * Beam charge ID for payment tracking
     */
    beamChargeId: string;
    /**
     * Expiry time of the QR code
     */
    expiry: string;
};

