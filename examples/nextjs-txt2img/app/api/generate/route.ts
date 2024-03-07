import { civitai } from "@/lib/civitai";

export async function POST(request: Request) {
  let input = await request.json();
  console.log("input", input);
  const {
    model,
    prompt,
    negativePrompt,
    scheduler,
    steps,
    cfgScale,
    width,
    height,
    clipSkip,
    additionalNetworks,
  } = input;

  input = {
    model,
    params: {
      prompt,
      negativePrompt,
      scheduler,
      steps,
      cfgScale,
      width,
      height,
      clipSkip,
    },
  };

  // Transform additionalNetworks array to the desired object structure
  if (additionalNetworks) {
    const additionalNetworksObject = additionalNetworks.reduce(
      (acc: Record<string, any>, curr: any) => {
        if (curr.model) {
          // Ensure model is not null or undefined
          acc[curr.model] = {
            type: curr.type,
            strength: curr.strength,
            triggerWord: curr.triggerWord,
          };
        }
        return acc;
      },
      {}
    );

    // Replace the original additionalNetworks array with the transformed object
    input = { ...input, additionalNetworks: additionalNetworksObject };
  }

  try {
    const response = await civitai.image.fromText(input);
    console.log("response", JSON.stringify(response, null, 2));

    const token = response.token;

    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in civitai.image.fromText:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
