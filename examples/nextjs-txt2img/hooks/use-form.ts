import { Scheduler } from "civitai";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/utils";

export function usePlaygroundForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "urn:air:sd1:checkpoint:civitai:4201@130072",
      prompt:
        "instagram photo, closeup face photo of 23 y.o Chloe in black sweater, cleavage, pale skin, (smile:0.4), hard shadows",
      negativePrompt:
        "(worst quality:1.4), (low quality:1.4), simple background, bad anatomy",
      scheduler: Scheduler.EULER_A,
      steps: 20,
      cfgScale: 7,
      width: 512,
      height: 512,
      clipSkip: 2,
    },
  });

  return form;
}
