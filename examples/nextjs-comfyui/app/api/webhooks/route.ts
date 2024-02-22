import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (process.env.REPLICATE_WEBHOOK_SECRET) {
    // if a secret is set, verify it
    const secret = searchParams.get("secret") as string;
    if (secret !== process.env.REPLICATE_WEBHOOK_SECRET) {
      return new Response("Invalid secret", { status: 401 });
    }
  }

  try {
    const data = await req.json();

    if (data) {
      return NextResponse.json(
        {
          success: true,
          message: "Webhook received successfully",
          data,
        },
        { status: 200 }
      );
    } else {
      return new Response("Missing output", { status: 400 });
    }
  } catch (error) {
    console.error("Error handling webhook data:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error },
      { status: 500 }
    );
  }
}
