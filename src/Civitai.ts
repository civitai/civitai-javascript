import { JobsService } from "./services/JobsService";
import { CoverageService } from "./services/CoverageService";
import { OpenAPI } from "./core/OpenAPI";
import { AIR } from "./models/AIR";
import { ProviderAssetAvailability } from "./models/ProviderAssetAvailability";
import { JobStatusCollection } from "./models/JobStatusCollection";
import { QueryJobsRequest } from "./models/QueryJobsRequest";
import { ProblemDetails } from "./models/ProblemDetails";

import { fromTextSchema } from "./validation/ValidationSchemas";
import {
  CivitaiConfig,
  FromComfyInput,
  FromTextInput,
} from "./models/InputTypes";
import { QueryJobsResult } from "./models/QueryJobsResult";

// Main class for interacting with Civitai services
class Civitai {
  // Define the structure of image and job operations
  image: {
    fromText: (
      input: FromTextInput,
      wait?: boolean
    ) => Promise<JobStatusCollection | ProblemDetails | any>;
    fromComfy: (
      input: FromComfyInput,
      wait?: boolean
    ) => Promise<JobStatusCollection | ProblemDetails | any>;
  };
  jobs: {
    get: (token: string) => Promise<JobStatusCollection | any>;
    cancel: (jobId: string) => Promise<any | ProblemDetails>;
  };
  models: {
    get: (
      model: Array<AIR | string>
    ) => Promise<Record<string, ProviderAssetAvailability>>;
  };

  constructor(config: CivitaiConfig) {
    // Set authorization header for all API requests
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${config.auth}`,
    };

    // Image-related operations
    this.image = {
      // Convert text to image, optionally not waiting for job completion
      fromText: async (input, wait = false) => {
        // Runtime validation
        const { error } = fromTextSchema.validate(input);
        if (error) {
          throw new Error(`Validation error: ${error.message}`);
        }

        // Prepare job input with default values
        const jobInput = {
          $type: "textToImage",
          ...input,
          quantity: 1,
          priority: { value: 1 },
        };
        console.log(`Creating TextToImage job with input=`, jobInput);

        // Submit job and process response
        // @ts-ignore
        const response = await JobsService.postV1ConsumerJobs(wait, jobInput);
        const modifiedResponse = {
          token: response.token,
          jobs: response.jobs.map((job) => ({
            jobId: job.jobId,
            cost: job.cost,
            result: job.result,
            scheduled: job.scheduled,
          })),
        };

        // If waiting for job completion, poll until job is done
        if (wait) {
          try {
            const jobResult = await this.pollForJobCompletion(response.token);
            if (jobResult && modifiedResponse.jobs.length > 0) {
              modifiedResponse.jobs[0].result = jobResult;
            }
          } catch (error) {
            console.error(`${error}`);
          }
        }

        return modifiedResponse;
      },

      // Convert comfy input to output, optionally not waiting for job completion
      fromComfy: async (input, wait = false) => {
        const jobInput = {
          $type: "comfy",
          ...input,
          quantity: 1,
          priority: { value: 1 },
        };
        console.log(`Creating ComfyUI job with input=`, jobInput);

        // Submit job and process response
        // @ts-ignore
        const response = await JobsService.postV1ConsumerJobs(wait, jobInput);
        const modifiedResponse = {
          token: response.token,
          jobs: response.jobs.map((job) => ({
            jobId: job.jobId,
            cost: job.cost,
            result: job.result,
            scheduled: job.scheduled,
          })),
        };

        // If waiting for job completion, poll until job is done
        if (wait) {
          try {
            const jobResult = await this.pollForJobCompletion(response.token);
            if (jobResult && modifiedResponse.jobs.length > 0) {
              modifiedResponse.jobs[0].result = jobResult;
            }
          } catch (error) {
            console.error(`${error}`);
          }
        }

        return modifiedResponse;
      },
    };

    this.models = {
      // Get coverage of particular models
      get: async (model) => {
        console.log(`Fetching coverage for models:`, model);
        try {
          const coverage = await CoverageService.getV1ConsumerCoverage(
            model as AIR[]
          );
          return coverage;
        } catch (error) {
          console.error(`Error fetching model coverage: ${error}`);
          throw error;
        }
      },
    };

    // Job-related operations
    this.jobs = {
      // Fetch job status by token
      get: async (token: string) => {
        const fullResponse = await JobsService.getV1ConsumerJobs(token);
        const modifiedJobs = fullResponse.jobs?.map((job) => ({
          jobId: job.jobId,
          cost: job.cost,
          result: job.result,
          scheduled: job.scheduled,
        }));
        return { token, jobs: modifiedJobs };
      },

      // Cancel a job by jobId
      cancel: async (jobId: string) => {
        console.log(`Cancelling job with jobId ${jobId}`);
        try {
          await JobsService.deleteV1ConsumerJobs1(jobId, true); // force=true by default
          return {
            status: 200,
            message: `Job ${jobId} cancelled successfully.`,
          };
        } catch (error) {
          console.error(`Error cancelling job ${jobId}: ${error}`);
          throw error;
        }
      },
    };
  }

  // Poll for job completion with a timeout
  async pollForJobCompletion(
    token: string,
    interval: number = 30000, // Poll every 30 seconds
    timeout: number = 600000 // Timeout after 10 minutes
  ): Promise<any> {
    const startTime = Date.now();

    const checkJobStatus = async (): Promise<any> => {
      // Check for timeout
      if (Date.now() - startTime > timeout) {
        throw new Error(`Polling timeout exceeded for token ${token}`);
      }

      // Check job status
      const response = await this.jobs.get(token);
      const job = response.jobs && response.jobs[0];
      if (job && job.result && job.result.blobUrl) {
        return response;
      } else if (job && !job.scheduled) {
        // If the job is not scheduled and there's no blobUrl, throw an error
        throw new Error(
          `Job ${job.jobId} is not scheduled and has no result. Stopping polling.`
        );
      } else {
        console.log(`Job:`, JSON.stringify(response, null, 2));
        await new Promise((resolve) => setTimeout(resolve, interval));
        return checkJobStatus();
      }
    };

    return checkJobStatus();
  }
}

export default Civitai;
