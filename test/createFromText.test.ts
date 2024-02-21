import Civitai from "../dist/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Create FromText Job", () => {
  let civitai: Civitai;

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_TOKEN || "",
    });
  });

  test("successfully creates a FromText job", async () => {
    const input = {
      baseModel: "SDXL",
      model: "urn:air:sd1:checkpoint:civitai:139562@344487",
      params: {
        prompt:
          "paparazzi photography  of of taylor swift, eyeliner, eyeshadow, long eyelashes, mascara, red lips, long blonde hair with fringe,   shot on Diana F+ high key lighting, in a warehouse, upper body, Fog , Hands By the Mouth Tunic,",
        negativePrompt: "",
        scheduler: "EulerA",
        steps: 20,
        cfgScale: 7,
        width: 512,
        height: 512,
        seed: -1,
        clipSkip: 2,
      },
      additionalNetworks: {
        "urn:air:sd1:lora:civitai:260037@293292": {
          type: "Lora",
          strength: 1.0,
        },
      },
    };
    const output = await civitai.image.fromText(input);
    console.log("Response:", JSON.stringify(output, null, 2));
    console.log("Result:", output.jobs[0].result);
    expect(output).toBeDefined();
  }, 300000);
});
