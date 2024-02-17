/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ModelError } from './ModelError';
import type { ModelValidationState } from './ModelValidationState';
export type ModelStateEntry = {
    rawValue?: any;
    attemptedValue?: string | null;
    readonly errors?: Array<ModelError> | null;
    validationState?: ModelValidationState;
    readonly isContainerNode?: boolean;
    readonly children?: Array<ModelStateEntry> | null;
};

