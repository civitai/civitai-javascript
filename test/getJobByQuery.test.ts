import Civitai from "../src/Civitai";
import dotenv from "dotenv";
import { QueryJobsRequest } from "../src/models/QueryJobsRequest";
dotenv.config({ path: ".env.test" });

describe("Get Jobs by Query Functionality", () => {
  let civitai: Civitai;
  let query: QueryJobsRequest = {
    properties: {
      userId: 4,
    },
  };

  beforeAll(() => {
    civitai = new Civitai({
      auth: process.env.CIVITAI_API_TOKEN || "",
    });
  });

  test("successfully fetches jobs by query", async () => {
    const response = await civitai.jobs.getByQuery(query);
    console.log("Response:", JSON.stringify(response, null, 2));
    expect(response).toBeDefined();
  });
});
