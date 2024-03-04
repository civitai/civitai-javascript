/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobRequest } from './JobRequest';
import type { TimeSpan } from './TimeSpan';
export type GetBlobRequest = (JobRequest & {
    /**
     * Get or set the key of the blob to upload
     */
    key?: string | null;
    duration?: TimeSpan;
});

