import Civitai from "../dist/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Get Job Status by Token Functionality", () => {
  let civitai: Civitai;
  const jobId = "3f071548-46c6-40d5-8e5a-210aa6b8bccc";
  const token: string =
    "W3siSm9icyI6WyIzZjA3MTU0OC00NmM2LTQwZDUtOGU1YS0yMTBhYTZiOGJjY2MiXX1d";

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
    });
  });

  test("successfully fetches job status", async () => {
    const response = await civitai.jobs.getByToken(token);
    // const response = await civitai.jobs.getById(jobId);
    console.log("Response:", JSON.stringify(response, null, 2));
    expect(response).toBeDefined();
  });
});
