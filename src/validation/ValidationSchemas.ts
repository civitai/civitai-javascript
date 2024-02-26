// Joi schema for runtime validation
import Joi from "joi";

const controlNetSchema = Joi.object({
  preprocessor: Joi.string()
    .valid("Canny", "DepthZoe", "SoftedgePidinet", "Rembg")
    .optional(),
  weight: Joi.number().optional(),
  startStep: Joi.number().optional(),
  endStep: Joi.number().optional(),
  blobKey: Joi.string().allow(null).optional(),
  imageUrl: Joi.string().allow(null).optional(),
});

export const fromTextSchema = Joi.object({
  baseModel: Joi.string().optional(),
  model: Joi.string().required(),
  params: Joi.object({
    prompt: Joi.string().required(),
    negativePrompt: Joi.string().optional(),
    scheduler: Joi.string().optional(),
    steps: Joi.number().optional(),
    cfgScale: Joi.number().optional(),
    width: Joi.number().required(),
    height: Joi.number().required(),
    seed: Joi.number().optional(),
    clipSkip: Joi.number().optional(),
  }).required(),
  additionalNetworks: Joi.object()
    .pattern(
      Joi.string(),
      Joi.object({
        type: Joi.string().required(),
        strength: Joi.number().optional(),
        triggerWord: Joi.string().optional(),
      })
    )
    .optional(),
  controlNets: Joi.array().items(controlNetSchema).optional(),
  callbackUrl: Joi.string().optional(),
});
