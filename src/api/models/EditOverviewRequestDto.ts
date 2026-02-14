/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EditOverviewRequestDto = {
    /**
     * The name of the frame
     */
    name?: string | null;
    /**
     * The description of the frame
     */
    description?: string | null;
    /**
     * The layout of the frame
     */
    layout?: string | null;
    /**
     * The number of images required for this frame
     */
    imagesCount?: number | null;
    /**
     * The replace background prompt of the frame
     */
    replaceBackgroundPrompt?: string | null;
    /**
     * The price of the child frame
     */
    price?: number | null;
    /**
     * The frame type of the child frame
     */
    frameType?: EditOverviewRequestDto.frameType | null;
    /**
     * The aspect ratio of the child frame
     */
    aspectRatio?: EditOverviewRequestDto.aspectRatio | null;
};
export namespace EditOverviewRequestDto {
    /**
     * The frame type of the child frame
     */
    export enum frameType {
        MONTHLY = 'MONTHLY',
        LOCATION = 'LOCATION',
    }
    /**
     * The aspect ratio of the child frame
     */
    export enum aspectRatio {
        ONE_TO_ONE = 'ONE_TO_ONE',
        FOUR_TO_THREE = 'FOUR_TO_THREE',
    }
}

