import Civitai from "../dist/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Get Job Status by Token Functionality", () => {
  let civitai: Civitai;
  const jobId = "f1f4eee6-d1ee-4a82-a063-2c451823a86b";
  const token: string =
    "W3siSm9icyI6WyJlYzU0NDM2Ny0xYjU5LTRjN2YtYTViOC00NmM3MzlhYjZlODYiXX1d";

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
