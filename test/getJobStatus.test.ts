import Civitai from "../dist/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Get Job Status by Token Functionality", () => {
  let civitai: Civitai;
  const jobId = "a2916035-7a89-4d1e-b6c9-1810f113f456";

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
    });
  });

  test("successfully fetches job status", async () => {
    // const response = await civitai.jobs.getByToken(token);
    const response = await civitai.jobs.getById(jobId);
    console.log("Response:", JSON.stringify(response, null, 2));
    expect(response).toBeDefined();
  });
});
