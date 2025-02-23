// Zod schema for runtime validation
import { z } from "zod";

const controlNetSchema = z
  .object({
    preprocessor: z
      .enum(["Canny", "DepthZoe", "SoftedgePidinet", "Rembg"])
      .optional(),
    weight: z.number().optional(),
    startStep: z.number().optional(),
    endStep: z.number().optional(),
    blobKey: z.string().nullable().optional(),
    imageUrl: z.string().nullable().optional(),
  })
  .strict();

export const fromTextSchema = z
  .object({
    baseModel: z.string().optional(),
    model: z.string(),
    params: z
      .object({
        prompt: z.string(),
        negativePrompt: z.string().optional(),
        scheduler: z.string().optional(),
        steps: z.number().optional(),
        cfgScale: z.number().optional(),
        width: z.number().gte(1).lte(1440),
        height: z.number().gte(1).lte(1440),
        seed: z.number().optional(),
        clipSkip: z.number().optional(),
      })
      .strict(),
    additionalNetworks: z
      .record(
        z
          .object({
            strength: z.number().optional(),
            triggerWord: z.string().optional(),
            type: z.string().optional(),
          })
          .strict()
      )
      .optional(),
    controlNets: z.array(controlNetSchema).optional(),
    callbackUrl: z.string().optional(),
    quantity: z.number().optional().default(1),
    batchSize: z.number().optional().default(1),
    priority: z.union([z.string(), z.number()]).optional(),
    properties: z.record(z.any()).optional(),
  })
  .strict();
