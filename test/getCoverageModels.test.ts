import Civitai from "../dist/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Get Coverage Models", () => {
  let civitai: Civitai;

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
    });
  });

  test("successfully retrieves model coverage", async () => {
    const models = [
      "urn:air:sd1:checkpoint:civitai:107842@275408",
      "urn:air:sd1:lora:civitai:162141@182559",
    ];
    const coverage = await civitai.models.get(models);
    console.log("Model Coverage:", JSON.stringify(coverage, null, 2));
    expect(coverage).toBeDefined();
  });
});
