import { Civitai } from "civitai";

export const civitai = new Civitai({
  auth: process.env.CIVITAI_API_TOKEN || "",
});
