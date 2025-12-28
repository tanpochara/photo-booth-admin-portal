/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EditImageCoordinateRequestDto = {
    /**
     * The ID of the image coordinate
     */
    id: string | null;
    /**
     * The x coordinate of the image coordinate
     */
    'x': number;
    /**
     * The y coordinate of the image coordinate
     */
    'y': number;
    /**
     * The width of the image coordinate
     */
    width: number;
    /**
     * The height of the image coordinate
     */
    height: number;
    /**
     * The image index of the image coordinate
     */
    imageIndex: number;
    /**
     * The image coordinate type of the image coordinate
     */
    imageCoordinateType: EditImageCoordinateRequestDto.imageCoordinateType;
};
export namespace EditImageCoordinateRequestDto {
    /**
     * The image coordinate type of the image coordinate
     */
    export enum imageCoordinateType {
        NORMAL = 'NORMAL',
        GIF = 'GIF',
    }
}

