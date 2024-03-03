import { AssetType, Scheduler } from "civitai";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/form-schemas";

export function usePlaygroundForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "urn:air:sd1:checkpoint:civitai:4201@130072",
      prompt:
        "RAW photo, face portrait photo of beautiful 26 y.o woman, cute face, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
      negativePrompt:
        "(worst quality:1.4), (low quality:1.4), simple background, bad anatomy",
      scheduler: Scheduler.EULER_A,
      steps: 20,
      cfgScale: 7,
      width: 512,
      height: 512,
      clipSkip: 2,
      additionalNetworks: [
        {
          model: "",
          type: "Lora" as AssetType,
          strength: null,
          triggerWord: "",
        },
      ],
    },
  });

  return form;
}
