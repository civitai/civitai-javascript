import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AdditionalNetworksCollapsible } from "./additional-networks-collapsible";

export const FormFields = () => {
  const form = useFormContext();

  return (
    <div className="flex flex-col space-y-3">
      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel htmlFor="civitai model">Civitai model</FormLabel>
            <FormControl>
              <Input
                placeholder="urn:air:sd1:checkpoint:civitai:4201@130072"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="prompt"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="prompt">Prompt</FormLabel>
            <FormControl>
              <div className="textarea-container relative">
                <Textarea
                  placeholder={"A cat"}
                  className="flex-1 min-h-[120px]"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="negativePrompt"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="negativePrompt">Negative prompt</FormLabel>
            <FormControl>
              <div className="textarea-container relative">
                <Textarea
                  placeholder={
                    "(worst quality:1.4), (low quality:1.4), simple background, bad anatomy"
                  }
                  className="flex-1 min-h-[50px]"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <AdditionalNetworksCollapsible />
    </div>
  );
};
