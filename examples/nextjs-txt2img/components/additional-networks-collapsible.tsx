// import * as React from "react";
// import { useFormContext } from "react-hook-form"; // Import useFormContext to access the form context

// import { Button } from "./ui/button";
// import { FormLabel } from "./ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Input } from "./ui/input";
// import { ScrollArea } from "./ui/scroll-area";

// const networks = [
//   "Lora",
//   "Hypernetwork",
//   "TextualInversion",
//   "Lycoris",
//   "Checkpoint",
//   "Vae",
//   "LoCon",
// ];

// export function AdditionalNetworksCollapsible() {
//   const { register, watch, setValue } = useFormContext(); // Use useFormContext to access form methods
//   const selectedNetwork = watch("additionalNetworks.type"); // Watch the selected network type

//   // Handle network selection change
//   const handleNetworkChange = (value: string) => {
//     setValue("additionalNetworks.type", value);
//     // Reset optional fields when changing network type
//     setValue("additionalNetworks.model", null);
//     setValue("additionalNetworks.strength", null);
//     setValue("additionalNetworks.triggerWord", null);
//   };

//   return (
//     <form onSubmit={(data) => console.log(data)}>
//       <Accordion type="single" collapsible>
//         <AccordionItem value="item-1" className="border-0">
//           <AccordionTrigger className="flex items-center justify-between space-x-4">
//             <FormLabel>Additional networks</FormLabel>
//           </AccordionTrigger>

//           <AccordionContent className="space-y-2 py-0.5">
//             <div className="flex flex-col md:flex-row gap-2">
//               <Select onValueChange={(value) => handleNetworkChange(value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Network Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <ScrollArea className="h-[200px]">
//                     {networks.map((network) => (
//                       <SelectItem key={network} value={network}>
//                         {network}
//                       </SelectItem>
//                     ))}
//                   </ScrollArea>
//                 </SelectContent>
//               </Select>

//               <Input
//                 {...register("additionalNetworks.model")}
//                 placeholder="Enter model AIR"
//                 className="w-full"
//               />

//               {(selectedNetwork === "Lora" || selectedNetwork === "LoCon") && (
//                 <Input
//                   {...register("additionalNetworks.strength", {
//                     valueAsNumber: true,
//                   })}
//                   type="number"
//                   placeholder="Enter strength"
//                 />
//               )}
//               {selectedNetwork === "TextualInversion" && (
//                 <Input
//                   {...register("additionalNetworks.triggerWord")}
//                   type="text"
//                   placeholder="Enter trigger word"
//                 />
//               )}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </form>
//   );
// }
