import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pollJob(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/poll/${token}`);
        const data = await response.json();

        // Check if the blobUrl is available in the response
        if (data.jobs && data.jobs[0].result.blobUrl) {
          resolve(data.jobs[0].result.blobUrl); // Resolve the promise with the blobUrl
        } else {
          // If the blobUrl is not yet available, poll again after some delay
          setTimeout(checkStatus, 5000);
        }
      } catch (error) {
        reject(error);
      }
    };

    checkStatus();
  });
}
