import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/utils";

export function usePlaygroundForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseModel: "SD_1_5",
      model: "urn:air:sd1:checkpoint:civitai:4201@130072",
      prompt:
        "instagram photo, closeup face photo of 23 y.o Chloe in black sweater, cleavage, pale skin, (smile:0.4), hard shadows",
      negativePrompt:
        "(worst quality:1.4), (low quality:1.4), simple background, bad anatomy",
    },
  });

  return form;
}
