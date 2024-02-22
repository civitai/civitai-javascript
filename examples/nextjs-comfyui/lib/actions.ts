"use server";

import { Civitai } from "civitai";
import { nanoid } from "./utils";
import { WEBHOOK_URL } from "./constants";

const civitai = new Civitai({
  auth: process.env.CIVITAI_API_TOKEN as string,
});

export async function generate(form: FormData) {
  const prompt = form.get("prompt") as string;

  const id = nanoid();

  const res = await civitai.image.fromText({
    version: "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
    input: {
      prompt,
    },
    webhook: `${WEBHOOK_URL}?id=${id}${
      process.env.REPLICATE_WEBHOOK_SECRET
        ? `&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
        : ""
    }`,
    webhook_events_filter: ["completed"],
  });
  console.log(res);

  return id;
}
