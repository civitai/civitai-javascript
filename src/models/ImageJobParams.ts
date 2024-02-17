/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Scheduler } from './Scheduler';
export type ImageJobParams = {
    prompt?: string | null;
    negativePrompt?: string | null;
    scheduler?: Scheduler;
    steps?: number;
    cfgScale?: number | null;
    width: number;
    height: number;
    seed?: number;
    clipSkip?: number;
};

