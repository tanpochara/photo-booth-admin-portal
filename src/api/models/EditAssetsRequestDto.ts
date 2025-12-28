/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EditAssetsRequestDto = {
    /**
     * The sample image
     */
    sampleImage?: Record<string, any> | null;
    /**
     * The strip background
     */
    stripBackground?: Record<string, any> | null;
    /**
     * The gif frame
     */
    gifFrame?: Record<string, any> | null;
    /**
     * The filter
     */
    filter?: Record<string, any> | null;
    /**
     * The overlay
     */
    overlay?: Record<string, any> | null;
    /**
     * The overlay mode
     */
    overlayMode?: EditAssetsRequestDto.overlayMode | null;
};
export namespace EditAssetsRequestDto {
    /**
     * The overlay mode
     */
    export enum overlayMode {
        SRC_OVER = 'SRC_OVER',
        DEST_OVER = 'DEST_OVER',
        MULTIPLY = 'MULTIPLY',
        ADD = 'ADD',
        SCREEN = 'SCREEN',
        OVERLAY = 'OVERLAY',
        DARKEN = 'DARKEN',
        LIGHTEN = 'LIGHTEN',
        HARD_LIGHT = 'HARD_LIGHT',
        DIFFERENCE = 'DIFFERENCE',
        EXCLUSION = 'EXCLUSION',
    }
}

