import { OpenAPI } from "./core/OpenAPI";

import { AIR } from "./models/AIR";
import { ProviderAssetAvailability } from "./models/ProviderAssetAvailability";
import { JobStatusCollection } from "./models/JobStatusCollection";
import { QueryJobsRequest } from "./models/QueryJobsRequest";
import { QueryJobsResult } from "./models/QueryJobsResult";
import { ProblemDetails } from "./models/ProblemDetails";

import { JobsService } from "./services/JobsService";
import { CoverageService } from "./services/CoverageService";

import { fromTextSchema } from "./validation/ValidationSchemas";
import { ZodError } from "zod";

import { CivitaiConfig, FromComfyInput, FromTextInput } from "./types/Inputs";
import { JobStatus } from "./models/JobStatus";

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
    getByToken: (token: string) => Promise<JobStatusCollection>;
    getById: (jobId: string) => Promise<JobStatus>;
    getByQuery: (
      query: QueryJobsRequest,
      detailed?: boolean
    ) => Promise<QueryJobsResult>;
    cancel: (jobId: string) => Promise<any | ProblemDetails>;
  };
  models: {
    get: (
      model: Array<AIR | string>
    ) => Promise<Record<string, ProviderAssetAvailability>>;
  };

  constructor(config: CivitaiConfig) {
    const baseURL =
      config.env === "dev"
        ? "https://orchestration-dev.civitai.com"
        : "https://orchestration.civitai.com";

    OpenAPI.BASE = baseURL;
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${config.auth}`,
    };

    // Image-related operations
    this.image = {
      // Convert text to image, optionally not waiting for job completion
      fromText: async (input, wait = false) => {
        // Runtime validation
        try {
          fromTextSchema.parse(input);
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error(`Validation error: ${error.message}`);
          }
        }

        // Infer the baseModel from the model value
        const modelKeywordsMap: Record<string, string> = {
          sdxl: "SDXL",
          flux1: "Flux1",
        };
        
        const determineBaseModel = (modelUri: string): string => {
          for (const keyword in modelKeywordsMap) {
            if (modelUri.includes(keyword)) {
              return modelKeywordsMap[keyword];
            }
          }
          return "SD_1_5";
        };
        
        const baseModel = determineBaseModel(input.model);

        // Prepare job input with default values
        const jobInput = {
          $type: "textToImage",
          baseModel,
          ...input,
        };
        console.log(`Creating TextToImage job with input=`, jobInput);

        // Submit job and process response
        const response = await JobsService.postV1ConsumerJobs(
          wait,
          false, // detailed = false
          // @ts-ignore
          jobInput
        );
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
        };
        console.log(
          `Creating ComfyUI job with input=`,
          JSON.stringify(jobInput, null, 2)
        );

        // Submit job and process response
        const response = await JobsService.postV1ConsumerJobs(
          wait,
          false,
          // @ts-ignore
          jobInput
        );
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
      // Fetch job status by jobId
      getById: async (jobId: string) => {
        const response = await JobsService.getV1ConsumerJobs1(jobId);
        const modifiedResponse = {
          jobId: response.jobId,
          cost: response.cost,
          result: response.result,
          scheduled: response.scheduled,
        };
        return modifiedResponse;
      },

      // Fetch jobs by token
      getByToken: async (token: string) => {
        const response = await JobsService.getV1ConsumerJobs(token);
        const modifiedResponse = response.jobs?.map((job) => ({
          jobId: job.jobId,
          cost: job.cost,
          result: job.result,
          scheduled: job.scheduled,
        }));
        return { token, jobs: modifiedResponse };
      },

      // Fetch jobs by query
      getByQuery: async (query: QueryJobsRequest, detailed = false) => {
        try {
          const response = await JobsService.postV1ConsumerJobsQuery(
            detailed,
            query
          );
          return response;
        } catch (error) {
          console.error(`Error fetching jobs by query: ${error}`);
          throw error;
        }
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
      const response = await this.jobs.getByToken(token);
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
