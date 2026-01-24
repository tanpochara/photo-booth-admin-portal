/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GetResultsRequestDto = {
    /**
     * Retrieve payment tokens created on or after this date (ISO 8601 format)
     */
    createdAfter: string;
    /**
     * Optional filter by child frame ID
     */
    childFrameId?: string;
};

