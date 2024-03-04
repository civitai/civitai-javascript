/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageTransformer } from './ImageTransformer';
import type { JobRequest } from './JobRequest';
export type ImageTransformJobRequest = (JobRequest & {
    /**
     * The url of the image to transform
     */
    imageUrl?: string | null;
    /**
     * The key of the blob to transform
     */
    blobKey?: string | null;
    /**
     * Get or set if existing blobs should be replaced. Otherwise the existing blob will be returned
     */
    replace?: boolean;
    transformer?: ImageTransformer;
    /**
     * Get or set the URL where the transformed image will be uploaded to
     */
    destinationUrl?: string | null;
    /**
     * A untyped set of parameters that are associated with this job
     */
    params?: Record<string, any> | null;
});

