import { civitai } from "@/lib/civitai";

export async function POST(request: Request) {
  const input = await request.json();
  console.log("input", input);

  try {
    const response = await civitai.image.fromText(input);

    const token = response.token;

    return new Response(JSON.stringify({ token }), {
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
