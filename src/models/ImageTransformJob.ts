/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageTransformer } from './ImageTransformer';
import type { Job } from './Job';
export type ImageTransformJob = (Job & {
    /**
     * The url of the image to transform
     */
    imageUrl?: string | null;
    transformer?: ImageTransformer;
    /**
     * Get the key of the destination blob to upload the result to
     */
    destinationBlobKey?: string | null;
    /**
     * A untyped set of parameters that are associated with this job
     */
    params?: Record<string, any> | null;
    /**
     * Get or set the URL where the transformed image will be uploaded to
     */
    destinationUrl?: string | null;
    /**
     * Get cost associated with this job
     */
    readonly cost?: number;
    readonly type?: string | null;
});

