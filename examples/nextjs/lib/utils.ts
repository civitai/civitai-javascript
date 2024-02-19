import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  modelVersion: z.string().min(1, {
    message: "Model version is empty.",
  }),
  prompt: z.string().min(1, {
    message: "Prompt is empty.",
  }),
  url: z.string().min(1, {
    message: "Website URL is empty.",
  }),
  image: z.string().nonempty({
    message: "Image is required",
  }),
  negativePrompt: z.string().optional(),
  inferenceStep: z.number().optional(),
  guidance: z.number().optional(),
  strength: z.number().optional(),
  controlnetConditioning: z.number().optional(),
  seed: z.number().optional(),
});
