const Civitai = require("../dist/Civitai");
require("dotenv").config({ path: ".env.test" });

describe("Create Job Functionality", () => {
  let civitai;

  beforeAll(() => {
    civitai = new Civitai({
      token: process.env.CIVITAI_TOKEN,
    });
  });

  test("successfully creates a job", async () => {
    const input = {
      $type: "textToImage",
      baseModel: "SD1",
      model: "@civitai/128713",
      params: {
        prompt: "A cat",
        negativePrompt: "A dog",
        scheduler: "EulerA",
        steps: 20,
        cfgScale: 7,
        width: 512,
        height: 768,
        clipSkip: 4,
      },
      quantity: 1,
      priority: 1,
    };

    const output = await civitai.jobs.create(input, true);
    console.log("Response:", output);
    console.log("Job result:", output.jobs[0].result);

    expect(output).toBeDefined();
    expect(output.jobs[0].result).toBeDefined();
  }, 60000); // Timeout of 1 minute(s)
});
