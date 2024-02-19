import { JobsService } from "./services/JobsService";
import { OpenAPI } from "./core/OpenAPI";

interface CivitaiConfig {
  token: string;
}

class Civitai {
  image: {
    fromText: (input: any) => Promise<any>;
    fromComfy: (input: any) => Promise<any>;
  };
  job: {
    get: (jobId: string) => Promise<any>;
  };

  constructor(config: CivitaiConfig) {
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${config.token}`,
    };

    this.image = {
      fromText: async (input: any) => {
        const jobInput = {
          $type: "textToImage", // Set the job type internally
          ...input,
        };
        console.log(`Creating TextToImage job with input=`, jobInput);
        return await JobsService.postV1ConsumerJobs(true, jobInput);
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
        return await JobsService.postV1ConsumerJobs(true, jobInput);
      },
    };

    this.job = {
      get: async (token: string) => {
        console.log(`Fetching job status for token ${token}`);
        return await JobsService.getV1ConsumerJobs(token);
      },
    };
  }
}

export default Civitai;
