import Civitai from "../src/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Create FromText Job", () => {
  let civitai: Civitai;

  beforeAll(() => {
    civitai = new Civitai({
      token: process.env.CIVITAI_TOKEN || "",
    });
  });

  test("successfully creates a FromText job", async () => {
    const input = {
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
    };
    const output = await civitai.image.fromText(input);
    console.log("Response:", JSON.stringify(output, null, 2));
    console.log("Result:", output.jobs[0].result);
    expect(output).toBeDefined();
  }, 30000);
});
