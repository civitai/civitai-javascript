/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TimeSpan } from './TimeSpan';
export type Job = {
    /**
     * A unique id for this job
     */
    id?: string | null;
    /**
     * The date when this job got created
     */
    createdAt?: string;
    /**
     * The date for when this job was set to expire
     */
    expireAt?: string | null;
    /**
     * A webhook to be invoked when the job receives a status update
     */
    webhook?: string | null;
    /**
     * A set of user defined properties that can be used to index and partition this job
     */
    properties?: Record<string, any> | null;
    /**
     * The type of this job as a string
     */
    readonly type?: string | null;
    /**
     * Get a cost estimate for this job
     */
    readonly cost?: number;
    /**
     * The max number of retries before we give up
     */
    maxRetryAttempt?: number;
    /**
     * Get or set a list of dependencies that this job has
     */
    dependencies?: Array<string> | null;
    /**
     * Get or set the name of the consumer that issued this job
     */
    issuedBy?: string | null;
    claimDuration?: TimeSpan;
};

