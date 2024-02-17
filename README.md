# Civitai Generator Node.js Client

A node.js client for Civitai's generator to run Civitai models from your Node.js code.

## Installation

```
npm install civitai-sdk
```

## Usage

Create the client:

```typescript
import Civitai from "civitai-sdk";
```

```typescript
const civitai = new Civitai({
  token: "YOUR_API_TOKEN",
});
```

Run a simple txt2img:

```typescript
const input = {
  baseModel: "SD1",
  model: "@civitai/302397",
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
  quantity: 1,
  priority: 1,
};
const output = await civitai.jobs.create(input, (wait = True));
```

Or wait for the job to finish by running the generation in the background:

```typescript
let output = await civiati.jobs.get(jobId);
console.log(output.result);
// https://blobs-temp.sfo3.digitaloceanspaces.com/58DEF61CF27D5C4087FCD624CC527223857020E018BF0BB8BEA46B727D16E0A8?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00F84RAAYEUTBJ6D9L%2F20240216%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240216T214305Z&X-Amz-SignedHeaders=host&X-Amz-Signature=d38ebec7d66c962915198e1f3f2180a8abd0474339c8ac3af3428b04da84a480
```

### ComfyUI Workflow

We currently support txt2img ComfyUI workflows. You’ll need the API version of your ComfyUI workflow.

```typescript
const pathToWorkflow = "./workflows/ComfyUI_txt2img.json";
const output = await civitai.jobs.create(pathToWorkflow);
```

#### `civitai.jobs.get`

Get the status of a job by looking up the jobId

```typescript
const response = await civitai.jobs.get(jobId);
```

```
{
"jobId": "e1eebaeb-e3e6-4dd6-9fe2-eccc2b314cf8",
  "lastEvent": {
    "jobId": "e1eebaeb-e3e6-4dd6-9fe2-eccc2b314cf8",
    "type": "Succeeded",
    "dateTime": "2024-02-16T21:43:05.5028706Z",
    "provider": "SaladML",
    "serviceProvider": "SaladML",
    "workerId": "SaladML-186297",
    "context": {
      "initialize_options_time_ms": 3,
      "collect_additional_networks_time_ms": 0,
      "apply_additional_networks_time_ms": 0,
      "finalize_queue_time_ms": 0,
      "horde_safety_success": true,
      "horde_safety_check_time_ms": 53,
      "is_nsfw": false,
      "is_csam": false,
      "embedding_success": true,
      "embedding_time_ms": 62,
      "embedding": [
       ...
      ],
      "steps": 20,
      "steps_per_second": 9.78,
      "num_networks": 0,
      "execution_time_ms": 2045,
      "upload_time_ms": 473
    },
    "claimDuration": "00:00:02.7742373",
    "jobDuration": "00:00:03.3546774",
    "retryAttempt": 0,
    "cost": 1.2000000000000002,
    "jobProperties": {},
    "jobType": "TextToImage",
    "jobPriority": 1,
    "claimHasCompleted": true,
    "jobHasCompleted": true
  },
  "serviceProviders": {},
  "scheduled": false
}
```

#### Server-sent events?

...
