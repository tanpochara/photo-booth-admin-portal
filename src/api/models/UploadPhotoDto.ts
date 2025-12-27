/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UploadPhotoDto = {
    /**
     * Photos to upload (max 10 files)
     */
    photos: Array<Blob>;
    /**
     * Child frame ID to apply to the photos
     */
    childFrameId: string;
    /**
     * Child ID to apply to the photos
     */
    isBackgroundReplacementOptOut?: boolean;
    /**
     * Screen orientation (0 = landscape, 1 = portrait)
     */
    screenOrientation?: string;
};

