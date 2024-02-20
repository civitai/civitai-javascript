# Civitai Generator Node.js Client

A node.js client for Civitai's generator to run Civitai models from your Node.js code.

## Installation

```bash
npm install civitai
```

## Usage

Create the client:

```js
// ESM (where `"type": module` in package.json or using .mjs extension)
import Civitai from "civitai";

// CommonJS (using .cjs extension)
const Civitai = require("civitai");
```

```js
const civitai = new Civitai({
  token: "YOUR_API_TOKEN",
});
```

Create a txt2img job:

```js
const input = {
  baseModel: "SDXL",
  model: "@civitai/128713",
  params: {
    prompt: "A cat",
    negativePrompt: "A dog",
    scheduler: "EulerA",
    steps: 20,
    cfgScale: 7,
    width: 512,
    height: 512,
    clipSkip: 4,
  },
};
const response = await civitai.image.fromText(input, (wait = true)); // wait is false by default with timeout of 30 seconds
const output = response.jobs[0].result.blobUrl;
```

_Note: Running in the background times out at 30 seconds._

<br/>

Or wait for the job to finish by running the generation in the background:

```js
const response = await civitai.image.fromText(input, (wait = false));
```

Then fetch the result later:

```js
const output = civitai.job.get(response.token);
```

<br/>

## API

### Constructor

```js
const civitai = new Civitai(options);
```

| name           | type   | description                    |
| -------------- | ------ | ------------------------------ |
| `options.auth` | string | **Required**. API access token |

### `civitai.job.get`

Get the status of a job by looking up the job token

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

<br/>

### `civitai.image.fromText`

```js
const response = await civitai.image.fromText(options);
```

| name                    | type                                 | description                                                                                  |
| ----------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------- |
| `baseModel`             | enum `"SD_1_5"`, `"SDXL"`            | **Required**. Base Stable Diffusion Model.                                                   |
| `model`                 | string \| null                       | **Required**. The Civitai model to use for generation.                                       |
| `params.prompt`         | string \| null                       | **Required**. The main prompt for the image generation.                                      |
| `params.negativePrompt` | string \| null                       | **Required**. The negative prompt for the image generation.                                  |
| `params.scheduler`      | [Scheduler](src/models/Scheduler.ts) | **Required**. The scheduler algorithm to use.                                                |
| `params.steps`          | number                               | **Required**. The number of steps for the image generation process.                          |
| `params.cfgScale`       | number \| null                       | **Required**. The CFG scale for the image generation.                                        |
| `params.width`          | number                               | **Required**. The width of the generated image.                                              |
| `params.height`         | number                               | **Required**. The height of the generated image.                                             |
| `params.seed`           | number                               | **Required**. The seed for the image generation process.                                     |
| `params.clipSkip`       | number                               | **Required**. The number of CLIP skips for the image generation.                             |
| `additionalNetworks`    | object \| null                       | Optional. An associative list of additional networks. Use the AIR of the network as the key. |
| `controlNets`           | array \| null                        | Optional. An associative list of additional networks.                                        |

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

<br />

## Examples

[Build a web app with Next.js App Router](https://github.com/civitai/civitai-javascript)
