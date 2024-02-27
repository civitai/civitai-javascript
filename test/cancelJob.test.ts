import Civitai from "../src/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Cancel Job Functionality", () => {
  let civitai: Civitai;
  let jobId: string = "3bd49f7d-f379-4fe5-b3d4-dc2f4d0ef0cd";

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
