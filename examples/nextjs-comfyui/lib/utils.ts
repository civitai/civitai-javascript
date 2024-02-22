import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is empty.",
  }),
});

// 7-character random string
export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

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