import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormValues = z.infer<typeof formSchema>;

export const formSchema = z.object({
  jsonContent: z
    .string()
    .min(1, {
      message: "JSON content is empty.",
    })
    .refine(
      (data) => {
        try {
          JSON.parse(data);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "JSON content is invalid.",
      }
    ),
});

// 7-character random string
export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
