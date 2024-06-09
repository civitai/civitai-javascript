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
  model: "urn:air:sdxl:checkpoint:civitai:101055@128078",
  params: {
    prompt:
      "RAW photo, face portrait photo of 26 y.o woman, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt:
      "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3)",
    scheduler: Scheduler.EULER_A,
    steps: 20,
    cfgScale: 7,
    width: 512,
    height: 512,
    clipSkip: 2,
  },
};
```

Run a model:

```js
const response = await civitai.image.fromText(input);
```

Then fetch the result later:

```js
const output = civitai.jobs.get(response.token);
```

Or wait for the job to finish by running the generation in the background a.k.a long polling:

```js
const response = await civitai.image.fromText(input, true); // Add true flag
```

_Note: Jobs timeout after 10 minutes._

### Using Additional Networks

The SDK supports additional networks: LoRA, VAE, Hypernetwork, Textual Inversion, LyCORIS, Checkpoint, and LoCon. See the full list [here](src/models/AssetType.ts).

To use any of the networks availabe on Civitai, simply add the `additionalNetworks` field into the input:

```js
import { Scheduler, AssetType } from "civitai";

const input = {
  model: "urn:air:sd1:checkpoint:civitai:4384@128713",
  params: {
    prompt:
      "masterpiece, best quality, 1girl, IncrsAhri, multiple tails, fox tail, korean clothes, skirt, braid, arms behind back",
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
    // Detail enhancer LoRA: https://civitai.com/models/82098 add-more-details-detail-enhancer-tweaker-lora
    "urn:air:sd1:lora:civitai:82098@87153": {
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

| name   | type                  | description                                                |
| ------ | --------------------- | ---------------------------------------------------------- |
| `auth` | string                | **Required**. API access token                             |
| `env`  | `dev` \| `production` | Optional. The environment to use. Default is `production`. |

### `civitai.image.fromText`

Run a model with inputs you provide.

```js
const response = await civitai.image.fromText(options);
```

```json
{
  "token": "W3siSm9icyI6WyJjYzJkOGViNy1mOGE0LTRkNzYtOTE3Yi01OTliODRiZmRmNmYiXX1d",
  "jobs": [
    {
      "jobId": "cc2d8eb7-f8a4-4d76-917b-599b84bfdf6f",
      "cost": 1.2000000000000002,
      "result": {
        "blobKey": "0B60A87CDFB8E7307D0F19F623EBD8240307BD9C2345CD03B7E52A489A52CC47",
        "available": false
      },
      "scheduled": true
    }
  ]
}
```

| name                    | type                                                                  | description                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
| `batchSize`             | number \| null                                                        | Optional. The number of images to generate in a single batch.                                                                                                                                                                                                                                                                             |

### `civitai.jobs.getById`

Fetches the status of a job by its unique jobId.

```js
const response = await civitai.jobs.getById(jobId);
```

```json
{
  "jobId": "3f071548-46c6-40d5-8e5a-210aa6b8bccc",
  "cost": 1.2000000000000002,
  "result": {
    "blobKey": "27E0CD13EC240389EFB9A9C25EB29DC3B4AB74A973F132D6A6DB076C8B210570",
    "available": true,
    "blobUrl": "https://blobs-temp.sfo3...",
    "blobUrlExpirationDate": "2024-03-04T08:04:02.4149309Z"
  },
  "scheduled": false
}
```

### `civitai.jobs.getByToken`

Get jobs associated with a token.

```js
const response = await civitai.jobs.getByToken(token);
```

```json
{
  "token": "W3siSm9icyI6WyIzZjA3MTU0OC00NmM2LTQwZDUtOGU1YS0yMTBhYTZiOGJjY2MiXX1d",
  "jobs": [
    {
      "jobId": "3f071548-46c6-40d5-8e5a-210aa6b8bccc",
      "cost": 1.2000000000000002,
      "result": {
        "blobKey": "27E0CD13EC240389EFB9A9C25EB29DC3B4AB74A973F132D6A6DB076C8B210570",
        "available": true,
        "blobUrl": "https://blobs-temp.sfo3...",
        "blobUrlExpirationDate": "2024-03-04T08:00:44.8268514Z"
      },
      "scheduled": false
    }
  ]
}
```

### `civitai.jobs.getByQuery`

Retrieve a collection of jobs by quering properties, e.g., `userId`. You can optionally include a `detailed` boolean flag to get detailed information about the jobs.

```js
const query: QueryJobsRequest = {
  properties: {
    userId: 4, // Querying by userId
  },
};
const detailed = false; // Optional boolean flag to get detailed job definitions. False by default.
const response = await civitai.jobs.getByQuery(query, detailed);
```

```json
{
  "jobs": [
    {
      "jobId": "AA588B7B3EC68D88A02501121A08499E4B41664820C0F8D12F4119D8C49C04C9",
      "cost": 1.54375,
      "properties": {
        "userId": 4,
        "requestId": -1,
        "RequestId": "eb6a8c28-c806-42e2-a349-5325702a1a96"
      },
      "result": {
        "blobKey": "AA588B7B3EC68D88A02501121A08499E4B41664820C0F8D12F4119D8C49C04C9",
        "available": false
      },
      "serviceProviders": {},
      "scheduled": false
    },
    {
      "jobId": "59B1C81ACFA3E55B9C60BCB6472DF271F3698CC0FFE154E76C7B27D5AD1934AF",
      "cost": 1.54375,
      "properties": {
        "userId": 4,
        "requestId": -1,
        "RequestId": "eb6a8c28-c806-42e2-a349-5325702a1a96"
      }
    }
  ]
}
```

### `civitai.jobs.cancel`

Cancel a job by its jobId.

```js
const response = await civitai.jobs.cancel(jobId);
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

```json
{
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

## Examples

[Build a web app with Next.js App Router](https://github.com/civitai/civitai-javascript/tree/master/examples/nextjs-txt2img)

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
