/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FrameResponseDto } from './FrameResponseDto';
import type { ImageCoordinateResponseDto } from './ImageCoordinateResponseDto';
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
    filterPath: string;
    /**
     * The strip background path of the frame
     */
    stripBackgroundPath: string;
    /**
     * The gif frame path of the frame
     */
    gifFramePath: string;
    /**
     * The sample image url of the frame
     */
    sampleImageUrl: string;
    imageCoordinates: Array<ImageCoordinateResponseDto>;
    /**
     * The frame of the frame
     */
    frame: FrameResponseDto;
};

