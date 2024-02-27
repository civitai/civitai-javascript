import Civitai from "../dist/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Get Job Status by Token Functionality", () => {
  let civitai: Civitai;
  let jobId: string = "3bd49f7d-f379-4fe5-b3d4-dc2f4d0ef0cd";
  let token: string =
    "W3siVGVtcGxhdGVUeXBlIjoiQ2l2aXRhaS5PcmNoZXN0cmF0aW9uLkFwaS5Db250cm9sbGVycy52MS5Db25zdW1lci5Kb2JzLlRlbXBsYXRlcy5UZXh0VG9JbWFnZUpvYlRlbXBsYXRlIiwiSm9icyI6eyJkM2I2YmYyYy0xMjAwLTQ5MDgtYjcxYy0yYzdiM2RkODRhN2QiOiI4ODgxNjg4NzY0QjlDQUZGQkM5ODQzRDI5NjczMDNGOTMwNzU4MTAyNzIzRjI1QTVFQzYzOTRFMkIzNENDMEY4In19XQ==";

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
    });
  });

  test("successfully fetches job status", async () => {
    const response = await civitai.jobs.get(token);
    console.log("Response:", JSON.stringify(response, null, 2));
    expect(response).toBeDefined();
  });
});
