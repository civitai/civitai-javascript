/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TimeSpan } from './TimeSpan';
export type ProviderJobQueuePosition = {
    /**
     * The exact position in the queue
     */
    precedingJobs?: number;
    /**
     * The exact cost that is preceding
     */
    precedingCost?: number;
    /**
     * The estimated throughput rate of the queue
     */
    throughputRate?: number;
    /**
     * The id of the worker that this job is queued with
     */
    workerId?: string | null;
    estimatedStartDuration?: TimeSpan;
    /**
     * The date before the job is estimated to be started. Null if we do not have an estimate yet
     */
    readonly estimatedStartDate?: string | null;
};

