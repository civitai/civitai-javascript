/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageTransformer } from './ImageTransformer';
export type ImageJobControlNet = {
    preprocessor?: ImageTransformer;
    weight?: number;
    startStep?: number;
    endStep?: number;
    blobKey?: string | null;
    imageUrl?: string | null;
};

