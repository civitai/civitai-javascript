import { AssetType } from "civitai";
import { z } from "zod";

const additionalNetworksSchema = z.object({
  model: z.string().optional().nullable(),
  type: z.nativeEnum(AssetType).optional().nullable(),
  strength: z.number().optional().nullable(),
  triggerWord: z.string().optional().nullable(),
});

export const formSchema = z.object({
  model: z.string().min(1, {
    message: "Model is empty.",
  }),
  prompt: z.string().min(1, {
    message: "Prompt is empty.",
  }),
  negativePrompt: z.string().optional(),
  scheduler: z.string().min(1, {
    message: "Scheduler is empty.",
  }),
  steps: z.number().int().min(1, {
    message: "Steps is empty.",
  }),
  cfgScale: z.number().int().min(1, {
    message: "CfgScale is empty.",
  }),
  width: z.number().int().min(1, {
    message: "Width is empty.",
  }),
  height: z.number().int().min(1, {
    message: "Height is empty.",
  }),
  clipSkip: z.number().int().min(1, {
    message: "ClipSkip is empty.",
  }),
  additionalNetworks: z.array(additionalNetworksSchema).optional().nullable(),
});
