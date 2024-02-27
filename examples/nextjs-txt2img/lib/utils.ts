import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
});

export function pollJob(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/poll/${token}`);
        const data = await response.json();

        if (data.result && data.result[0] && data.result[0].imageUrl) {
          resolve(data.result[0].imageUrl); // Resolve the promise with the imageUrl
        } else {
          // If the job is not yet done, poll again after some delay
          setTimeout(checkStatus, 5000);
        }
      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    };

    checkStatus();
  });
}
