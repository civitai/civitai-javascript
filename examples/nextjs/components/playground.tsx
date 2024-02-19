"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { usePlaygroundForm } from "@/hooks/use-form";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SuccessIcon } from "./ui/success-icon";

import { z } from "zod";
import { formSchema } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

export const Playground = () => {
  const form = usePlaygroundForm();

  const [prediction, setPrediction] = useState(null);
  // Form states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    return;
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
                            className="flex-1 min-h-[150px] lg:min-h-[200px] transition duration-200 focus:ring-2 focus:ring-blue-500"
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
                {isSuccess ? (
                  <Button
                    className="w-full h-10 md:h-9 text-white lg:w-auto min-w-[140px] duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                    style={{
                      boxShadow:
                        "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <SuccessIcon />
                  </Button>
                ) : (
                  <Button
                    disabled={isSubmitting}
                    onClick={async (event) => {
                      event.preventDefault();
                      const isValid = await form.trigger();
                      if (isValid) {
                        onSubmit(form.getValues());
                      }
                    }}
                    className="w-[140px] duration-150 hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] active:scale-95 scale-100 duration-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
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
                )}
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
};
