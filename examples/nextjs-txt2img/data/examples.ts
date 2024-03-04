export interface Example {
  model: string;
  name: string;
  prompt: string;
  negativePrompt?: string;
  steps?: number;
  cfgScale?: number;
}

const negativePrompt =
  "(worst quality:1.4), (low quality:1.4), simple background, bad anatomy";

export const examples: Example[] = [
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "Realistic Vision V6.0 B1",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "ControlNet",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "LoRA",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "Textual Inversion",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "Pastel",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "Realistic Vision V6.0 B1",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "Realistic Vision V6.0 B1",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "Realistic Vision V6.0 B1",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "Realistic Vision V6.0 B1",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
  {
    model: "urn:air:sd1:checkpoint:civitai:4201@130072",
    name: "Realistic Vision V6.0 B1",
    prompt:
      "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
    negativePrompt,
    steps: 20,
    cfgScale: 7,
  },
];
