/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseModel } from './BaseModel';
import type { Job } from './Job';
import type { PrepareModelAction } from './PrepareModelAction';
export type PrepareModelJob = (Job & {
    baseModel?: BaseModel;
    model?: string | null;
    action?: PrepareModelAction;
    readonly type?: string | null;
});

