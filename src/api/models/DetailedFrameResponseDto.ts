/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageCoordinateResponseDto } from './ImageCoordinateResponseDto';
import type { ParentFrameResponseDto } from './ParentFrameResponseDto';
export type DetailedFrameResponseDto = {
    /**
     * The ID of the frame
     */
    id: string;
    /**
     * The name of the frame
     */
    name: string;
    /**
     * The filter path of the frame
     */
    filterPath?: string | null;
    /**
     * The strip background path of the frame
     */
    stripBackgroundPath?: string | null;
    /**
     * The gif frame path of the frame
     */
    gifFramePath?: string | null;
    /**
     * The sample image url of the frame
     */
    sampleImageUrl: string;
    /**
     * The frame detail sample image url of the frame
     */
    frameDetailSampleImageUrl: string;
    imageCoordinates: Array<ImageCoordinateResponseDto>;
    /**
     * The frame of the frame
     */
    frame: ParentFrameResponseDto;
    /**
     * The price of the child frame in 100th of baht
     */
    price: number;
    /**
     * The aspect ratio of the child frame
     */
    aspectRatio: DetailedFrameResponseDto.aspectRatio;
    /**
     * The frame type of the child frame
     */
    frameType: DetailedFrameResponseDto.frameType;
    /**
     * The is active of the frame
     */
    isActive: boolean;
};
export namespace DetailedFrameResponseDto {
    /**
     * The aspect ratio of the child frame
     */
    export enum aspectRatio {
        ONE_TO_ONE = 'ONE_TO_ONE',
        FOUR_TO_THREE = 'FOUR_TO_THREE',
    }
    /**
     * The frame type of the child frame
     */
    export enum frameType {
        MONTHLY = 'MONTHLY',
        LOCATION = 'LOCATION',
    }
}

