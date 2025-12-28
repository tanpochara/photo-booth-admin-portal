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
    imageCoordinates: Array<ImageCoordinateResponseDto>;
    /**
     * The frame of the frame
     */
    frame: ParentFrameResponseDto;
};

