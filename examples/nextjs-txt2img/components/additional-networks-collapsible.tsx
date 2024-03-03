import * as React from "react";

import { Button } from "./ui/button";
import { Form, FormLabel } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { AssetType } from "civitai";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";

const networks = [
  "Lora",
  "Hypernetwork",
  "TextualInversion",
  "Lycoris",
  "Checkpoint",
  "Vae",
  "LoCon",
];

export function AdditionalNetworksCollapsible() {
  const form = useFormContext();
  const { register, watch, setValue } = form;
  const selectedNetwork = watch("additionalNetworks.0.type");

  // Handle network selection change
  const handleNetworkChange = (value: string) => {
    setValue("additionalNetworks.0.type", value as AssetType);
    // Reset optional fields when changing network type
    setValue("additionalNetworks.0.model", "");
    setValue("additionalNetworks.0.strength", null);
    setValue("additionalNetworks.0.triggerWord", "");
  };

  return (
    <Form {...form}>
      <Collapsible>
        <div className="flex items-center justify-between space-x-4">
          <FormLabel>Additional networks</FormLabel>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 py-0.5">
          <div className="flex flex-col md:flex-row gap-2">
            <Select
              onValueChange={handleNetworkChange}
              defaultValue={selectedNetwork}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Network Type" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[200px]">
                  {networks.map((network) => (
                    <SelectItem key={network} value={network}>
                      {network}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>

            <Input
              {...register("additionalNetworks.0.model")}
              placeholder="Enter model AIR"
              className="w-full"
            />

            {(selectedNetwork === "Lora" || selectedNetwork === "LoCon") && (
              <Input
                {...register("additionalNetworks.0.strength", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                type="number"
                placeholder="Enter strength"
              />
            )}
            {selectedNetwork === "TextualInversion" && (
              <Input
                {...register("additionalNetworks.0.triggerWord")}
                type="text"
                placeholder="Enter trigger word"
              />
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Form>
  );
}
