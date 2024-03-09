import { civitai } from "@/lib/civitai";
import { JobStatus } from "civitai";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  try {
    const response = await civitai.jobs.getByToken(token);

    return new Response(JSON.stringify(response), {
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
