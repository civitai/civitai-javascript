# Civitai Generator Node.js Client

A node.js client for Civitai's generator to run Civitai models from your Node.js code.

## Installation

```bash
npm install civitai
```

## Usage

#### Create the client:

```js
// ESM (where `"type": module` in package.json or using .mjs extension)
import { Civitai } from "civitai";

// CommonJS (using .cjs extension)
const Civitai = require("civitai");
```

```js
const civitai = new Civitai({
  auth: "YOUR_API_TOKEN",
});
```

#### Create a txt2img job:

```js
import { Scheduler } from "civitai";

const input = {
  baseModel: "SDXL",
  model: "@civitai/128713",
  params: {
    prompt:
      "instagram photo, closeup face photo of 23 y.o Chloe in black sweater, cleavage, pale skin, (smile:0.4), hard shadows",
    negativePrompt:
      "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3)",
    scheduler: Scheduler.EULER_A,
    steps: 20,
    cfgScale: 7,
    width: 512,
    height: 512,
    clipSkip: 4,
  },
};
```

Run a model and await the result:

```js
const response = await civitai.image.fromText(input);
const output = response.jobs[0].result;
```

_Note: Jobs timeout after 5 minutes._

Or wait for the job to finish by running the generation in the background a.k.a short polling:

```js
const response = await civitai.image.fromText(input, false); // Add false flag
```

Then fetch the result later:

```js
const output = civitai.job.get(response.token);
```

### Using Additional Networks

The SDK supports additional networks: LoRA, VAE, Hypernetwork, Textual Inversion, LyCORIS, Checkpoint, and LoCon. See the full list [here](src/models/AssetType.ts).

To use any of the networks availabe on Civitai, simply the `additionNetworks` field into the input:

```js
import { Scheduler, AssetType } from "civitai";

const input = {
  baseModel: "SD_1_5",
  model: "urn:air:sd1:checkpoint:civitai:107842@275408",
  params: {
    prompt:
      "masterpiece, best quality, 1girl, IncrsAhri, multiple tails, fox tail, korean clothes, skirt, braid, arms behind back, seductive smile",
    negativePrompt:
      "(worst quality:1.4), (low quality:1.4), simple background, bad anatomy",
    scheduler: Scheduler.EULER_A,
    steps: 25,
    cfgScale: 7,
    width: 512,
    height: 768,
    seed: -1,
    clipSkip: 2,
  },
  // Add this `additionalNetworks` field
  additionalNetworks: {
    "urn:air:sd1:lora:civitai:162141@182559": {
      type: AssetType.LORA,
      strength: 1.0,
    },
  },
};
```

In the case of `Lora` and `LoCon` networks, set the `strength` of the network; for `TextualInversion`, set the `triggerWord` of the network.

<br/>

## API

### Constructor

```js
const civitai = new Civitai(options);
```

| name   | type   | description                    |
| ------ | ------ | ------------------------------ |
| `auth` | string | **Required**. API access token |

### `civitai.job.get`

Get the status of a job by looking up the job token.

```js
const response = await civitai.job.get(token);
```

```json
"jobs":
[
  {
    "jobId": "3f6fe6cd-6ed5-49f2-9e6b-2471a21c88ff",
    "cost": 1.2000000000000002,
    "result": {
      "blobKey": "606564B2E67282B49E5D0D25D989BB1213D1C766D4BD25333EC1EEDA2572AC51",
      "available": false
    },
    "scheduled": true
  }
]
```

### `civitai.image.fromText`

Run a model with inputs you provide.

```js
const response = await civitai.image.fromText(options);
```

```json
{
  "token": "W3siVGVtcGxhdGVUeXBlIjoiQ2l2aXRhaS5PcmNoZXN0cmF0aW9uLkFwaS5Db250cm9sbGVycy52MS5Db25zdW1lci5Kb2JzLlRlbXBsYXRlcy5UZXh0VG9JbWFnZUpvYlRlbXBsYXRlIiwiSm9icyI6eyJiYzk1ZGZhMi1jNmEwLTQ1OWMtYjljZS02YjJiOWJjYjQ1MjYiOiIwOTU0RTY5OEUwM0Y5RTdCNEE3M0RGRjlDNkIwQUFDQkU4NTBBRjA3MkMzQzYyMjA0RjkyNzZFMkQyQzc0QjZFIn19XQ==",
  "jobs": [
    {
      "jobId": "bc95dfa2-c6a0-459c-b9ce-6b2b9bcb4526",
      "cost": 1.2000000000000002,
      "result": {
        "blobKey": "0954E698E03F9E7B4A73DFF9C6B0AACBE850AF072C3C62204F9276E2D2C74B6E",
        "available": false
      },
      "scheduled": true
    }
  ]
}
```

| name                    | type                                                                  | description                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseModel`             | enum `"SD_1_5"`, `"SDXL"`                                             | **Required**. Base Stable Diffusion Model.                                                                                                                                                                                                                                                                                                |
| `model`                 | string \| null                                                        | **Required**. The Civitai model to use for generation.                                                                                                                                                                                                                                                                                    |
| `params.prompt`         | string \| null                                                        | **Required**. The main prompt for the image generation.                                                                                                                                                                                                                                                                                   |
| `params.negativePrompt` | string \| null                                                        | Optional. The negative prompt for the image generation.                                                                                                                                                                                                                                                                                   |
| `params.scheduler`      | [Scheduler](src/models/Scheduler.ts) \| null                          | Optional. The scheduler algorithm to use. <br/> <br/>Possible values are: `EulerA`, `Euler`, `LMS`, `Heun`, `DPM2`, `DPM2A`, `DPM2SA`, `DPM2M`, `DPMSDE`, `DPMFast`, `DPMAdaptive`, `LMSKarras`, `DPM2Karras`, `DPM2AKarras`, `DPM2SAKarras`, `DPM2MKarras`, `DPMSDEKarras`, `DDIM`, `PLMS`, `UniPC`, `Undefined`, `LCM`, `DDPM`, `DEIS`. |
| `params.steps`          | number \| null                                                        | Optional. The number of steps for the image generation process.                                                                                                                                                                                                                                                                           |
| `params.cfgScale`       | number \| null                                                        | Optional. The CFG scale for the image generation.                                                                                                                                                                                                                                                                                         |
| `params.width`          | number                                                                | **Required**. The width of the generated image.                                                                                                                                                                                                                                                                                           |
| `params.height`         | number                                                                | **Required**. The height of the generated image.                                                                                                                                                                                                                                                                                          |
| `params.seed`           | number \| null                                                        | Optional. The seed for the image generation process.                                                                                                                                                                                                                                                                                      |
| `params.clipSkip`       | number \| null                                                        | Optional. The number of CLIP skips for the image generation.                                                                                                                                                                                                                                                                              |
| `callbackUrl`           | string \| null                                                        | Optional. URL that will be invoked upon completion of this job                                                                                                                                                                                                                                                                            |
| `additionalNetworks`    | [ImageJobNetworkParams](src/models/ImageJobNetworkParams.ts) \| null  | Optional. An associative list of additional networks, keyed by the AIR of the network. Each network is of type [AssetType](src/models/AssetType.ts).                                                                                                                                                                                      |
| `controlNets`           | Array<[ImageJobControlNet](src/models/ImageJobControlNet.ts)> \| null | Optional. An associative list of additional networks.                                                                                                                                                                                                                                                                                     |

#### Additional Networks

| `additionalNetworks` | Record<string, [ImageJobNetworkParams](src/models/ImageJobNetworkParams.ts)> | Optional. An associative list of additional networks, keyed by the AIR of the network. Each network is described by an `ImageJobNetworkParams` object. |
| -------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`               | [`AssetType`](src/models/AssetType.ts)                                       | Optional. The type of the asset. <br/><br/>Can be one of `Lora`, `Hypernetwork`, `TextualInversion`, `Lycoris`, `Checkpoint`, `Vae`, `LoCon`.          |
| `strength`           | number                                                                       | Optional. In case of Lora and LoCon, set the strength of the network.                                                                                  |
| `triggerWord`        | string                                                                       | Optional. In case of a TextualInversion, set the trigger word of the network.                                                                          |

#### ControlNets

| `controlNets`  | Array<[ImageJobControlNet](src/models/ImageJobControlNet.ts)> | Optional. An array of control networks that can be applied to the image generation process. <br/><br/>Each `ImageJobControlNet` object in the array can have the following properties: |
| -------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preprocessor` | [ImageTransformer](src/models/ImageTransformer.ts) \| null    | Optional. Specifies the image transformer to be applied as a preprocessor. <br/><br/>Possible values are `Canny`, `DepthZoe`, `SoftedgePidinet`, `Rembg`.                              |
| `weight`       | number \| null                                                | Optional. The weight of the control net.                                                                                                                                               |
| `startStep`    | number \| null                                                | Optional. The step at which the control net starts to apply.                                                                                                                           |
| `endStep`      | number \| null                                                | Optional. The step at which the control net stops applying.                                                                                                                            |
| `imageUrl`     | string \| null                                                | Optional. The URL of the image associated with the controlnet.                                                                                                                         |

### `civitai.job.cancel`

Cancel a job by its jobId.

```js
const response = await civitai.job.cancel(jobId);
```

This method cancels a job that is currently scheduled or running. It requires the `jobId` of the job you wish to cancel. On successful cancellation, it returns a response object indicating the cancellation status.

Example response:

```js
{
  "status": 200,
}

```

### `civitai.models.get`

To check the coverage of specific models, you can use the `civitai.models.get` method. This method retrieves the availability of the requested models.

```js
const models = [
  "urn:air:sd1:checkpoint:civitai:107842@275408",
  "urn:air:sd1:lora:civitai:162141@182559",
];
const coverage = await civitai.models.get(models);
console.log("Model coverage: ", coverage);
```

```
Model Coverage: {
  "urn:air:sd1:checkpoint:civitai:107842@275408": {
    "availability": "Unavailable",
    "workers": 0
  },
  "urn:air:sd1:lora:civitai:162141@182559": {
    "availability": "Available",
    "workers": 1
  }
}
```

## Webhooks

Webhooks provide real-time updates about your generation. Specify an endpoint when you create a generation, and Civitai will send HTTP POST requests to that URL when the generation is completed.

Some scenarios where webhooks are useful:

- **Sending notifications when long-running generations finish**. Some predictions like training jobs can take several minutes to run. You can use a webhook handler to send a notification like an email or a Slack message when a prediction completes.
- **Creating model pipelines.** You can use webhooks to capture the output of one long-running prediction and pipe it into another model as input.

Note: Webhooks are handy, but they’re not strictly necessary to use Civitai SDK, and there are other ways to receive updates. You can also poll the generation API check the status of a generation over time.

### Setting webhooks

To use webhooks, specify a `webhook URL` in the request body when creating a generation.
Here’s an example using the Civitai JavaScript client:

```js
await civitai.image.fromText({
  input: {
    baseModel: "SD_1_5",
    model: "urn:air:sd1:checkpoint:civitai:4384@128713",
    params: {
      prompt: "a cat in a field of flowers",
      ...
    },
    webhook: "https://example.com/webhook",
  }
});
```

### Receiving webhooks

Here’s an example of a Next.js webhook handler:

```js
// app/api/webhook/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
```

By default, Civitai sends requests to your webhook URL whenever there are new outputs or the generation has finished.

Your endpoint should respond with a 2xx status code within a few seconds, otherwise the webhook might be retried.

### Testing your webhook code

When writing the code for your new webhook handler, it’s useful to be able to receive real webhooks in your development environment so you can verify your code is handling them as expected.

[ngrok](https://ngrok.com/) is a free reverse proxy tool that can create a secure tunnel to your local machine so you can receive webhooks. If you have Node.js installed, run ngrok directly from the command line using the npx command that’s included with Node.js.

```bash!
npx ngrok http 3000
```

The command above will generate output that looks like this:

```bash
Session Status                online
Session Expires               1 hour, 59 minutes
Version                       2.3.41
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://3e48-20-171-41-18.ngrok.io -> http://localhost:3000
Forwarding                    https://3e48-20-171-41-18.ngrok.io -> http://localhost:3000
```

Here’s an example using the `civitai` JavaScript client:

```js
await civitai.image.fromText({
  input: {
    baseModel: "SD_1_5",
    model: "urn:air:sd1:checkpoint:civitai:4384@128713",
    params: {
      prompt: "a cat in a field of flowers",
      ...
    },
    webhook: "https://3e48-20-171-41-18.ngrok.io/api/webhooks",
  }
});
```

Your webhook handler should now receive webhooks from Civitai. Once you’ve deployed your app, change the value of the webhook URL to your production webhook handler endpoint when creating generations.

For a real-world example of webhook handling in Next.js, check out [the Nextjs ComfyUI example](https://github.com/civitai/civitai-javascript/tree/master/examples/nextjs-comfyui).

## Examples

[Build a web app with Next.js App Router](https://github.com/civitai/civitai-javascript/tree/master/examples/nextjs-txt2img)

[Build a ComfyUI app](https://github.com/civitai/civitai-javascript/tree/master/examples/nextjs-comfyui)

## Contribution

Contributions to the Civitai Generator Node.js Client are welcome! Here's how you can contribute or build the project from source.

### Prerequisites

- Node.js (version specified in `package.json` under `engines.node`)
- npm or yarn (version specified in `package.json` under `engines.npm` or `engines.yarn`)

### Setting Up for Development

1. Fork and clone the repository.
2. Install dependencies:

```bash
npm install
```

### Building from Source

To build the project from source:

```bash
npm run build
```

This will compile the TypeScript files and generate the necessary JavaScript files in the `dist` directory.

3. Create a `.env.test` file in the root directory and add your Civitai API token, i.e., `CIVITAI_API_TOKEN`.

### Running Tests

To ensure your changes don't break existing functionality, run the tests:

```bash
npm run test
```

### Contributing Your Changes

After making your changes:

1. Push your changes to your fork.
2. Open a pull request against the main repository.
3. Describe your changes and how they improve the project or fix issues.

Your contributions will be reviewed, and if accepted, merged into the project.

### Additional Guidelines

- Include unit tests for new features or bug fixes.
- Update the documentation if necessary.

Thank you for contributing to the Civitai Generator Node.js Client! 🥹🤭
