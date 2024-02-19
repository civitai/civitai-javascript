import Civitai from "../src/Civitai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("Create FromComfy Job", () => {
  let civitai: Civitai;

  beforeAll(() => {
    civitai = new Civitai({
      token: process.env.CIVITAI_TOKEN || "",
    });
  });

  test("successfully creates a FromComfy job", async () => {
    const custom_workflow = {
      "4": {
        inputs: {
          ckpt_name: "@civitai/126688",
        },
        class_type: "CheckpointLoaderSimple",
      },
      "5": {
        inputs: {
          width: 1024,
          height: 1024,
          batch_size: 1,
        },
        class_type: "EmptyLatentImage",
      },
      "6": {
        inputs: {
          parser: "A1111",
          mean_normalization: true,
          multi_conditioning: true,
          use_old_emphasis_implementation: false,
          with_SDXL: false,
          ascore: 6.0,
          width: 1024,
          height: 1024,
          crop_w: 0,
          crop_h: 0,
          target_width: 1024,
          target_height: 1024,
          text_g: "",
          text_l: "",
          text: "evening sunset scenery blue sky nature, glass bottle with a galaxy in it",
          clip: ["4", 1],
        },
        class_type: "smZ CLIPTextEncode",
      },
      "7": {
        inputs: {
          parser: "A1111",
          mean_normalization: true,
          multi_conditioning: true,
          use_old_emphasis_implementation: false,
          with_SDXL: false,
          ascore: 6.0,
          width: 1024,
          height: 1024,
          crop_w: 0,
          crop_h: 0,
          target_width: 1024,
          target_height: 1024,
          text_g: "",
          text_l: "",
          text: "text, watermark",
          clip: ["4", 1],
        },
        class_type: "smZ CLIPTextEncode",
      },
      "10": {
        inputs: {
          add_noise: "enable",
          noise_seed: 721897303308196,
          steps: 25,
          cfg: 8,
          sampler_name: "euler",
          scheduler: "normal",
          start_at_step: 0,
          end_at_step: 20,
          return_with_leftover_noise: "enable",
          model: ["4", 0],
          positive: ["6", 0],
          negative: ["7", 0],
          latent_image: ["5", 0],
        },
        class_type: "KSamplerAdvanced",
      },
      "11": {
        inputs: {
          add_noise: "disable",
          noise_seed: 0,
          steps: 25,
          cfg: 8,
          sampler_name: "euler",
          scheduler: "normal",
          start_at_step: 20,
          end_at_step: 10000,
          return_with_leftover_noise: "disable",
          model: ["4", 0],
          positive: ["15", 0],
          negative: ["16", 0],
          latent_image: ["10", 0],
        },
        class_type: "KSamplerAdvanced",
      },
      "15": {
        inputs: {
          text: "evening sunset scenery blue sky nature, glass bottle with a galaxy in it",
          clip: ["4", 1],
        },
        class_type: "CLIPTextEncode",
      },
      "16": {
        inputs: {
          text: "text, watermark",
          clip: ["4", 1],
        },
        class_type: "CLIPTextEncode",
      },
      "17": {
        inputs: {
          samples: ["11", 0],
          vae: ["4", 2],
        },
        class_type: "VAEDecode",
      },
      "19": {
        inputs: {
          filename_prefix: "ComfyUI",
          images: ["17", 0],
        },
        class_type: "SaveImage",
      },
    };

    const input = {
      params: {
        workflow: custom_workflow,
      },
    };
    const response = await civitai.image.fromComfy(input);
    console.log("Response:", JSON.stringify(response, null, 2));
    if (response.jobs && response.jobs[0].result !== null) {
      console.log("Result:", response.jobs[0].result);
    } else {
      console.log("Result is null or jobs array is empty.");
    }
    expect(response).toBeDefined();
    expect(response).toBeDefined();
  }, 30000);
});
