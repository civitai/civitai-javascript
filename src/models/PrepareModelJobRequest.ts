/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseModel } from './BaseModel';
import type { JobRequest } from './JobRequest';
import type { PrepareModelAction } from './PrepareModelAction';
export type PrepareModelJobRequest = (JobRequest & {
    baseModel?: BaseModel;
    /**
     * Get or set the model to prepare
     */
    model?: string | null;
    action?: PrepareModelAction;
});

