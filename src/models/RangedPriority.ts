/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Priority } from './Priority';
/**
 * A priority will be dynamically calculated between the min and max values.
 * The value will be calculated based on the number of recent requests that share the same properties.
 */
export type RangedPriority = (Priority & {
    min?: number;
    max?: number;
});

