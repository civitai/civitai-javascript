"use client";

import { civitai } from "@/lib/civitai";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SuccessIcon } from "./ui/success-icon";

import { z } from "zod";
import { usePlaygroundForm } from "@/hooks/use-form";
import { cn, formSchema } from "@/lib/utils";

export default function Playground() {
  const form = usePlaygroundForm();

  const [prediction, setPrediction] = useState(null);
  // Form states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const input = {
        model: "@civitai/128713",
        params: {
          prompt: "A cat",
          negativePrompt: "A dog",
          scheduler: "EulerA",
          steps: 20,
          cfgScale: 7,
          width: 512,
          height: 768,
          clipSkip: 4,
        },
        quantity: 1,
        priority: {
          value: 1,
        },
      };
      const response = await civitai.image.fromText(input);
      console.log("Response:", JSON.stringify(response, null, 2));
      // setPrediction(response.jobs[0].result);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 mx-auto px-8 md:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="input">Input</Label>
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="textarea-container relative">
                          <Textarea
                            placeholder={"A cat"}
                            className="flex-1 min-h-[150px] lg:min-h-[200px]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row items-center space-x-2">
                <Button
                  disabled={isSubmitting}
                  className={cn(
                    "w-full md:w-[140px]",
                    isSuccess &&
                      "w-full h-10 md:h-9 text-white lg:w-auto min-w-[140px] duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                  )}
                  type="submit"
                  onClick={async (event) => {
                    event.preventDefault();

                    const isValid = await form.trigger();
                    const {
                      formState: { errors },
                    } = form;
                    if (isValid) {
                      onSubmit(form.getValues());
                    } else {
                      console.log("errors", errors);
                    }
                  }}
                >
                  {isSubmitting ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : isSuccess ? (
                    <SuccessIcon />
                  ) : (
                    <div className="flex items-center justify-center gap-x-2">
                      <Image
                        className="filter invert dark:filter-none lg:-ml-1"
                        width={15}
                        height={15}
                        src={"/sparkling-icon.png"}
                        alt={"Generate"}
                      />

                      <span>Generate</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <div className="min-h-[320px] min-w-[320px] md:min-h-[500px] md:min-w-[500px] rounded-md border bg-muted">
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full gap-3">
                  <div className="absolute bottom-4 w-full text-center text-slate-500 text-xs">
                    Takes 30 seconds to generate.
                  </div>
                </div>
              ) : (
                prediction && (
                  <div className="relative md:min-h-[420px] md:min-w-[420px] flex bg-muted rounded-md overflow-hidden group">
                    <Link
                      href={prediction}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        alt="Glyph image output"
                        src={prediction}
                        width={768}
                        height={768}
                        quality={100}
                        className="object-cover transition-all md:hover:scale-105"
                      />
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
