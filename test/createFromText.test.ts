import Civitai from "../dist/Civitai";
import { AssetType } from "../dist/models/AssetType";
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
    const input = {
      model: "urn:air:sd1:checkpoint:civitai:4201@130072",
      params: {
        prompt:
          "masterpiece, best quality, 1girl, IncrsAhri, multiple tails, fox tail, korean clothes, skirt, braid, arms behind back, seductive smile",
        negativePrompt: "",
        scheduler: Scheduler.EULER_A,
        steps: 25,
        cfgScale: 7,
        width: 512,
        height: 768,
        seed: -1,
        clipSkip: 2,
      },
      // additionalNetworks: {
      //   "urn:air:sd1:lora:civitai:162141@182559": {
      //     type: AssetType.LORA,
      //     strength: 1.0,
      //   },
      // },
      // callbackUrl: "https://4a1e-104-222-28-153.ngrok-free.app/api/webhook",
    };
    // Long polling as we pass in `wait` parameter
    const output = await civitai.image.fromText(input, true);
    console.log("Response:", JSON.stringify(output, null, 2));
    expect(output).toBeDefined();
  }, 40000);
});
