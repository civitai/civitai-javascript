import Civitai from "../dist/Civitai";
import { QueryJobsRequest } from "../dist/models/QueryJobsRequest";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Get Jobs by Query Functionality", () => {
  let civitai: Civitai;
  const query: QueryJobsRequest = {
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
    const response = await civitai.jobs.getByQuery(query, true);
    console.log("Response:", JSON.stringify(response, null, 2));
    expect(response).toBeDefined();
  });
});
