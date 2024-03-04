import { useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const ReactJson = dynamic(() => import("react-json-view"));

export const FormPreview = () => {
  const { theme } = useTheme();
  const { getValues } = useFormContext();

  let additionalNetworks = getValues("additionalNetworks") || [];

  additionalNetworks = additionalNetworks.reduce((acc, curr) => {
    if (curr.model) {
      acc[curr.model] = {
        type: curr.type,
        strength: curr.strength,
        triggerWord: curr.triggerWord,
      };
    }
    return acc;
  }, {});

  const formValues = {
    model: getValues("model"),
    params: {
      prompt: getValues("prompt"),
      negativePrompt: getValues("negativePrompt"),
      scheduler: getValues("scheduler"),
      steps: getValues("steps"),
      cfgScale: getValues("cfgScale"),
      width: getValues("width"),
      height: getValues("height"),
      clipSkip: getValues("clipSkip"),
    },
    additionalNetworks,
  };

  return (
    <div className="space-y-2">
      <Label>Form input</Label>
      <ScrollArea className="h-[360px] bg-accent rounded-md text-sm border">
        <ReactJson
          src={formValues}
          style={{ padding: "12px" }}
          name={false}
          theme={theme === "dark" ? "twilight" : "rjv-default"}
          collapsed={false}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </ScrollArea>
    </div>
  );
};
