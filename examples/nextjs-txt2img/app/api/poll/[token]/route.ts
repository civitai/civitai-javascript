import { civitai } from "@/lib/civitai";
import { NextApiResponse } from "next";

interface JobResult {
  blobUrl: string;
  blobUrlExpirationDate: string;
}

interface Job {
  result: JobResult;
}

export async function GET(
  res: NextApiResponse,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  try {
    const response = await civitai.job.get(token);

    const jobs = response.jobs || [];
    const result = jobs.map((job: Job) => ({
      imageUrl: job.result.blobUrl,
      imageUrlExpirationDate: job.result.blobUrlExpirationDate,
    }));

    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
