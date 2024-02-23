"use server";

import { Civitai } from "civitai";
import { FormValues, nanoid } from "./utils";
import { WEBHOOK_URL } from "./constants";

const civitai = new Civitai({
  auth: process.env.CIVITAI_API_TOKEN as string,
});

export async function generate(values: FormValues) {
  console.log("Generating image with values:", values);
  const prompt = values.prompt;

  const id = nanoid();

  const res = await civitai.image.fromText({
    input: {
      prompt,
    },
    webhook: `${WEBHOOK_URL}?id=${id}${
      process.env.CIVITAI_WEBHOOK_SECRET
        ? `&secret=${process.env.CIVITAI_WEBHOOK_SECRET}`
        : ""
    }`,
  });
  console.log(res);

  return id;
}
