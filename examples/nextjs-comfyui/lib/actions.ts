"use server";

import { Civitai } from "civitai";
import { nanoid } from "./utils";
import { WEBHOOK_URL } from "./constants";
import fs from "fs/promises"; // Use the Promise-based version of fs

const civitai = new Civitai({
  auth: process.env.CIVITAI_API_TOKEN as string,
});

export async function generate(jsonContent: string) {
  const id = nanoid();

  console.log("jsonContent", jsonContent);

  const res = await civitai.image.fromComfy({
    params: {
      workflow: JSON.parse(jsonContent), // Workflow JSON
    },
    callbackUrl: `${WEBHOOK_URL}?id=${id}${
      process.env.CIVITAI_WEBHOOK_SECRET
        ? `&secret=${process.env.CIVITAI_WEBHOOK_SECRET}`
        : ""
    }`,
  });
  console.log("Res", res);

  return id;
}
