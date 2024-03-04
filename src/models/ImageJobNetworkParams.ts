/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssetType } from './AssetType';
export type ImageJobNetworkParams = {
    type?: AssetType;
    /**
     * In case of Lora and LoCon, set the strength of the network
     */
    strength?: number | null;
    /**
     * In case of a TextualInversion, set the trigger word of the network
     */
    triggerWord?: string | null;
};

