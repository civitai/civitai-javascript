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
      model: "@civitai/46846",
      baseModel: "SD_1_5",
      params: {
        prompt:
          "Style by Style-Empire, award winning Photo of Shakira as a Victorian Princess, with small breasts and big hips wearing a sundress, backlit, undercut hairstyle, digital painting, concept art, smooth, sharp focus, rule of thirds, dark fantasy,intricate details, art by aleksi briclot and Greg Rutkowski, medium shot breast, tree lined street",
        negativePrompt:
          "Deformed, blurry, bad anatomy, disfigured, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, ((mutated hands and fingers)), ((anthro)), ((animal)), hat, crown, flowers, candle",
        scheduler: "DPM2MKarras",
        steps: 55,
        cfgScale: 9,
        width: 512,
        height: 768,
        seed: -1,
        clipSkip: 1,
      },
      additionalNetworks: {
        "@civitai/2179": {
          type: "TextualInversion",
          strength: 1.0,
          triggerWord: "Style-Empire",
        },
      },
    };
    const output = await civitai.image.fromText(input);
    console.log("Response:", JSON.stringify(output, null, 2));
    console.log("Result:", output.jobs[0].result);
    expect(output).toBeDefined();
  }, 30000);
});
