import type { ImageJobParams } from "./ImageJobParams";
import type { ImageJobNetworkParams } from "./ImageJobNetworkParams";
import type { TextToImageJob } from "./TextToImageJob";
import { ImageJobControlNet } from "./ImageJobControlNet";

export interface TextToImageInput
  extends Omit<
    TextToImageJob,
    "$type" | "quantity" | "additionalNetworks" | "model" | "controlNets"
  > {
  model: string;
  baseModel?: string;
  params: ImageJobParams;
  additionalNetworks?: Record<string, ImageJobNetworkParams>;
  controlNets?: Array<ImageJobControlNet> | null;
}
