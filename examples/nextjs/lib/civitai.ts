import { Civitai } from "civitai";

export const civitai = new Civitai({
  token: process.env.CIVITAI_TOKEN || "",
});
