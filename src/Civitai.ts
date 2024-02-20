import { JobsService } from "./services/JobsService";
import { OpenAPI } from "./core/OpenAPI";
import { TextToImageInput } from "./models/TextToImageInput";
import { JobTemplateList } from "./models/JobTemplateList";

interface CivitaiConfig {
  auth: string;
}

class Civitai {
  image: {
    fromText: (input, wait?: boolean) => Promise<any>;
    fromComfy: (input: any) => Promise<any>;
  };
  job: {
    get: (jobId: string) => Promise<any>;
  };

  constructor(config: CivitaiConfig) {
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${config.auth}`,
    };

    this.image = {
      fromText: async (input, wait = false) => {
        const jobInput = {
          $type: "textToImage",
          ...input,
          quantity: 1,
          priority: {
            value: 1,
          },
        };
        console.log(`Creating TextToImage job with input=`, jobInput);
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
        return modifiedResponse;
      },
      fromComfy: async (input: any) => {
        const jobInput = {
          $type: "comfy",
          ...input,
          quantity: 1,
          priority: {
            value: 1,
          },
        };
        console.log(`Creating ComfyUI job with input=`, jobInput);
        return await JobsService.postV1ConsumerJobs(false, jobInput);
      },
    };

    this.job = {
      get: async (token: string) => {
        console.log(`Fetching job status for token ${token}`);
        const fullResponse = await JobsService.getV1ConsumerJobs(token);
        const modifiedJobs = fullResponse.jobs?.map((job) => ({
          jobId: job.jobId,
          cost: job.cost,
          result: job.result,
          scheduled: job.scheduled,
        }));
        // Return the modified response with only the specified fields for jobs
        return {
          jobs: modifiedJobs,
        };
      },
    };
  }
}

export default Civitai;
