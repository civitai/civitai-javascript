// Interfaces for configuration and input types

import { ImageJobControlNet } from "./ImageJobControlNet";
import { ImageJobNetworkParams } from "./ImageJobNetworkParams";
import { Scheduler } from "./Scheduler";

export interface CivitaiConfig {
  auth: string;
}

export type FromComfyInput = {
  params?: Record<string, any> | null;
  callbackUrl?: string;
};

export type FromTextInput = {
  baseModel?: string;
  model: string;
  params: {
    prompt: string;
    negativePrompt?: string;
    scheduler?: Scheduler;
    steps?: number;
    cfgScale?: number;
    width: number;
    height: number;
    seed?: number;
    clipSkip?: number;
  };
  additionalNetworks?: {
    [key: string]: ImageJobNetworkParams;
  };
  controlNets?: ImageJobControlNet[];
  callbackUrl?: string;
};
