/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Job } from './Job';
import type { TimeSpan } from './TimeSpan';
export type ImageResourceTrainingJob = (Job & {
    model?: string | null;
    /**
     * A url referring data that needs to be trained upon
     */
    trainingData?: string | null;
    /**
     * A untyped set of parameters that are associated with this job
     */
    params?: Record<string, any> | null;
    /**
     * Get cost associated with this job
     */
    readonly cost?: number;
    /**
     * Get or set a custom cost value for this job
     */
    customCost?: number;
    /**
     * An application provided output of the current status of this job
     */
    output?: string | null;
    readonly type?: string | null;
    claimDuration?: TimeSpan;
});

