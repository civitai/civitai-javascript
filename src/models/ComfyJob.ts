/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Job } from './Job';
import type { TimeSpan } from './TimeSpan';
export type ComfyJob = (Job & {
    /**
     * A untyped set of parameters that are associated with this job
     */
    params?: Record<string, any> | null;
    readonly type?: string | null;
    claimDuration?: TimeSpan;
});

