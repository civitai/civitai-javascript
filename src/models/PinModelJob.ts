/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageJobNetworkParams } from './ImageJobNetworkParams';
import type { Job } from './Job';
export type PinModelJob = (Job & {
    assets?: Record<string, ImageJobNetworkParams> | null;
    readonly type?: string | null;
});

