import Civitai from "../dist/Civitai";
import { AssetType } from "../dist/models/AssetType";
import { FromTextInput } from "../dist/types/Inputs";
import { Scheduler } from "../dist/models/Scheduler";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Create FromText Job", () => {
  let civitai: Civitai;

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
    });
  });
  test("successfully creates a FromText job", async () => {
    const input: FromTextInput = {
      model: "urn:air:sd1:checkpoint:civitai:4384@128713",
      params: {
        prompt: "A cat",
        negativePrompt: "A dog",
        scheduler: "EulerA" as Scheduler,
        steps: 30,
        cfgScale: 10,
        width: 768,
        height: 512,
        seed: -1,
        clipSkip: 1,
      },
      additionalNetworks: {
        "urn:air:sd1:lora:civitai:82098@87153": {
          type: AssetType.LORA,
          strength: 1,
        },
      },
      quantity: 1,
      priority: 1,
      batchSize: 4,
    };
    // Long polling as we pass in `wait` parameter
    const output = await civitai.image.fromText(input, true);
    console.log("Response:", JSON.stringify(output, null, 2));
    expect(output).toBeDefined();
  }, 60000);
});
