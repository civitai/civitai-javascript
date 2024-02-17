import { JobsService } from "./services/JobsService";
import { OpenAPI } from "./core/OpenAPI";

interface CivitaiConfig {
  token: string;
}

class Civitai {
  jobs: {
    create: (input: any, wait: boolean) => Promise<any>;
    get: (jobId: string) => Promise<any>;
  };

  constructor(config: CivitaiConfig) {
    OpenAPI.HEADERS = {
      Authorization: `Bearer ${config.token}`,
    };

    this.jobs = {
      create: async (input: any, wait: boolean = true) => {
        console.log(`Creating job with wait=${wait} and input=`, input, "\n");
        return await JobsService.postV1ConsumerJobs(wait, input);
      },
      get: async (jobId: string) => {
        console.log(`Fetching job status for jobId ${jobId}`);
        return await JobsService.getV1ConsumerJobs1(jobId);
      },
    };
  }
}

module.exports = Civitai;
