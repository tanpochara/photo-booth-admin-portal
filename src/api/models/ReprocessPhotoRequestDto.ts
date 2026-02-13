/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReprocessPhotoRequestDto = {
    /**
     * Original upload date (ISO 8601). Required only when the BullMQ job has expired and the system must reconstruct the storage path for file recovery.
     */
    date?: string;
    /**
     * Screen orientation override (0 = landscape, 1 = portrait). Used only during the fallback path when original orientation cannot be recovered. Defaults to 1.
     */
    screenOrientation?: number;
};

