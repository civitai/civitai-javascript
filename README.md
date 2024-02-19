# Civitai Generator Node.js Client

A node.js client for Civitai's generator to run Civitai models from your Node.js code.

## Installation

```
npm install civitai
```

## Usage

Create the client:

```typescript
// ESM (where `"type": module` in package.json or using .mjs extension)
import Civitai from "civitai";

// CommonJS (using .cjs extension)
const Civitai = require("civitai");
```

```typescript
const civitai = new Civitai({
  token: "YOUR_API_TOKEN",
});
```

Create a txt2img job:

```typescript
const input = {
  model: "@civitai/128713",
  params: {
    prompt: "A cat",
    negativePrompt: "A dog",
    scheduler: "EulerA",
    steps: 20,
    cfgScale: 7,
    width: 512,
    height: 768,
    clipSkip: 4,
  },
};
const response = await civitai.image.fromText(input, (wait = true));
const output = output.jobs[0].blobUrl;
```

Or wait for the job to finish by running the generation in the background:

```typescript
let output = await civitai.job.get(jobToken);
console.log(output.result[0].blobUrl);
// https://blobs-temp.sfo3.digitaloceanspaces.com/58DEF61CF27D5C4087FCD624CC527223857020E018BF0BB8BEA46B727D16E0A8?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00F84RAAYEUTBJ6D9L%2F20240216%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240216T214305Z&X-Amz-SignedHeaders=host&X-Amz-Signature=d38ebec7d66c962915198e1f3f2180a8abd0474339c8ac3af3428b04da84a480
```

### ComfyUI Workflow (in progress)

We currently support txt2img ComfyUI workflows. You’ll need the API version of your ComfyUI workflow.

```typescript
const pathToWorkflow = "./workflows/ComfyUI_txt2img.json";
const output = await civitai.image.fromComfy(pathToWorkflow);
```

#### `civitai.jobs.get`

Get the status of a job by looking up the jobId

```typescript
const response = await civitai.jobs.get(jobId);
```

```
Response: {
  "token": "W3siVGVtcGxhdGVUeXBlIjoiQ2l2aXRhaS5PcmNoZXN0cmF0aW9uLkFwaS5Db250cm9sbGVycy52MS5Db25zdW1lci5Kb2JzLlRlbXBsYXRlcy5UZXh0VG9JbWFnZUpvYlRlbXBsYXRlIiwiSm9icyI6eyI0OTE2ZTgzOC0xZmUxLTRiMjgtOTFhOS04MjI4YzViOTEzYjQiOiI0MUZDQzU3REJFNzc3QjAzNUNFRUM2MzRDREM2NTlBNjRENDUzMkYzRUJFQTlDM0RBMzY2REU4RTEwODkzMkNCIn19XQ==",
  "jobs": [
    {
      "result": {
        "blobKey": "41FCC57DBE777B035CEEC634CDC659A64D4532F3EBEA9C3DA366DE8E108932CB",
        "available": true,
        "blobUrl": "https://blobs-temp.sfo3.digitaloceanspaces.com/41FCC57DBE777B035CEEC634CDC659A64D4532F3EBEA9C3DA366DE8E108932CB?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00F84RAAYEUTBJ6D9L%2F20240219%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240219T185637Z&X-Amz-SignedHeaders=host&X-Amz-Signature=97ac1f0e032ea21ccda07389c0f0bb93723b763680058a4949dc6ace32dccc43",
        "blobUrlExpirationDate": "2024-02-19T19:56:37.4629198Z"
      },
      "scheduled": false
    }
  ]
}
```

#### Server-sent events?

...
