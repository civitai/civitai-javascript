/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClearAssetRequest } from './ClearAssetRequest';
import type { ComfyJobRequest } from './ComfyJobRequest';
import type { CopyAssetRequest } from './CopyAssetRequest';
import type { DeleteBlobRequest } from './DeleteBlobRequest';
import type { GetBlobRequest } from './GetBlobRequest';
import type { ImageEmbeddingJobRequest } from './ImageEmbeddingJobRequest';
import type { ImageResourceTrainingJobRequest } from './ImageResourceTrainingJobRequest';
import type { ImageTransformJobRequest } from './ImageTransformJobRequest';
import type { MediaTaggingJobRequest } from './MediaTaggingJobRequest';
import type { PinBlobRequest } from './PinBlobRequest';
import type { PrepareModelJobRequest } from './PrepareModelJobRequest';
import type { RebootWorkerJobRequest } from './RebootWorkerJobRequest';
import type { TextToImageJobRequest } from './TextToImageJobRequest';
import type { UnpinBlobRequest } from './UnpinBlobRequest';
import type { UploadBlobRequest } from './UploadBlobRequest';
import type { WDTaggingJobRequest } from './WDTaggingJobRequest';
export type JobTemplateList = {
    jobs?: Array<(TextToImageJobRequest | ImageResourceTrainingJobRequest | UploadBlobRequest | GetBlobRequest | PinBlobRequest | UnpinBlobRequest | DeleteBlobRequest | ImageTransformJobRequest | CopyAssetRequest | ClearAssetRequest | WDTaggingJobRequest | MediaTaggingJobRequest | PrepareModelJobRequest | ComfyJobRequest | ImageEmbeddingJobRequest | RebootWorkerJobRequest)>;
};

