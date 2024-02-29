import Civitai from "../dist/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Get Job Status by Token Functionality", () => {
  let civitai: Civitai;
  let jobId: string = "3bd49f7d-f379-4fe5-b3d4-dc2f4d0ef0cd";
  let token: string =
    "W3siSm9icyI6WyIxMDVjMWNmYi0wZTY3LTQ4N2EtOWRmMS1jZGRiOTU1ZTMzNDgiXX1d";

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
    });
  });

  test("successfully fetches job status", async () => {
    const response = await civitai.jobs.get(token);
    console.log("Response:", JSON.stringify(response, null, 2));
    expect(response).toBeDefined();
  });
});
