/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobEventType } from './JobEventType';
import type { Provider } from './Provider';
import type { TimeSpan } from './TimeSpan';
export type JobEvent = {
    jobId?: string | null;
    type?: JobEventType;
    /**
     * Get the absolute datetime on which this event got created
     */
    dateTime?: string;
    provider?: Provider;
    /**
     * Get or set the workerId that is associated with this event
     */
    workerId?: string | null;
    /**
     * An optional set of key/value pairs that can be used to provide additional context.
     */
    context?: Record<string, any> | null;
    claimDuration?: TimeSpan;
    jobDuration?: TimeSpan;
    /**
     * The retry attempt of this job
     */
    retryAttempt?: number;
    /**
     * The cost of the job associated with this event
     */
    cost?: number;
    /**
     * The properties of the job associated with this event
     */
    jobProperties?: Record<string, any> | null;
    /**
     * Get the type of the job
     */
    jobType?: string | null;
    /**
     * The priority that is associated with this job
     */
    jobPriority?: number;
    /**
     * Get wether this event marks the completion of a claim
     */
    readonly claimHasCompleted?: boolean;
    /**
     * Get wether this event marks the completion of a job
     * This is determined bsed on the Civitai.Orchestration.Grains.Jobs.JobEvent.Type of this event
     */
    readonly jobHasCompleted?: boolean;
};

