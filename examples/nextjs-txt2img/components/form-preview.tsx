import { useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"));

export const FormPreview = () => {
  const form = useFormContext();
  const { getValues } = form;

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
  };

  return (
    <div className="space-y-2">
      <Label>Form input</Label>
      <ScrollArea className="h-[360px] bg-accent rounded-md p-4 text-sm border">
        <ReactJson
          src={formValues}
          name={false}
          theme="rjv-default"
          collapsed={false}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </ScrollArea>
    </div>
  );
};
