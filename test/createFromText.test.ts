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
      model: "@civitai/128713",
      params: {
        prompt:
          "instagram photo, closeup face photo of 23 y.o Chloe in black sweater, cleavage, pale skin, (smile:0.4), hard shadows",
        negativePrompt:
          "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation",
        scheduler: "EulerA",
        steps: 20,
        cfgScale: 7,
        width: 512,
        height: 768,
        clipSkip: 4,
      },
      // additionalNetworks: {
      //   "civitai:58390@62833": {
      //     type: "Lora",
      //     strength: 1,
      //   },
      // },
    };
    const output = await civitai.image.fromText(input);
    console.log("Response:", JSON.stringify(output, null, 2));
    console.log("Result:", output.jobs[0].result);
    expect(output).toBeDefined();
  }, 5000);
});
