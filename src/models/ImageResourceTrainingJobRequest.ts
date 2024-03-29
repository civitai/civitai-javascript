/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobRequest } from './JobRequest';
export type ImageResourceTrainingJobRequest = (JobRequest & {
    /**
     * The primary model to train upon
     */
    model?: string | null;
    /**
     * A url referring data that needs to be trained upon
     */
    trainingData?: string | null;
    /**
     * A untyped set of parameters that are associated with this job
     */
    params?: Record<string, any> | null;
});

