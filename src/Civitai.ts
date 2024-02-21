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
      fromText: async (input, wait = true) => {
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

        // If wait is true, initiate extended polling
        if (wait) {
          console.log(`Waiting for job completion, token: ${response.token}`);
          try {
            const jobResult = await this.pollForJobCompletion(response.token);
            if (jobResult && modifiedResponse.jobs.length > 0) {
              modifiedResponse.jobs[0].result = jobResult;
            }
          } catch (error) {
            console.error(`Error during job completion polling: ${error}`);
          }
        }

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
        return {
          jobs: modifiedJobs,
        };
      },
    };
  }

  // Long polling for job completion with a timeout after 5 minutes
  async pollForJobCompletion(
    token: string,
    interval: number = 30000,
    timeout: number = 300000
  ): Promise<any> {
    console.log(
      `Polling for job completion for token ${token.slice(
        0,
        5
      )}...${token.slice(-5)}`
    );
    const startTime = Date.now();

    const checkJobStatus = async (): Promise<any> => {
      if (Date.now() - startTime > timeout) {
        throw new Error(`Polling timeout exceeded for token ${token}`);
      }

      const response = await this.job.get(token);
      const job = response.jobs && response.jobs[0];
      if (job && job.result && job.result.blobUrl) {
        console.log(`Job completed with blobUrl: ${job.result.blobUrl}`);
        return job.result;
      } else {
        console.log(`Job not completed yet. Polling again...`);
        await new Promise((resolve) => setTimeout(resolve, interval));
        return checkJobStatus();
      }
    };

    return checkJobStatus();
  }
}

export default Civitai;
