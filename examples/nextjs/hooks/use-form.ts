import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/utils";

export function usePlaygroundForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelVersion:
        "3c64e669051f9b358e748c8e2fb8a06e64122a9ece762ef133252e2c99da77c1",
      prompt: "",
      url: "https://glyph.so",
      image: "",
      negativePrompt: "ugly, disfigured, low quality, blurry, nsfw",
      inferenceStep: 40,
      guidance: 7.5,
      strength: 0.85,
      controlnetConditioning: 1,
      seed: -1,
    },
  });

  return form;
}
