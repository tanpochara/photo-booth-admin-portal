/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type JobStatusResponseDto = {
    /**
     * Current status of the job
     */
    status: JobStatusResponseDto.status;
    /**
     * URL to the processed image (available when status is "done")
     */
    outputPath?: string;
    /**
     * URL to the processed GIF (available when status is "done")
     */
    gifPath?: string;
    /**
     * URL to the processed MP4 video (available when status is "done")
     */
    videoPath?: string;
    /**
     * Error message (available when status is "failed")
     */
    error?: string;
};
export namespace JobStatusResponseDto {
    /**
     * Current status of the job
     */
    export enum status {
        WAITING = 'waiting',
        ACTIVE = 'active',
        COMPLETED = 'completed',
        FAILED = 'failed',
        DELAYED = 'delayed',
        DONE = 'done',
    }
}

