/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComfyJob } from './ComfyJob';
import type { ImageEmbeddingJob } from './ImageEmbeddingJob';
import type { ImageResourceTrainingJob } from './ImageResourceTrainingJob';
import type { ImageTransformJob } from './ImageTransformJob';
import type { JobEvent } from './JobEvent';
import type { MediaTaggingJob } from './MediaTaggingJob';
import type { PingJob } from './PingJob';
import type { PinModelJob } from './PinModelJob';
import type { PrepareModelJob } from './PrepareModelJob';
import type { ProviderJobStatus } from './ProviderJobStatus';
import type { RebootWorkerJob } from './RebootWorkerJob';
import type { TextToImageJob } from './TextToImageJob';
import type { WDTaggingJob } from './WDTaggingJob';
export type JobStatus = {
    job?: (TextToImageJob | PingJob | ImageResourceTrainingJob | ImageTransformJob | WDTaggingJob | MediaTaggingJob | PrepareModelJob | ComfyJob | ImageEmbeddingJob | PinModelJob | RebootWorkerJob) | null;
    readonly jobId?: string | null;
    readonly cost?: number | null;
    readonly properties?: Record<string, any> | null;
    /**
     * A optional result of the job
     */
    result?: any;
    lastEvent?: JobEvent;
    /**
     * The position of this job in the different queues for different providers. If this is an empty object then this job remains unscheduled.
     */
    serviceProviders?: Record<string, ProviderJobStatus> | null;
    /**
     * Wether
     */
    readonly scheduled?: boolean;
};

