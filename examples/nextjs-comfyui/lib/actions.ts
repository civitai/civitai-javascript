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
    baseModel: "SD_1_5",
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    params: {
      prompt:
        "instagram photo, closeup face photo of 23 y.o Chloe in black sweater, cleavage, pale skin, (smile:0.4), hard shadows",
      negativePrompt:
        "(worst quality:1.4), (low quality:1.4), simple background, bad anatomy",
      scheduler: "EulerA",
      steps: 20,
      cfgScale: 7,
      width: 512,
      height: 512,
      clipSkip: 2,
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
