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
            <FormLabel htmlFor="civitai model">
              Civitai checkpoint model
            </FormLabel>
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
                  className="flex-1 min-h-[100px]"
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

      <div className="flex justify-between gap-2">
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="steps">Steps</FormLabel>
              <FormControl>
                <Input
                  placeholder="25"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cfgScale"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="cfgScale">CFG scale</FormLabel>
              <FormControl>
                <Input
                  placeholder="7"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <AdditionalNetworksCollapsible />
    </div>
  );
};
