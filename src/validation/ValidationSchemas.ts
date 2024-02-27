// Zod schema for runtime validation
import { z } from "zod";

const controlNetSchema = z.object({
  preprocessor: z
    .enum(["Canny", "DepthZoe", "SoftedgePidinet", "Rembg"])
    .optional(),
  weight: z.number().optional(),
  startStep: z.number().optional(),
  endStep: z.number().optional(),
  blobKey: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
});

export const fromTextSchema = z.object({
  baseModel: z.string().optional(),
  model: z.string(),
  params: z.object({
    prompt: z.string(),
    negativePrompt: z.string().optional(),
    scheduler: z.string().optional(),
    steps: z.number().optional(),
    cfgScale: z.number().optional(),
    width: z.number(),
    height: z.number(),
    seed: z.number().optional(),
    clipSkip: z.number().optional(),
  }),
  additionalNetworks: z
    .record(
      z.object({
        type: z.string(),
        strength: z.number().optional(),
        triggerWord: z.string().optional(),
      })
    )
    .optional(),
  controlNets: z.array(controlNetSchema).optional(),
  callbackUrl: z.string().optional(),
  quantity: z.number().optional().default(1),
  properties: z.record(z.any()).optional(),
});
