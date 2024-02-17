/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClearAsset } from "./ClearAsset";
import type { ComfyJob } from "./ComfyJob";
import type { CopyAsset } from "./CopyAsset";
import type { DeleteBlob } from "./DeleteBlob";
import type { GetBlob } from "./GetBlob";
import type { ImageEmbeddingJob } from "./ImageEmbeddingJob";
import type { ImageResourceTrainingJob } from "./ImageResourceTrainingJob";
import type { ImageTransformJob } from "./ImageTransformJob";
import type { PinBlob } from "./PinBlob";
import type { PrepareModelJob } from "./PrepareModelJob";
import type { TextToImageJob } from "./TextToImageJob";
import type { UnpinBlob } from "./UnpinBlob";
import type { UploadBlob } from "./UploadBlob";
import type { WDTaggingJob } from "./WDTaggingJob";
export type JobTemplateList = {
  jobs?: Array<
    | TextToImageJob
    | ImageResourceTrainingJob
    | UploadBlob
    | GetBlob
    | PinBlob
    | UnpinBlob
    | DeleteBlob
    | ImageTransformJob
    | CopyAsset
    | ClearAsset
    | WDTaggingJob
    | PrepareModelJob
    | ComfyJob
    | ImageEmbeddingJob
  >;
};
