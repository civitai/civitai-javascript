import Civitai from "../src/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Cancel Job Functionality", () => {
  let civitai: Civitai;
  let jobId: string = "2c9a5e26-5d25-4566-9a60-bc85cc610749";

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_TOKEN || "",
    });
  });

  test("successfully cancels a job", async () => {
    const response = await civitai.job.cancel(jobId);
    console.log("Response:", JSON.stringify(response, null, 2));
    expect(response).toBeDefined();
  });
});
