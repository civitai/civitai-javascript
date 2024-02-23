import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePlaygroundForm } from "@/hooks/use-form";

export const FormFields = () => {
  const form = usePlaygroundForm();

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col md:grid grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="baseModel"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel htmlFor="base model">Base model</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SD_1_5">SD 1.5</SelectItem>
                    <SelectItem value="SDXL">SDXL</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
      </div>

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
    </div>
  );
};
