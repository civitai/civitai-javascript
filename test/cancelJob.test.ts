import Civitai from "../src/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Cancel Job Functionality", () => {
  let civitai: Civitai;
  let jobId: string = "2f93c5c4-d1d8-4def-9dd0-2e25e004c961";

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
    });
  });

  test("successfully cancels a job", async () => {
    const response = await civitai.job.cancel(jobId);
    console.log("Response:", JSON.stringify(response, null, 2));
    expect(response).toBeDefined();
  });
});
