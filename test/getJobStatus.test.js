const Civitai = require("../dist/Civitai");
require("dotenv").config({ path: ".env.test" });

describe("Get Job Status Functionality", () => {
  let civitai;
  let jobId = "40f1e62f-6d3c-4254-90da-e76a59f21b22"; // Use a real or mocked jobId

  beforeAll(() => {
    civitai = new Civitai({
      token: process.env.CIVITAI_TOKEN,
    });
  });

  test("successfully fetches job status", async () => {
    const response = await civitai.jobs.get(jobId);
    console.log("Response:", response);

    expect(response).toBeDefined();
  });
});
