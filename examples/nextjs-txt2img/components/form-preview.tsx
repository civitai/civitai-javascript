import { useFormContext } from "react-hook-form";
import ReactJson from "react-json-view";
import { ScrollArea } from "./ui/scroll-area";

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
    <ScrollArea className="h-[380px]">
      <ReactJson
        src={formValues}
        theme="rjv-default"
        collapsed={false}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
      />
    </ScrollArea>
  );
};
