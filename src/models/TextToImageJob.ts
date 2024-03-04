/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseModel } from './BaseModel';
import type { ImageJobControlNet } from './ImageJobControlNet';
import type { ImageJobNetworkParams } from './ImageJobNetworkParams';
import type { ImageJobParams } from './ImageJobParams';
import type { Job } from './Job';
import type { TimeSpan } from './TimeSpan';
export type TextToImageJob = (Job & {
    model?: string | null;
    params?: ImageJobParams;
    imageHash?: string | null;
    /**
     * Get or set a associative list of additional networks. Each network is identified by a hash code
     */
    additionalNetworks?: Record<string, ImageJobNetworkParams> | null;
    /**
     * Get or set the URL where the image will be uploaded to
     */
    destinationUrl?: string | null;
    baseModel?: BaseModel;
    /**
     * Wether to store the image as a blob or as a legacy image
     */
    storeAsBlob?: boolean;
    /**
     * Get or set a list of control nets that should be applied with this textToImage job
     */
    controlNets?: Array<ImageJobControlNet> | null;
    readonly cost?: number;
    claimDuration?: TimeSpan;
    readonly type?: string | null;
});

