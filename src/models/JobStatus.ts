/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobEvent } from './JobEvent';
import type { ProviderJobStatus } from './ProviderJobStatus';
export type JobStatus = {
    /**
     * The id of the job associated with this request, or null if no job got submitted
     */
    jobId?: string | null;
    /**
     * The cost of this job.
     */
    cost?: number | null;
    /**
     * A optional result of the job
     */
    result?: any;
    lastEvent?: JobEvent;
    /**
     * The position of this job in the different queues for different providers. If this is an empty object then this job remains unscheduled.
     */
    serviceProviders?: Record<string, ProviderJobStatus> | null;
    /**
     * Wether
     */
    readonly scheduled?: boolean;
};

