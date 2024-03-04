/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Job } from './Job';
import type { TimeSpan } from './TimeSpan';
export type WDTaggingJob = (Job & {
    model?: string | null;
    mediaUrl?: string | null;
    threshold?: number | null;
    readonly cost?: number;
    claimDuration?: TimeSpan;
    readonly type?: string | null;
});

