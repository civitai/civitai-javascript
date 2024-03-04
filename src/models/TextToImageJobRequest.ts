/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageJobControlNet } from './ImageJobControlNet';
import type { ImageJobNetworkParams } from './ImageJobNetworkParams';
import type { ImageJobParams } from './ImageJobParams';
import type { JobRequest } from './JobRequest';
export type TextToImageJobRequest = (JobRequest & {
    /**
     * Get or sets the number of images to generate
     */
    quantity?: number;
    /**
     * The AIR of the checkpoint model to use for generation
     */
    model?: string | null;
    /**
     * Get or set a associative list of additional networks. Use the AIR of the network as the key.
     */
    additionalNetworks?: Record<string, ImageJobNetworkParams> | null;
    /**
     * Get or set a associative list of additional networks.
     */
    controlNets?: Array<ImageJobControlNet> | null;
    params?: ImageJobParams;
});

