/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RecoverPhotoFoundResponseDto = {
    outcome: RecoverPhotoFoundResponseDto.outcome;
    /**
     * Photo job ID for the recovered session
     */
    jobId: string;
};
export namespace RecoverPhotoFoundResponseDto {
    export enum outcome {
        PHOTO_FOUND = 'PHOTO_FOUND',
    }
}

