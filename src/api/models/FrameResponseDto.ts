/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChildFrameResponseDto } from './ChildFrameResponseDto';
export type FrameResponseDto = {
    /**
     * The ID of the frame
     */
    id: string;
    /**
     * The name of the frame
     */
    name: string;
    /**
     * The description of the frame
     */
    description: string;
    /**
     * The sample image URL of the frame
     */
    sampleImageUrl: string;
    /**
     * numbe of images required for this frame
     */
    imagesCount: number;
    /**
     * The layout of the frame
     */
    layout: string;
    /**
     * The child frames of the frame
     */
    childFrames: Array<ChildFrameResponseDto>;
};

