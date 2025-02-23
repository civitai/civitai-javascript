import Civitai from "../dist/Civitai";
import { FromComfyInput } from "../dist/types/Inputs";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config({ path: ".env.test" });

describe("Create FromComfy Job", () => {
  let civitai: Civitai;

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
      env: "dev",
    });
  });

  test("successfully creates a FromComfy job", async () => {
    const workflowPath = path.join(
      __dirname,
      "comfyui-workflows",
      "comfy-sdxl-kitten-1024.json"
    );
    const workflow = JSON.parse(fs.readFileSync(workflowPath, "utf8"));

    const input: FromComfyInput = {
      params: {
        workflow: workflow,
      },
      quantity: 1,
    };

    // Long polling as we pass in `wait` parameter
    const output = await civitai.image.fromComfy(input, false);
    console.log("Response:", JSON.stringify(output, null, 2));
    expect(output).toBeDefined();
  }, 1200000); // Adjust timeout as necessary
});
