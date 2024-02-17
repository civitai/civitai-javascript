/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FixedPriority } from './FixedPriority';
import type { Provider } from './Provider';
import type { RangedPriority } from './RangedPriority';
import type { TimeSpan } from './TimeSpan';
export type Job = {
    $type: string;
    /**
     * Get or set the name of this job so that it can be referenced by other jobs
     */
    name?: string | null;
    /**
     * Get or set a priority where lower values have priority over higher values
     */
    priority?: (FixedPriority | RangedPriority) | null;
    /**
     * Get or set a list of service providers to target with this job
     * If not specified then all providers will be targeted
     */
    providers?: Array<Provider> | null;
    /**
     * An optional expiration date for this job
     */
    expireAt?: string | null;
    /**
     * A dictionary of user defined properties that are associated with this job template
     */
    properties?: Record<string, any> | null;
    /**
     * Get or set a url that will be invoked upon completion of this job
     */
    callbackUrl?: string | null;
    timeout?: TimeSpan;
    /**
     * The max number of retries before we give up
     */
    retries?: number | null;
    /**
     * Get or set a list of dependencies that this job has
     * These are the names of jobs that this job is dependent upon
     */
    dependencies?: Array<string> | null;
};

